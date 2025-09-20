import { Composio } from '@composio/core';

export const composio = new Composio({
  apiKey: process.env.COMPOSIO_API_KEY,
});

export const USER_ID = process.env.COMPOSIO_USER_ID!; // Stabilt UUID (user/org)
