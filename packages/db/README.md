
# Badget Backend API

## Overview

This project provides a set of API routes for managing assets and accounts. These routes allow authenticated users to add and retrieve their assets and accounts. This guide will explain how to create new routes and how to use the existing ones.

## Table of Contents

1. [Creating New Routes](#creating-new-routes)
   - [Example: Adding a New Route](#example-adding-a-new-route)
2. [Using the Routes](#using-the-routes)
   - [Example: Fetching Data](#example-fetching-data)
3. [Error Handling](#error-handling)

## Overview

This project provides a set of API routes for managing assets and accounts. These routes allow authenticated users to add and retrieve their assets and accounts. This guide will explain how to create new routes and how to use the existing ones.

## Table of Contents

- [Badget Backend API](#badget-backend-api)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview-1)
  - [Table of Contents](#table-of-contents-1)
  - [Creating New Routes](#creating-new-routes)
    - [Example: Adding a New Route](#example-adding-a-new-route)



## Creating New Routes

To create a new route, follow these steps:

1.  Define the route in the appropriate router file (e.g., `accountRouter` or `assetRouter`).
2.  Specify the procedure type (`protectedProcedure` for authenticated routes or `publicProcedure` for public routes).
3.  Implement the route logic to handle the request and interact with the database.
4.  Return a response based on the outcome of the logic.

### Example: Adding a New Route

Let's add a new route to fetch all transactions for a specific account.

Define the route in `src/router/example.ts`:

```typescript
import { AssetType, db, schema, sql } from "@projectx/db";
import {
  createAssetSchema,
  createRealEstateSchema,
} from "@projectx/validators";

export const assetRouter = createTRPCRouter({
  // This is a protected procedure that fetches all assets
  getAllAssets: protectedProcedure.query(async (opts) => {
    try {
      const assets = await opts.ctx.db
        .select({
          id: schema.asset.id,
          createdAt: schema.asset.createdAt,
          updatedAt: schema.asset.updatedAt,
          userId: schema.asset.userId,
          name: schema.asset.name,
          assetType: schema.asset.assetType,
          originalPayload: schema.asset.originalPayload,
        })
        .from(schema.asset)
        .execute();

      return assets.map((asset) => ({
        id: asset.id,
        createdAt: asset.createdAt,
        updatedAt: asset.updatedAt,
        userId: asset.userId,
        name: asset.name,
        assetType: asset.assetType,
        originalPayload: asset.originalPayload,
      }));
    } catch (error) {
      console.error("Failed to fetch assets:", error);
      return { success: false, message: "Failed to fetch assets" };
    }
  }),
});
```

Use the route in your application:

```typescript
//This will get all the assets and console log it.
const assets = await api.asset.getAllAssets.query();
console.log(assets);
```
