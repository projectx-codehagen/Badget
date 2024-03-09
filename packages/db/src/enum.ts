export const ProjectTier = {
  FREE: "FREE",
  PRO: "PRO",
} as const;
export type ProjectTier = (typeof ProjectTier)[keyof typeof ProjectTier];

export const SubscriptionPlan = {
  FREE: "FREE",
  STANDARD: "STANDARD",
  PRO: "PRO",
} as const;
export type SubscriptionPlan =
  (typeof SubscriptionPlan)[keyof typeof SubscriptionPlan];

export const ResourceStatus = {
  BAD: "BAD",
  GOOD: "GOOD",
} as const;
export type ResourceStatus =
  (typeof ResourceStatus)[keyof typeof ResourceStatus];

// Plaid Enums

export const Products = {
  Assets: "assets",
  Auth: "auth",
  Balance: "balance",
  // Products.Identity, "identity",
  // Products.Investments, "investments",
  // Products.InvestmentsAuth, "investments_auth",
  // Products.Liabilities, "liabilities",
  // Products.PaymentInitiation, "payment_initiation",
  // Products.IdentityVerification,
  Transactions: "transactions",
  // Products.CreditDetails,
  // Products.Income,
  // Products.IncomeVerification,
  // Products.DepositSwitch,
  // Products.StandingOrders,
  // Products.Transfer,
  // Products.Employment,
  RecurringTransactions: "recurring_transactions",
  // Products.Signal,
  // Products.Statements,
} as const;
export type Products = (typeof Products)[keyof typeof Products];

export const TransactionCode = {
  Adjustment: "adjustment",
  Atm: "atm",
  BankCharge: "bank charge",
  BillPayment: "bill payment",
  Cash: "cash",
  Cashback: "cashback",
  Cheque: "cheque",
  DirectDebit: "direct debit",
  Interest: "interest",
  Null: "null",
  Purchase: "purchase",
  StandingOrder: "standing order",
  Transfer: "transfer",
} as const;
export type TransactionCode =
  (typeof TransactionCode)[keyof typeof TransactionCode];

export const MerchantConfidenceLevel = {
  VeryHigh: "VERY_HIGH",
  High: "HIGH",
  Medium: "MEDIUM",
  Low: "LOW",
  Unknown: "UNKNOWN",
} as const;
export type MerchantConfidenceLevel =
  (typeof MerchantConfidenceLevel)[keyof typeof MerchantConfidenceLevel];

export const PrimaryCategory = {
  INCOME: "INCOME",
  TRANSFER_IN: "TRANSFER_IN",
  TRANSFER_OUT: "TRANSFER_OUT",
  LOAN_PAYMENTS: "LOAN_PAYMENTS",
  BANK_FEES: "BANK_FEES",
  ENTERTAINMENT: "ENTERTAINMENT",
  FOOD_AND_DRINK: "FOOD_AND_DRINK",
  GENERAL_MERCHANDISE: "GENERAL_MERCHANDISE",
  HOME_IMPROVEMENT: "HOME_IMPROVEMENT",
  MEDICAL: "MEDICAL",
  PERSONAL_CARE: "PERSONAL_CARE",
  GENERAL_SERVICES: "GENERAL_SERVICES",
  GOVERNMENT_AND_NON_PROFIT: "GOVERNMENT_AND_NON_PROFIT",
  TRANSPORTATION: "TRANSPORTATION",
  TRAVEL: "TRAVEL",
  RENT_AND_UTILITIES: "RENT_AND_UTILITIES",
} as const;
export type PrimaryCategory =
  (typeof PrimaryCategory)[keyof typeof PrimaryCategory];

export const ConnectorType = {
  DIRECT: "DIRECT",
  AGGREGATED: "AGGREGATED",
} as const;
export type ConnectorType = (typeof ConnectorType)[keyof typeof ConnectorType];

export const ConnectorStatus = {
  ACTIVE: "ACTIVE",
  BETA: "BETA", // do we need this?
  DEV: "DEV", // do we need this?
  INACTIVE: "INACTIVE",
} as const;
export type ConnectorStatus =
  (typeof ConnectorStatus)[keyof typeof ConnectorStatus];

export const ConnectorEnv = {
  DEVELOPMENT: "DEVELOPMENT",
  SANDBOX: "SANDBOX",
  PRODUCTION: "PRODUCTION",
} as const;
export type ConnectorEnv = (typeof ConnectorEnv)[keyof typeof ConnectorEnv];

export const BalanceType = {
  AVAILABLE: "AVAILABLE",
  BOOKED: "BOOKED",
  EXPECTED: "EXPECTED",
} as const;
export type BalanceType = (typeof BalanceType)[keyof typeof BalanceType];

export const AccountType = {
  BANK: "BANK",
  CRYPTO: "CRYPTO",
  INVESTMENT: "INVESTMENT",
} as const;
export type AccountType = (typeof AccountType)[keyof typeof AccountType];

export const AssetType = {
  STOCKS: "STOCKS",
  CRYPTO: "CRYPTO",
  BONDS: "BONDS",
  ETF: "ETF",
  OPTIONS: "OPTIONS",
  FUTURES: "FUTURES",
  REAL_ESTATE: "REAL ESTATE",
  COMMODITIES: "COMMODITIES",
} as const;
export type AssetType = (typeof AssetType)[keyof typeof AssetType];
