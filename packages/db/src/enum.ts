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

export const ItemStatus = {
  BAD: "BAD",
  GOOD: "GOOD",
} as const;
export type ItemStatus = (typeof ItemStatus)[keyof typeof ItemStatus];

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
