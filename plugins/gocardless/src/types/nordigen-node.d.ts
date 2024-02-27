declare module "nordigen-node" {
  export interface NordigenError {
    summary: string;
    detail: string;
    status_code: number;
  }

  interface NordigenClientOptions {
    secretId: string;
    secretKey: string;
    baseUrl?: string;
  }

  interface RequestOptions {
    endpoint: string;
    parameters: string;
    method?: HttpMethod.GET;
  }

  interface ExchangeTokenRequest {
    refreshToken: string;
  }

  interface TokenResponse {
    access: string;
    refresh: string;
  }

  // #region Requisition

  export interface NordigenRequisition {
    id: string;
    created: string;
    redirect: string;
    status: "CR" | "LN";
    institution_id: string;
    agreement: string;
    reference: string;
    accounts: string[];
    user_language: string;
    link: string;
    ssn: string;
    account_selection: boolean;
    redirect_immediate: boolean;
  }

  export interface CreateRequisitionRequest {
    redirectUrl: string;
    institutionId: string;
    userLanguage: string;
    redirectImmediate: boolean;
    accountSelection: boolean;
    ssn: string;
    reference: string;
  }

  export interface GetRequisitionsRequest {
    offset: number;
    limit: number;
  }

  export interface GetRequisitionsResponse {
    count: number;
    previous: string | null;
    next: string | null;
    results: NordigenRequisition[];
  }

  class RequisitionApi {
    constructor({ client }: { client: NordigenClient });

    createRequisition(
      request: CreateRequisitionRequest,
    ): Promise<NordigenRequisition>;

    getRequisitions(
      request: GetRequisitionsRequest,
    ): Promise<GetRequisitionsResponse>;

    getRequisitionById(requisitionId: string): Promise<{
      id: string;
      created: string;
      redirect: string;
      status: string;
      institution_id: string;
      agreement: string;
      reference: string;
      accounts: string[];
      link: string;
      ssn: string;
      account_selection: boolean;
      redirect_immediate: boolean;
    }>;
  }

  // #endregion

  // #region Institution

  export interface NordigenInstitution {
    id: string;
    name: string;
    bic: string;
    transaction_total_days: string;
    countries: string[];
    logo: string;
    identification_codes: unknown[];
    supported_features?: string[];
  }

  class InstitutionApi {
    constructor({ client }: { client: NordigenClient });

    getInstitutions({
      country,
    }: {
      country: string;
    }): Promise<NordigenInstitution[]>;

    getInstitutionById(id: string): Promise<NordigenInstitution>;
  }

  // #endregion

  // #region Account

  export interface NordigenAccount {
    resourceId: string;
    iban: string;
    currency: string;
    ownerName: string;
    name: string;
    product: string;
    cashAccountType: "CACC";
  }

  export interface GetDetailsResponse {
    account: NordigenAccount;
  }

  export interface NordigenBalance {
    balanceAmount: {
      amount: number;
      currency: string;
    };
    balanceType: string;
    referenceDate: string;
    creditLimitIncluded?: boolean;
    lastChangeDateTime?: string;
    lastCommittedTransaction?: string;
  }

  export interface GetBalancesResponse {
    balances: NordigenBalance[];
  }

  export interface NordigenPendingTransaction {
    transactionAmount: {
      currency: string;
      amount: number;
    };
    valueDate: Date;
    remittanceInformationUnstructured: string;
  }

  export type NordigenBookedTransaction = NordigenPendingTransaction & {
    transactionId: string;
    debtorName: string;
    debtorAccount: {
      iban: string;
    };
    transactionAmount: {
      currency: string;
      amount: number;
    };
    bankTransactionCode: string;
    bookingDate: Date;
    valueDate: Date;
    remittanceInformationUnstructured: string;
  };

  export interface GetTransactionsRequest {
    dateTo?: string;
    dateFrom?: string;
  }

  export interface GetTransactionsResponse {
    transactions: {
      booked: NordigenBookedTransaction[];
      pending: NordigenPendingTransaction[];
    };
  }

  class AccountApi {
    constructor({
      client,
      accountId,
    }: {
      client: NordigenClient;
      accountId: string;
    });

    getDetails(): Promise<GetDetailsResponse>;
    getBalances(): Promise<GetBalancesResponse>;
    getTransactions(
      request?: GetTransactionsRequest,
    ): Promise<GetTransactionsResponse>;
  }

  // #endregion

  export default class NordigenClient {
    readonly #endpoint;
    #token;

    constructor({
      secretId,
      secretKey,
      baseUrl = "https://ob.nordigen.com/api/v2",
    }: NordigenClientOptions);

    set token(token: string): void;

    get token(): string;

    request({
      endpoint,
      parameters,
      method = HttpMethod.GET,
    }: RequestOptions): Promise<unknown>;

    generateToken(): Promise<TokenResponse>;

    exchangeToken({
      refreshToken,
    }: ExchangeTokenRequest): Promise<TokenResponse>;

    institution: InstitutionApi;
    requisition: RequisitionApi;
    account(accountId: string): AccountApi;

    // TODO: initSession
  }
}
