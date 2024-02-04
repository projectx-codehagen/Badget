import crypto from "crypto";
import { importJWK, jwtVerify } from "jose";
import type { Message } from "js-sha256";
import { sha256 } from "js-sha256";
import jwt_decode from "jwt-decode";
import type { JWKPublicKey, JWTHeader } from "plaid";

import { plaidClient } from ".";

// TODO: move to redis
// Cache for webhook validation keys.
const KEY_CACHE = new Map<string, { expired_at: unknown }>();

export const verify = async (body: Message, signature: string) => {
  const decodedToken = jwt_decode<JWKPublicKey>(signature);

  // Extract the JWT header
  const decodedTokenHeader = jwt_decode<JWTHeader>(signature, { header: true });

  // Extract the kid value from the header
  const currentKeyID = decodedTokenHeader.kid as string;

  // If key not in cache, update the key cache
  if (!KEY_CACHE.has(currentKeyID)) {
    const keyIDsToUpdate = [];
    KEY_CACHE.forEach((key, keyID) => {
      // We will also want to refresh any not-yet-expired keys
      if (key.expired_at == null) {
        keyIDsToUpdate.push(keyID);
      }
    });
    keyIDsToUpdate.push(currentKeyID);
    for (const keyID of keyIDsToUpdate) {
      const response = await plaidClient.webhookVerificationKeyGet({
        key_id: keyID,
      });
      // .catch((err) => {
      //   // decide how you want to handle unexpected API errors,
      //   // e.g. retry later
      //   console.error(err);
      //   return false;
      // });
      const key = response.data.key;
      KEY_CACHE.set(keyID, key);
    }
  }

  // If the key ID is not in the cache, the key ID may be invalid.
  if (!KEY_CACHE.has(currentKeyID)) {
    return false;
  }

  // Fetch the current key from the cache.
  const key = KEY_CACHE.get(currentKeyID)!;

  // Reject expired keys.
  if (key.expired_at != null) {
    return false;
  }

  // Validate the signature and iat
  try {
    const keyLike = await importJWK(key);
    // This will throw an error if verification fails
    await jwtVerify(signature, keyLike, {
      maxTokenAge: "5 min",
    });
  } catch (error) {
    return false;
  }

  // Compare hashes.
  const encoder = new TextEncoder();
  const bodyHash = encoder.encode(sha256(body));
  const claimedBodyHash = encoder.encode(
    decodedToken.request_body_sha256 as string,
  );
  return crypto.timingSafeEqual(bodyHash, claimedBodyHash);
};
