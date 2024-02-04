import { WebhookType } from "plaid";

// import { handleItemWebhook } from "./handlers/handle-item-webhook";
// import { handleTransactionsWebhook } from "./handlers/handle-transaction-webhook";
import { verify } from "./verify";

// webhook_code enums
export const ItemWebhookCode = {
  ERROR: "ERROR",
  LOGIN_REPAIRED: "LOGIN_REPAIRED",
  NEW_ACCOUNTS_AVAILABLE: "NEW_ACCOUNTS_AVAILABLE",
  PENDING_EXPIRATION: "PENDING_EXPIRATION",
  USER_PERMISSION_REVOKED: "USER_PERMISSION_REVOKED",
  WEBHOOK_UPDATE_ACKNOWLEDGED: "WEBHOOK_UPDATE_ACKNOWLEDGED",
} as const;
export type ItemWebhookCode =
  (typeof ItemWebhookCode)[keyof typeof ItemWebhookCode];

export const TransactionWebhookCode = {
  SYNC_UPDATES_AVAILABLE: "SYNC_UPDATES_AVAILABLE",
  RECURRING_TRANSACTIONS_UPDATE: "RECURRING_TRANSACTIONS_UPDATE",
  INITIAL_UPDATE: "INITIAL_UPDATE",
  HISTORICAL_UPDATE: "HISTORICAL_UPDATE",
  DEFAULT_UPDATE: "DEFAULT_UPDATE",
  TRANSACTIONS_REMOVED: "TRANSACTIONS_REMOVED",
} as const;
export type TransactionWebhookCode =
  (typeof TransactionWebhookCode)[keyof typeof TransactionWebhookCode];

export interface PlaidWebhookEvent {
  webhook_code: ItemWebhookCode & TransactionWebhookCode;
  webhook_type: WebhookType;
  item_id: string;
  environment: "development" | "sandbox" | "production";
}

export async function handlePlaidEvent(
  event: PlaidWebhookEvent,
  signature: string,
) {
  await verify(JSON.stringify(event), signature);

  switch (event.webhook_type) {
    // case WebhookType.Assets:
    //   handleTransactionsWebhook(payload);
    //   break;
    // case WebhookType.Auth:
    //   handleTransactionsWebhook(payload);
    //   break;
    // case WebhookType.Holdings:
    //   handleTransactionsWebhook(payload);
    //   break;
    // case WebhookType.InvestmentsTransactions:
    //   handleTransactionsWebhook(payload);
    //   break;
    case WebhookType.Item:
      // await handleItemWebhook(event);
      break;
    // case WebhookType.Liabilities:
    //   handleTransactionsWebhook(payload);
    //   break;
    case WebhookType.Transactions:
      // await handleTransactionsWebhook(event);
      break;
    default: {
      console.error("❌ Error when handling Plaid Event", event.webhook_type);
      throw new Error("Webook not implemented");
    }
  }

  console.log("✅ Plaid Webhook Processed");
}
