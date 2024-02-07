"use client";

import React, { useCallback, useState } from "react";
import {
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";

const PlaidLink = () => {
  const [token, setToken] = useState<string | null>(null);

  // get a link_token from your API when component mounts
  React.useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch("/api/create_link_token", {
        method: "POST",
      });
      const { link_token } = await response.json();
      setToken(link_token);
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>((publicToken, metadata) => {
    // send public_token to your server
    // https://plaid.com/docs/api/tokens/#token-exchange-flow
    console.log(publicToken, metadata);
  }, []);
  const onEvent = useCallback<PlaidLinkOnEvent>((eventName, metadata) => {
    // log onEvent callbacks from Link
    // https://plaid.com/docs/link/web/#onevent
    console.log(eventName, metadata);
  }, []);
  const onExit = useCallback<PlaidLinkOnExit>((error, metadata) => {
    // log onExit callbacks from Link, handle errors
    // https://plaid.com/docs/link/web/#onexit
    console.log(error, metadata);
  }, []);

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
    onEvent,
    onExit,
  };

  const {
    open,
    ready,
    // error,
    // exit
  } = usePlaidLink(config);

  return (
    // TODO: use @projectx/ui button
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
};

export default PlaidLink;
