import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  CountryCode: string;
  DateTime: Date;
  EmailAddress: string;
  JWT: any;
  ObjectID: string;
  PhoneNumber: string;
  PostalCode: string;
  Upload: any;
};

export type Account = {
  __typename?: 'Account';
  _id: Scalars['ObjectID'];
  activation?: Maybe<Activation>;
  createdAt: Scalars['DateTime'];
  email: Scalars['EmailAddress'];
  password?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  users: GetUsersResponse;
};


export type AccountUsersArgs = {
  getUsersInput: GetUsersInput;
};

export type AccountFieldFiltersInput = {
  _id?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  activation?: InputMaybe<GetAccountsActivationInput>;
  createdAt?: InputMaybe<Array<InputMaybe<DateFieldFilter>>>;
  email?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  updatedAt?: InputMaybe<Array<InputMaybe<DateFieldFilter>>>;
};

export type Activation = {
  __typename?: 'Activation';
  code?: Maybe<Scalars['String']>;
  limit: Scalars['DateTime'];
  verified: Scalars['Boolean'];
};

export type Address = {
  __typename?: 'Address';
  _id?: Maybe<Scalars['ObjectID']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['CountryCode']>;
  lineOne?: Maybe<Scalars['String']>;
  lineTwo?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['PostalCode']>;
};

export type AddressInput = {
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['CountryCode']>;
  lineOne?: InputMaybe<Scalars['String']>;
  lineTwo?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['PostalCode']>;
};

export enum ArrayFilterByEnum {
  In = 'IN',
  Nin = 'NIN'
}

/** Filter for documents which have a property that is a Boolean. */
export type BooleanFieldFilter = {
  bool: Scalars['Boolean'];
  filterBy: BooleanFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  operator?: InputMaybe<OperatorFieldConfigEnum>;
};

/** Equal or Not Equal */
export enum BooleanFilterByEnum {
  Eq = 'EQ',
  Ne = 'NE'
}

export type Content = {
  __typename?: 'Content';
  _id: Scalars['ObjectID'];
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  created_by: User;
  html: Scalars['String'];
  layout?: Maybe<Layout>;
  name: Scalars['String'];
  plainText: Scalars['String'];
  subject: Scalars['String'];
  trigger: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  variables?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ContentFieldFiltersInput = {
  _id?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  active?: InputMaybe<Array<InputMaybe<BooleanFieldFilter>>>;
  createdAt?: InputMaybe<Array<InputMaybe<DateFieldFilter>>>;
  created_by?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  html?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  name?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  plainText?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  subject?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  trigger?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  updatedAt?: InputMaybe<Array<InputMaybe<DateFieldFilter>>>;
};

export type ContentInput = {
  active: Scalars['Boolean'];
  html: Scalars['String'];
  layout?: InputMaybe<Scalars['ObjectID']>;
  name: Scalars['String'];
  plainText: Scalars['String'];
  subject: Scalars['String'];
  trigger: Scalars['String'];
  variables?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CreateContentInput = {
  payload: ContentInput;
};

export type CreateLayoutInput = {
  payload: LayoutInput;
};

export type CreateMediaInput = {
  payload: MediaPayloadInput;
};

export type CreatePaywallInput = {
  payload: PaywallInput;
};

export type CreatePaywallPurchaseInput = {
  payload: PaywallPurchaseInput;
};

export type CreateServiceInput = {
  payload: ServiceInput;
};

export type CreateUserInput = {
  payload: UserInput;
};

/** Filter for documents which have a property that is a Date. */
export type DateFieldFilter = {
  date: Scalars['DateTime'];
  filterBy: DateFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  operator?: InputMaybe<OperatorFieldConfigEnum>;
};

export enum DateFilterByEnum {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  Lt = 'LT',
  Lte = 'LTE',
  Ne = 'NE'
}

export type DeleteContentsInput = {
  query: ContentFieldFiltersInput;
};

export type DeleteLayoutsInput = {
  query: LayoutFieldFiltersInput;
};

export type DeleteMediaInput = {
  query: MediaFieldFiltersInput;
};

export type DeleteMediaResponse = {
  __typename?: 'DeleteMediaResponse';
  deletedCount: Scalars['Int'];
};

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  deletedCount: Scalars['Int'];
};

export type DeleteUsersInput = {
  query: UserFieldFiltersInput;
};

/** Global configuration details. */
export type FilterConfig = {
  history?: InputMaybe<HistoryFilterInput>;
  pagination?: InputMaybe<Pagination>;
};

export type GetAccountsActivationInput = {
  verified: Array<BooleanFieldFilter>;
};

export type GetAccountsInput = {
  config?: InputMaybe<FilterConfig>;
  query: AccountFieldFiltersInput;
};

export type GetAccountsResponse = {
  __typename?: 'GetAccountsResponse';
  data: Array<Account>;
  stats: Stats;
};

export type GetContentsInput = {
  config?: InputMaybe<FilterConfig>;
  query: ContentFieldFiltersInput;
};

export type GetContentsResponse = {
  __typename?: 'GetContentsResponse';
  data: Array<Content>;
  stats: Stats;
};

export type GetLayoutsInput = {
  config?: InputMaybe<FilterConfig>;
  query: LayoutFieldFiltersInput;
};

export type GetLayoutsResponse = {
  __typename?: 'GetLayoutsResponse';
  data: Array<Layout>;
  stats: Stats;
};

export type GetMediaInput = {
  config?: InputMaybe<FilterConfig>;
  query: MediaFieldFiltersInput;
};

export type GetMediaResponse = {
  __typename?: 'GetMediaResponse';
  data: Array<Media>;
  stats: Stats;
};

export type GetPaywallPurchasesInput = {
  config?: InputMaybe<FilterConfig>;
  query: PaywallPurchaseFieldFiltersInput;
};

export type GetPaywallPurchasesResponse = {
  __typename?: 'GetPaywallPurchasesResponse';
  data: Array<PaywallPurchase>;
  stats: Stats;
};

export type GetPaywallsInput = {
  config?: InputMaybe<FilterConfig>;
  query: PaywallFieldFiltersInput;
};

export type GetPaywallsResponse = {
  __typename?: 'GetPaywallsResponse';
  data: Array<Paywall>;
  stats: Stats;
};

export type GetServicesInput = {
  config?: InputMaybe<FilterConfig>;
  query: ServiceFieldFiltersInput;
};

export type GetServicesResponse = {
  __typename?: 'GetServicesResponse';
  data: Array<Service>;
  stats: Stats;
};

export type GetUserByMembershipFilterInput = {
  _id?: InputMaybe<StringFieldFilter>;
  account?: InputMaybe<StringFieldFilter>;
  createdAt?: InputMaybe<DateFieldFilter>;
  default?: InputMaybe<BooleanFieldFilter>;
  role?: InputMaybe<Array<InputMaybe<IntFieldFilter>>>;
  status?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  updatedAt?: InputMaybe<DateFieldFilter>;
};

export type GetUsersInput = {
  config?: InputMaybe<FilterConfig>;
  query: UserFieldFiltersInput;
};

export type GetUsersResponse = {
  __typename?: 'GetUsersResponse';
  data: Array<User>;
  stats: Stats;
};

export type HistoricStats = {
  __typename?: 'HistoricStats';
  _id?: Maybe<HistoricStatsId>;
  total?: Maybe<Scalars['Int']>;
};

export type HistoricStatsId = {
  __typename?: 'HistoricStatsId';
  DAY_OF_MONTH?: Maybe<Scalars['Int']>;
  DAY_OF_WEEK?: Maybe<Scalars['Int']>;
  DAY_OF_YEAR?: Maybe<Scalars['Int']>;
  HOUR?: Maybe<Scalars['Int']>;
  MILLISECONDS?: Maybe<Scalars['Int']>;
  MINUTES?: Maybe<Scalars['Int']>;
  MONTH?: Maybe<Scalars['Int']>;
  SECONDS?: Maybe<Scalars['Int']>;
  WEEK?: Maybe<Scalars['Int']>;
  YEAR?: Maybe<Scalars['Int']>;
};

export type HistoryFilterInput = {
  interval: Array<HistoryFilterIntervalEnum>;
};

export enum HistoryFilterIntervalEnum {
  DayOfMonth = 'DAY_OF_MONTH',
  DayOfWeek = 'DAY_OF_WEEK',
  DayOfYear = 'DAY_OF_YEAR',
  Hour = 'HOUR',
  Milliseconds = 'MILLISECONDS',
  Minutes = 'MINUTES',
  Month = 'MONTH',
  Seconds = 'SECONDS',
  Week = 'WEEK',
  Year = 'YEAR'
}

/** Filter for documents which have a property that is an Integer. */
export type IntFieldFilter = {
  filterBy: IntFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  int: Scalars['Int'];
  operator?: InputMaybe<OperatorFieldConfigEnum>;
};

export enum IntFilterByEnum {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  Lt = 'LT',
  Lte = 'LTE',
  Ne = 'NE'
}

export type InviteUserInput = {
  payload: UserInput;
  query: UserFieldFiltersInput;
};

export type Layout = {
  __typename?: 'Layout';
  _id: Scalars['ObjectID'];
  createdAt: Scalars['DateTime'];
  created_by: User;
  html: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type LayoutFieldFiltersInput = {
  _id?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  createdAt?: InputMaybe<Array<InputMaybe<DateFieldFilter>>>;
  created_by?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  html?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  name?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  updatedAt?: InputMaybe<Array<InputMaybe<DateFieldFilter>>>;
};

export type LayoutInput = {
  html: Scalars['String'];
  name: Scalars['String'];
};

export type Limit = {
  __typename?: 'Limit';
  name: Scalars['String'];
  scopes: Array<Scope>;
};

export type LocalMembershipInput = {
  about?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<AddressInput>;
  first_name?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['ObjectID']>;
  last_name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['PhoneNumber']>;
};

export type LocalUserDetails = {
  __typename?: 'LocalUserDetails';
  about?: Maybe<Scalars['String']>;
  address?: Maybe<Address>;
  first_name?: Maybe<Scalars['String']>;
  image?: Maybe<Media>;
  last_name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['PhoneNumber']>;
};

export type LoginAccountResponse = {
  __typename?: 'LoginAccountResponse';
  account: Account;
  token: Scalars['JWT'];
};

export type LoginInput = {
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
};

export type LoginUserResponse = {
  __typename?: 'LoginUserResponse';
  token: Scalars['String'];
  user: User;
};

export type Media = {
  __typename?: 'Media';
  _id: Scalars['ObjectID'];
  createdAt: Scalars['DateTime'];
  created_by: User;
  mimetype: Scalars['String'];
  path: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type MediaFieldFiltersInput = {
  _id?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  createdAt?: InputMaybe<Array<InputMaybe<DateFieldFilter>>>;
  created_by?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  mimetype?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  path?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  title?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  updatedAt?: InputMaybe<Array<InputMaybe<DateFieldFilter>>>;
};

export type MediaPayloadInput = {
  file: Scalars['Upload'];
  title: Scalars['String'];
};

export type Membership = {
  __typename?: 'Membership';
  _id: Scalars['ObjectID'];
  account: Account;
  createdAt: Scalars['DateTime'];
  created_by: User;
  default: Scalars['Boolean'];
  local?: Maybe<LocalUserDetails>;
  role: Scalars['Int'];
  status?: Maybe<MembershipStatusEnum>;
  updatedAt: Scalars['DateTime'];
};

export type MembershipInput = {
  account: Scalars['ObjectID'];
  default?: InputMaybe<Scalars['Boolean']>;
  local?: InputMaybe<LocalMembershipInput>;
  role?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<MembershipStatusEnum>;
};

export enum MembershipStatusEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING',
  Revoked = 'REVOKED'
}

export type Mutation = {
  __typename?: 'Mutation';
  createContent: Content;
  createLayout: Layout;
  createMedia: Media;
  createPaywall: Paywall;
  createPaywallPurchase: PaywallPurchase;
  createService: Service;
  createUser: User;
  deleteContents: DeleteResponse;
  deleteLayouts: DeleteResponse;
  deleteMedia: DeleteMediaResponse;
  deleteUsers: DeleteResponse;
  inviteUser: User;
  login: LoginAccountResponse;
  loginUser: LoginUserResponse;
  register: Account;
  resetActivationCode: Account;
  resetPassword: Account;
  switchUserMembership: LoginUserResponse;
  updateContent: Content;
  updateEmail: Account;
  updateLayout: Layout;
  updatePaywall: Paywall;
  updatePaywallPurchase: PaywallPurchase;
  updateService: Service;
  updateUser: User;
  verifyEmail: Account;
};


export type MutationCreateContentArgs = {
  createContentInput: CreateContentInput;
};


export type MutationCreateLayoutArgs = {
  createLayoutInput: CreateLayoutInput;
};


export type MutationCreateMediaArgs = {
  createMediaInput: CreateMediaInput;
};


export type MutationCreatePaywallArgs = {
  createPaywallInput: CreatePaywallInput;
};


export type MutationCreatePaywallPurchaseArgs = {
  createPaywallPurchaseInput: CreatePaywallPurchaseInput;
};


export type MutationCreateServiceArgs = {
  createServiceInput: CreateServiceInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteContentsArgs = {
  deleteContentsInput: DeleteContentsInput;
};


export type MutationDeleteLayoutsArgs = {
  deleteLayoutsInput: DeleteLayoutsInput;
};


export type MutationDeleteMediaArgs = {
  deleteMediaInput: DeleteMediaInput;
};


export type MutationDeleteUsersArgs = {
  deleteUsersInput: DeleteUsersInput;
};


export type MutationInviteUserArgs = {
  inviteUserInput: InviteUserInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationResetActivationCodeArgs = {
  resetCodeInput: ResetCodeInput;
};


export type MutationResetPasswordArgs = {
  resetInput: ResetPasswordInput;
};


export type MutationSwitchUserMembershipArgs = {
  switchUserMembershipInput: SwitchUserMembershipInput;
};


export type MutationUpdateContentArgs = {
  updateContentInput: UpdateContentInput;
};


export type MutationUpdateEmailArgs = {
  updateEmailInput: UpdateEmailInput;
};


export type MutationUpdateLayoutArgs = {
  updateLayoutInput: UpdateLayoutInput;
};


export type MutationUpdatePaywallArgs = {
  updatePaywallInput: UpdatePaywallInput;
};


export type MutationUpdatePaywallPurchaseArgs = {
  updatePaywallPurchaseInput: UpdatePaywallPurchaseInput;
};


export type MutationUpdateServiceArgs = {
  updateServiceInput: UpdateServiceInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationVerifyEmailArgs = {
  verifyEmailInput: VerifyEmailInput;
};

export enum OperatorFieldConfigEnum {
  And = 'AND',
  Or = 'OR'
}

export type Pagination = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  reverse?: InputMaybe<Scalars['Boolean']>;
};

export type Paywall = {
  __typename?: 'Paywall';
  _id: Scalars['ObjectID'];
  createdAt: Scalars['DateTime'];
  created_by: User;
  description: Scalars['String'];
  name: Scalars['String'];
  product_id: Scalars['ID'];
  status: PaywallStatusEnum;
  updatedAt: Scalars['DateTime'];
};

export type PaywallFieldFiltersInput = {
  _id?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  createdAt?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  created_by?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  name?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  productId?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  status?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  updatedAt?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
};

export type PaywallInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  product_id: Scalars['ID'];
  status?: InputMaybe<PaywallStatusEnum>;
};

export type PaywallLimitInput = {
  name: Scalars['String'];
  scopes: Array<ScopeInput>;
};

export type PaywallPurchase = {
  __typename?: 'PaywallPurchase';
  _id: Scalars['ObjectID'];
  account: Account;
  createdAt: Scalars['DateTime'];
  created_by: User;
  paywall: Paywall;
  status: PaywallPurchaseStatusEnum;
  updatedAt: Scalars['DateTime'];
};

export type PaywallPurchaseFieldFiltersInput = {
  _id?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  account?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  createdAt?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  created_by?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  paywall?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  status?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  updatedAt?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
};

export type PaywallPurchaseInput = {
  account?: InputMaybe<Scalars['ObjectID']>;
  paywall: Scalars['ObjectID'];
  status?: InputMaybe<PaywallPurchaseStatusEnum>;
};

export enum PaywallPurchaseStatusEnum {
  Active = 'ACTIVE',
  Created = 'CREATED',
  Inactive = 'INACTIVE'
}

export enum PaywallStatusEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type Query = {
  __typename?: 'Query';
  getAccounts: GetAccountsResponse;
  getContents: GetContentsResponse;
  getLayouts: GetLayoutsResponse;
  getMedia: GetMediaResponse;
  getMyAccount: Account;
  getPaywallPurchases: GetPaywallPurchasesResponse;
  getPaywalls: GetPaywallsResponse;
  getServices: GetServicesResponse;
  getUsers: GetUsersResponse;
  isAuthenticated: Scalars['Boolean'];
  me: User;
};


export type QueryGetAccountsArgs = {
  getAccountsInput: GetAccountsInput;
};


export type QueryGetContentsArgs = {
  getContentsInput: GetContentsInput;
};


export type QueryGetLayoutsArgs = {
  getLayoutsInput: GetLayoutsInput;
};


export type QueryGetMediaArgs = {
  getMediaInput: GetMediaInput;
};


export type QueryGetPaywallPurchasesArgs = {
  getPaywallPurchasesInput: GetPaywallPurchasesInput;
};


export type QueryGetPaywallsArgs = {
  getPaywallsInput: GetPaywallsInput;
};


export type QueryGetServicesArgs = {
  getServicesInput: GetServicesInput;
};


export type QueryGetUsersArgs = {
  getUsersInput: GetUsersInput;
};

export type RegisterInput = {
  email: Scalars['EmailAddress'];
  password?: InputMaybe<Scalars['String']>;
};

export type ResetCodeInput = {
  email: Scalars['EmailAddress'];
};

export type ResetPasswordInput = {
  code: Scalars['String'];
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
};

export type Scope = {
  __typename?: 'Scope';
  paywall: Paywall;
  quantity: Scalars['Int'];
};

export type ScopeInput = {
  paywall: Scalars['ObjectID'];
  quantity: Scalars['Int'];
};

export type Service = {
  __typename?: 'Service';
  _id: Scalars['ObjectID'];
  createdAt: Scalars['DateTime'];
  created_by: User;
  limits: Array<Limit>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ServiceFieldFiltersInput = {
  _id?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  createdAt?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  created_by?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  name?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  updatedAt?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
};

export type ServiceInput = {
  limits: Array<PaywallLimitInput>;
  name: Scalars['String'];
};

export type Stats = {
  __typename?: 'Stats';
  cursor?: Maybe<Scalars['DateTime']>;
  history?: Maybe<Array<HistoricStats>>;
  page?: Maybe<Scalars['Int']>;
  remaining?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

/** Filter for documents which have a property that is an array of strings.. */
export type StringArrayFieldFilter = {
  arrayOptions: ArrayFilterByEnum;
  filterBy: StringFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  operator?: InputMaybe<OperatorFieldConfigEnum>;
  string: Array<Scalars['String']>;
};

/** Filter for documents which have a property that is a string. Filter by REGEX, ObjectID, or Match. */
export type StringFieldFilter = {
  filterBy: StringFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  operator?: InputMaybe<OperatorFieldConfigEnum>;
  string: Scalars['String'];
};

export enum StringFilterByEnum {
  Match = 'MATCH',
  Objectid = 'OBJECTID',
  Regex = 'REGEX'
}

export type SwitchUserMembershipInput = {
  membership_id: Scalars['ObjectID'];
};

export type UpdateContentInput = {
  payload: ContentInput;
  query: ContentFieldFiltersInput;
};

export type UpdateEmailInput = {
  account: Scalars['ObjectID'];
  email: Scalars['EmailAddress'];
};

export type UpdateLayoutInput = {
  payload: LayoutInput;
  query: LayoutFieldFiltersInput;
};

export type UpdateMediaInput = {
  payload: MediaPayloadInput;
  query: MediaFieldFiltersInput;
};

export type UpdatePaywallInput = {
  payload: PaywallInput;
  query: PaywallFieldFiltersInput;
};

export type UpdatePaywallPurchaseInput = {
  payload: PaywallPurchaseInput;
  query: PaywallPurchaseFieldFiltersInput;
};

export type UpdateServiceInput = {
  payload: ServiceInput;
  query: ServiceFieldFiltersInput;
};

export type UpdateUserInput = {
  payload: UserInput;
  query: UserFieldFiltersInput;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectID'];
  about?: Maybe<Scalars['String']>;
  address?: Maybe<Address>;
  createdAt: Scalars['DateTime'];
  created_by?: Maybe<User>;
  email: Scalars['EmailAddress'];
  first_name?: Maybe<Scalars['String']>;
  image?: Maybe<Media>;
  last_name?: Maybe<Scalars['String']>;
  memberships: Array<Membership>;
  phone?: Maybe<Scalars['PhoneNumber']>;
  updatedAt: Scalars['DateTime'];
};

export type UserFieldFiltersInput = {
  _id?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  createdAt?: InputMaybe<Array<InputMaybe<DateFieldFilter>>>;
  created_by?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  email?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  first_name?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  image?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  last_name?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  memberships?: InputMaybe<Array<InputMaybe<GetUserByMembershipFilterInput>>>;
  phone?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  updatedAt?: InputMaybe<Array<InputMaybe<DateFieldFilter>>>;
};

export type UserInput = {
  about?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<AddressInput>;
  email?: InputMaybe<Scalars['EmailAddress']>;
  first_name?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['ObjectID']>;
  last_name?: InputMaybe<Scalars['String']>;
  memberships?: InputMaybe<MembershipInput>;
  phone?: InputMaybe<Scalars['PhoneNumber']>;
};

export type VerifyEmailInput = {
  code: Scalars['String'];
  email: Scalars['EmailAddress'];
};

export type VerifyEmailResponse = {
  __typename?: 'VerifyEmailResponse';
  message: Scalars['String'];
};

export type LoginProvider_LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginProvider_LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginAccountResponse', token: any, account: { __typename?: 'Account', _id: string, email: string } } };

export type RegisterProvider_RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterProvider_RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'Account', _id: string } };

export type ResetActivationCodeProvider_ResetActivationCodeMutationVariables = Exact<{
  resetCodeInput: ResetCodeInput;
}>;


export type ResetActivationCodeProvider_ResetActivationCodeMutation = { __typename?: 'Mutation', resetActivationCode: { __typename?: 'Account', _id: string } };

export type ResetPasswordProvider_ResetPasswordMutationVariables = Exact<{
  resetInput: ResetPasswordInput;
}>;


export type ResetPasswordProvider_ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'Account', _id: string } };

export type VerifyEmailProvider_VerifyEmailMutationVariables = Exact<{
  verifyEmailInput: VerifyEmailInput;
}>;


export type VerifyEmailProvider_VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'Account', _id: string } };

export type AccountCountWidget_GetAccountsQueryVariables = Exact<{
  getAccountsInput: GetAccountsInput;
}>;


export type AccountCountWidget_GetAccountsQuery = { __typename?: 'Query', getAccounts: { __typename?: 'GetAccountsResponse', stats: { __typename?: 'Stats', total?: number | null, history?: Array<{ __typename?: 'HistoricStats', total?: number | null, _id?: { __typename?: 'HistoricStatsId', MONTH?: number | null } | null }> | null } } };

export type AccountPage_GetAccountsQueryVariables = Exact<{
  getAccountsInput: GetAccountsInput;
  getUsersInput: GetUsersInput;
}>;


export type AccountPage_GetAccountsQuery = { __typename?: 'Query', getAccounts: { __typename?: 'GetAccountsResponse', data: Array<{ __typename?: 'Account', _id: string, email: string, createdAt: Date, updatedAt: Date, activation?: { __typename?: 'Activation', code?: string | null, limit: Date, verified: boolean } | null, users: { __typename?: 'GetUsersResponse', stats: { __typename?: 'Stats', total?: number | null }, data: Array<{ __typename?: 'User', _id: string, email: string, first_name?: string | null, last_name?: string | null, updatedAt: Date, about?: string | null, image?: { __typename?: 'Media', path: string, _id: string } | null, memberships: Array<{ __typename?: 'Membership', _id: string, default: boolean, status?: MembershipStatusEnum | null, account: { __typename?: 'Account', _id: string } }> }> } }> } };

export type AccountSelect_GetAccountsQueryVariables = Exact<{
  getAccountsInput: GetAccountsInput;
  getUsersInput: GetUsersInput;
}>;


export type AccountSelect_GetAccountsQuery = { __typename?: 'Query', getAccounts: { __typename?: 'GetAccountsResponse', data: Array<{ __typename?: 'Account', _id: string, email: string, users: { __typename?: 'GetUsersResponse', data: Array<{ __typename?: 'User', _id: string, first_name?: string | null, last_name?: string | null, email: string }> } }> } };

export type AccountsPage_GetAccountsQueryVariables = Exact<{
  getAccountsInput: GetAccountsInput;
  getUsersInput: GetUsersInput;
}>;


export type AccountsPage_GetAccountsQuery = { __typename?: 'Query', getAccounts: { __typename?: 'GetAccountsResponse', stats: { __typename?: 'Stats', total?: number | null, remaining?: number | null, cursor?: Date | null }, data: Array<{ __typename?: 'Account', _id: string, email: string, createdAt: Date, users: { __typename?: 'GetUsersResponse', stats: { __typename?: 'Stats', total?: number | null } } }> } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', _id: string } };

export type UserPage_DeleteUserMutationVariables = Exact<{
  deleteUsersInput: DeleteUsersInput;
}>;


export type UserPage_DeleteUserMutation = { __typename?: 'Mutation', deleteUsers: { __typename?: 'DeleteResponse', deletedCount: number } };

export type UsersPage_InviteUserMutationVariables = Exact<{
  inviteUserInput: InviteUserInput;
}>;


export type UsersPage_InviteUserMutation = { __typename?: 'Mutation', inviteUser: { __typename?: 'User', _id: string, first_name?: string | null, memberships: Array<{ __typename?: 'Membership', role: number, status?: MembershipStatusEnum | null, _id: string, account: { __typename?: 'Account', _id: string } }> } };

export type LoginProvider_LoginUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LoginProvider_LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'LoginUserResponse', token: string, user: { __typename?: 'User', _id: string } } };

export type UserPage_UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UserPage_UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', _id: string, email: string, first_name?: string | null, last_name?: string | null, about?: string | null, phone?: string | null, address?: { __typename?: 'Address', city?: string | null, lineTwo?: string | null, lineOne?: string | null, state?: string | null, zip?: string | null } | null, image?: { __typename?: 'Media', _id: string, path: string, title: string } | null } };

export type App_MeQueryVariables = Exact<{ [key: string]: never; }>;


export type App_MeQuery = { __typename?: 'Query', me: { __typename?: 'User', _id: string, first_name?: string | null, last_name?: string | null, email: string, image?: { __typename?: 'Media', path: string } | null } };

export type UserCountWidget_GetUsersQueryVariables = Exact<{
  getUsersInput: GetUsersInput;
}>;


export type UserCountWidget_GetUsersQuery = { __typename?: 'Query', getUsers: { __typename?: 'GetUsersResponse', stats: { __typename?: 'Stats', total?: number | null, history?: Array<{ __typename?: 'HistoricStats', total?: number | null, _id?: { __typename?: 'HistoricStatsId', MONTH?: number | null } | null }> | null } } };

export type UserPage_GetUsersQueryVariables = Exact<{
  getUsersInput: GetUsersInput;
  membershipsAccountUsersInput: GetUsersInput;
}>;


export type UserPage_GetUsersQuery = { __typename?: 'Query', getUsers: { __typename?: 'GetUsersResponse', data: Array<{ __typename?: 'User', _id: string, first_name?: string | null, last_name?: string | null, email: string, phone?: string | null, about?: string | null, updatedAt: Date, createdAt: Date, address?: { __typename?: 'Address', lineOne?: string | null, lineTwo?: string | null, zip?: string | null, city?: string | null, state?: string | null, country?: string | null, _id?: string | null } | null, image?: { __typename?: 'Media', path: string, _id: string } | null, memberships: Array<{ __typename?: 'Membership', _id: string, role: number, status?: MembershipStatusEnum | null, createdAt: Date, updatedAt: Date, default: boolean, local?: { __typename?: 'LocalUserDetails', first_name?: string | null, last_name?: string | null, phone?: string | null, about?: string | null, image?: { __typename?: 'Media', _id: string, path: string } | null, address?: { __typename?: 'Address', lineOne?: string | null, lineTwo?: string | null, city?: string | null, state?: string | null, zip?: string | null, country?: string | null, _id?: string | null } | null } | null, account: { __typename?: 'Account', _id: string, email: string, users: { __typename?: 'GetUsersResponse', data: Array<{ __typename?: 'User', _id: string, first_name?: string | null, last_name?: string | null, email: string }> } } }> }> } };

export type UserSelect_GetUsersQueryVariables = Exact<{
  getUsersInput: GetUsersInput;
}>;


export type UserSelect_GetUsersQuery = { __typename?: 'Query', getUsers: { __typename?: 'GetUsersResponse', data: Array<{ __typename?: 'User', _id: string, email: string, first_name?: string | null, last_name?: string | null }> } };

export type UsersPage_GetUsersQueryVariables = Exact<{
  getUsersInput: GetUsersInput;
}>;


export type UsersPage_GetUsersQuery = { __typename?: 'Query', getUsers: { __typename?: 'GetUsersResponse', stats: { __typename?: 'Stats', total?: number | null, remaining?: number | null, cursor?: Date | null }, data: Array<{ __typename?: 'User', _id: string, first_name?: string | null, last_name?: string | null, email: string, phone?: string | null, image?: { __typename?: 'Media', path: string, _id: string } | null }> } };


export const LoginProvider_LoginDocument = gql`
    mutation LoginProvider_Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    token
    account {
      _id
      email
    }
  }
}
    `;
export type LoginProvider_LoginMutationFn = Apollo.MutationFunction<LoginProvider_LoginMutation, LoginProvider_LoginMutationVariables>;

/**
 * __useLoginProvider_LoginMutation__
 *
 * To run a mutation, you first call `useLoginProvider_LoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginProvider_LoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginProviderLoginMutation, { data, loading, error }] = useLoginProvider_LoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginProvider_LoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginProvider_LoginMutation, LoginProvider_LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginProvider_LoginMutation, LoginProvider_LoginMutationVariables>(LoginProvider_LoginDocument, options);
      }
export type LoginProvider_LoginMutationHookResult = ReturnType<typeof useLoginProvider_LoginMutation>;
export type LoginProvider_LoginMutationResult = Apollo.MutationResult<LoginProvider_LoginMutation>;
export type LoginProvider_LoginMutationOptions = Apollo.BaseMutationOptions<LoginProvider_LoginMutation, LoginProvider_LoginMutationVariables>;
export const RegisterProvider_RegisterDocument = gql`
    mutation RegisterProvider_Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    _id
  }
}
    `;
export type RegisterProvider_RegisterMutationFn = Apollo.MutationFunction<RegisterProvider_RegisterMutation, RegisterProvider_RegisterMutationVariables>;

/**
 * __useRegisterProvider_RegisterMutation__
 *
 * To run a mutation, you first call `useRegisterProvider_RegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterProvider_RegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerProviderRegisterMutation, { data, loading, error }] = useRegisterProvider_RegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterProvider_RegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterProvider_RegisterMutation, RegisterProvider_RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterProvider_RegisterMutation, RegisterProvider_RegisterMutationVariables>(RegisterProvider_RegisterDocument, options);
      }
export type RegisterProvider_RegisterMutationHookResult = ReturnType<typeof useRegisterProvider_RegisterMutation>;
export type RegisterProvider_RegisterMutationResult = Apollo.MutationResult<RegisterProvider_RegisterMutation>;
export type RegisterProvider_RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterProvider_RegisterMutation, RegisterProvider_RegisterMutationVariables>;
export const ResetActivationCodeProvider_ResetActivationCodeDocument = gql`
    mutation ResetActivationCodeProvider_ResetActivationCode($resetCodeInput: ResetCodeInput!) {
  resetActivationCode(resetCodeInput: $resetCodeInput) {
    _id
  }
}
    `;
export type ResetActivationCodeProvider_ResetActivationCodeMutationFn = Apollo.MutationFunction<ResetActivationCodeProvider_ResetActivationCodeMutation, ResetActivationCodeProvider_ResetActivationCodeMutationVariables>;

/**
 * __useResetActivationCodeProvider_ResetActivationCodeMutation__
 *
 * To run a mutation, you first call `useResetActivationCodeProvider_ResetActivationCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetActivationCodeProvider_ResetActivationCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetActivationCodeProviderResetActivationCodeMutation, { data, loading, error }] = useResetActivationCodeProvider_ResetActivationCodeMutation({
 *   variables: {
 *      resetCodeInput: // value for 'resetCodeInput'
 *   },
 * });
 */
export function useResetActivationCodeProvider_ResetActivationCodeMutation(baseOptions?: Apollo.MutationHookOptions<ResetActivationCodeProvider_ResetActivationCodeMutation, ResetActivationCodeProvider_ResetActivationCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetActivationCodeProvider_ResetActivationCodeMutation, ResetActivationCodeProvider_ResetActivationCodeMutationVariables>(ResetActivationCodeProvider_ResetActivationCodeDocument, options);
      }
export type ResetActivationCodeProvider_ResetActivationCodeMutationHookResult = ReturnType<typeof useResetActivationCodeProvider_ResetActivationCodeMutation>;
export type ResetActivationCodeProvider_ResetActivationCodeMutationResult = Apollo.MutationResult<ResetActivationCodeProvider_ResetActivationCodeMutation>;
export type ResetActivationCodeProvider_ResetActivationCodeMutationOptions = Apollo.BaseMutationOptions<ResetActivationCodeProvider_ResetActivationCodeMutation, ResetActivationCodeProvider_ResetActivationCodeMutationVariables>;
export const ResetPasswordProvider_ResetPasswordDocument = gql`
    mutation ResetPasswordProvider_ResetPassword($resetInput: ResetPasswordInput!) {
  resetPassword(resetInput: $resetInput) {
    _id
  }
}
    `;
export type ResetPasswordProvider_ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordProvider_ResetPasswordMutation, ResetPasswordProvider_ResetPasswordMutationVariables>;

/**
 * __useResetPasswordProvider_ResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordProvider_ResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordProvider_ResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordProviderResetPasswordMutation, { data, loading, error }] = useResetPasswordProvider_ResetPasswordMutation({
 *   variables: {
 *      resetInput: // value for 'resetInput'
 *   },
 * });
 */
export function useResetPasswordProvider_ResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordProvider_ResetPasswordMutation, ResetPasswordProvider_ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordProvider_ResetPasswordMutation, ResetPasswordProvider_ResetPasswordMutationVariables>(ResetPasswordProvider_ResetPasswordDocument, options);
      }
export type ResetPasswordProvider_ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordProvider_ResetPasswordMutation>;
export type ResetPasswordProvider_ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordProvider_ResetPasswordMutation>;
export type ResetPasswordProvider_ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordProvider_ResetPasswordMutation, ResetPasswordProvider_ResetPasswordMutationVariables>;
export const VerifyEmailProvider_VerifyEmailDocument = gql`
    mutation VerifyEmailProvider_VerifyEmail($verifyEmailInput: VerifyEmailInput!) {
  verifyEmail(verifyEmailInput: $verifyEmailInput) {
    _id
  }
}
    `;
export type VerifyEmailProvider_VerifyEmailMutationFn = Apollo.MutationFunction<VerifyEmailProvider_VerifyEmailMutation, VerifyEmailProvider_VerifyEmailMutationVariables>;

/**
 * __useVerifyEmailProvider_VerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailProvider_VerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailProvider_VerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailProviderVerifyEmailMutation, { data, loading, error }] = useVerifyEmailProvider_VerifyEmailMutation({
 *   variables: {
 *      verifyEmailInput: // value for 'verifyEmailInput'
 *   },
 * });
 */
export function useVerifyEmailProvider_VerifyEmailMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailProvider_VerifyEmailMutation, VerifyEmailProvider_VerifyEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyEmailProvider_VerifyEmailMutation, VerifyEmailProvider_VerifyEmailMutationVariables>(VerifyEmailProvider_VerifyEmailDocument, options);
      }
export type VerifyEmailProvider_VerifyEmailMutationHookResult = ReturnType<typeof useVerifyEmailProvider_VerifyEmailMutation>;
export type VerifyEmailProvider_VerifyEmailMutationResult = Apollo.MutationResult<VerifyEmailProvider_VerifyEmailMutation>;
export type VerifyEmailProvider_VerifyEmailMutationOptions = Apollo.BaseMutationOptions<VerifyEmailProvider_VerifyEmailMutation, VerifyEmailProvider_VerifyEmailMutationVariables>;
export const AccountCountWidget_GetAccountsDocument = gql`
    query AccountCountWidget_GetAccounts($getAccountsInput: GetAccountsInput!) {
  getAccounts(getAccountsInput: $getAccountsInput) {
    stats {
      total
      history {
        _id {
          MONTH
        }
        total
      }
    }
  }
}
    `;

/**
 * __useAccountCountWidget_GetAccountsQuery__
 *
 * To run a query within a React component, call `useAccountCountWidget_GetAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountCountWidget_GetAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountCountWidget_GetAccountsQuery({
 *   variables: {
 *      getAccountsInput: // value for 'getAccountsInput'
 *   },
 * });
 */
export function useAccountCountWidget_GetAccountsQuery(baseOptions: Apollo.QueryHookOptions<AccountCountWidget_GetAccountsQuery, AccountCountWidget_GetAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountCountWidget_GetAccountsQuery, AccountCountWidget_GetAccountsQueryVariables>(AccountCountWidget_GetAccountsDocument, options);
      }
export function useAccountCountWidget_GetAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountCountWidget_GetAccountsQuery, AccountCountWidget_GetAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountCountWidget_GetAccountsQuery, AccountCountWidget_GetAccountsQueryVariables>(AccountCountWidget_GetAccountsDocument, options);
        }
export type AccountCountWidget_GetAccountsQueryHookResult = ReturnType<typeof useAccountCountWidget_GetAccountsQuery>;
export type AccountCountWidget_GetAccountsLazyQueryHookResult = ReturnType<typeof useAccountCountWidget_GetAccountsLazyQuery>;
export type AccountCountWidget_GetAccountsQueryResult = Apollo.QueryResult<AccountCountWidget_GetAccountsQuery, AccountCountWidget_GetAccountsQueryVariables>;
export const AccountPage_GetAccountsDocument = gql`
    query AccountPage_GetAccounts($getAccountsInput: GetAccountsInput!, $getUsersInput: GetUsersInput!) {
  getAccounts(getAccountsInput: $getAccountsInput) {
    data {
      _id
      email
      createdAt
      updatedAt
      activation {
        code
        limit
        verified
      }
      users(getUsersInput: $getUsersInput) {
        stats {
          total
        }
        data {
          _id
          email
          first_name
          last_name
          updatedAt
          about
          image {
            path
            _id
          }
          memberships {
            _id
            default
            status
            account {
              _id
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useAccountPage_GetAccountsQuery__
 *
 * To run a query within a React component, call `useAccountPage_GetAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountPage_GetAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountPage_GetAccountsQuery({
 *   variables: {
 *      getAccountsInput: // value for 'getAccountsInput'
 *      getUsersInput: // value for 'getUsersInput'
 *   },
 * });
 */
export function useAccountPage_GetAccountsQuery(baseOptions: Apollo.QueryHookOptions<AccountPage_GetAccountsQuery, AccountPage_GetAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountPage_GetAccountsQuery, AccountPage_GetAccountsQueryVariables>(AccountPage_GetAccountsDocument, options);
      }
export function useAccountPage_GetAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountPage_GetAccountsQuery, AccountPage_GetAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountPage_GetAccountsQuery, AccountPage_GetAccountsQueryVariables>(AccountPage_GetAccountsDocument, options);
        }
export type AccountPage_GetAccountsQueryHookResult = ReturnType<typeof useAccountPage_GetAccountsQuery>;
export type AccountPage_GetAccountsLazyQueryHookResult = ReturnType<typeof useAccountPage_GetAccountsLazyQuery>;
export type AccountPage_GetAccountsQueryResult = Apollo.QueryResult<AccountPage_GetAccountsQuery, AccountPage_GetAccountsQueryVariables>;
export const AccountSelect_GetAccountsDocument = gql`
    query AccountSelect_GetAccounts($getAccountsInput: GetAccountsInput!, $getUsersInput: GetUsersInput!) {
  getAccounts(getAccountsInput: $getAccountsInput) {
    data {
      _id
      email
      users(getUsersInput: $getUsersInput) {
        data {
          _id
          first_name
          last_name
          email
        }
      }
    }
  }
}
    `;

/**
 * __useAccountSelect_GetAccountsQuery__
 *
 * To run a query within a React component, call `useAccountSelect_GetAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountSelect_GetAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountSelect_GetAccountsQuery({
 *   variables: {
 *      getAccountsInput: // value for 'getAccountsInput'
 *      getUsersInput: // value for 'getUsersInput'
 *   },
 * });
 */
export function useAccountSelect_GetAccountsQuery(baseOptions: Apollo.QueryHookOptions<AccountSelect_GetAccountsQuery, AccountSelect_GetAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountSelect_GetAccountsQuery, AccountSelect_GetAccountsQueryVariables>(AccountSelect_GetAccountsDocument, options);
      }
export function useAccountSelect_GetAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountSelect_GetAccountsQuery, AccountSelect_GetAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountSelect_GetAccountsQuery, AccountSelect_GetAccountsQueryVariables>(AccountSelect_GetAccountsDocument, options);
        }
export type AccountSelect_GetAccountsQueryHookResult = ReturnType<typeof useAccountSelect_GetAccountsQuery>;
export type AccountSelect_GetAccountsLazyQueryHookResult = ReturnType<typeof useAccountSelect_GetAccountsLazyQuery>;
export type AccountSelect_GetAccountsQueryResult = Apollo.QueryResult<AccountSelect_GetAccountsQuery, AccountSelect_GetAccountsQueryVariables>;
export const AccountsPage_GetAccountsDocument = gql`
    query AccountsPage_GetAccounts($getAccountsInput: GetAccountsInput!, $getUsersInput: GetUsersInput!) {
  getAccounts(getAccountsInput: $getAccountsInput) {
    stats {
      total
      remaining
      cursor
    }
    data {
      _id
      email
      createdAt
      users(getUsersInput: $getUsersInput) {
        stats {
          total
        }
      }
    }
  }
}
    `;

/**
 * __useAccountsPage_GetAccountsQuery__
 *
 * To run a query within a React component, call `useAccountsPage_GetAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountsPage_GetAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountsPage_GetAccountsQuery({
 *   variables: {
 *      getAccountsInput: // value for 'getAccountsInput'
 *      getUsersInput: // value for 'getUsersInput'
 *   },
 * });
 */
export function useAccountsPage_GetAccountsQuery(baseOptions: Apollo.QueryHookOptions<AccountsPage_GetAccountsQuery, AccountsPage_GetAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountsPage_GetAccountsQuery, AccountsPage_GetAccountsQueryVariables>(AccountsPage_GetAccountsDocument, options);
      }
export function useAccountsPage_GetAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountsPage_GetAccountsQuery, AccountsPage_GetAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountsPage_GetAccountsQuery, AccountsPage_GetAccountsQueryVariables>(AccountsPage_GetAccountsDocument, options);
        }
export type AccountsPage_GetAccountsQueryHookResult = ReturnType<typeof useAccountsPage_GetAccountsQuery>;
export type AccountsPage_GetAccountsLazyQueryHookResult = ReturnType<typeof useAccountsPage_GetAccountsLazyQuery>;
export type AccountsPage_GetAccountsQueryResult = Apollo.QueryResult<AccountsPage_GetAccountsQuery, AccountsPage_GetAccountsQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    _id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UserPage_DeleteUserDocument = gql`
    mutation UserPage_DeleteUser($deleteUsersInput: DeleteUsersInput!) {
  deleteUsers(deleteUsersInput: $deleteUsersInput) {
    deletedCount
  }
}
    `;
export type UserPage_DeleteUserMutationFn = Apollo.MutationFunction<UserPage_DeleteUserMutation, UserPage_DeleteUserMutationVariables>;

/**
 * __useUserPage_DeleteUserMutation__
 *
 * To run a mutation, you first call `useUserPage_DeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserPage_DeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userPageDeleteUserMutation, { data, loading, error }] = useUserPage_DeleteUserMutation({
 *   variables: {
 *      deleteUsersInput: // value for 'deleteUsersInput'
 *   },
 * });
 */
export function useUserPage_DeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<UserPage_DeleteUserMutation, UserPage_DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserPage_DeleteUserMutation, UserPage_DeleteUserMutationVariables>(UserPage_DeleteUserDocument, options);
      }
export type UserPage_DeleteUserMutationHookResult = ReturnType<typeof useUserPage_DeleteUserMutation>;
export type UserPage_DeleteUserMutationResult = Apollo.MutationResult<UserPage_DeleteUserMutation>;
export type UserPage_DeleteUserMutationOptions = Apollo.BaseMutationOptions<UserPage_DeleteUserMutation, UserPage_DeleteUserMutationVariables>;
export const UsersPage_InviteUserDocument = gql`
    mutation UsersPage_InviteUser($inviteUserInput: InviteUserInput!) {
  inviteUser(inviteUserInput: $inviteUserInput) {
    _id
    first_name
    memberships {
      role
      status
      _id
      account {
        _id
      }
    }
  }
}
    `;
export type UsersPage_InviteUserMutationFn = Apollo.MutationFunction<UsersPage_InviteUserMutation, UsersPage_InviteUserMutationVariables>;

/**
 * __useUsersPage_InviteUserMutation__
 *
 * To run a mutation, you first call `useUsersPage_InviteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUsersPage_InviteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [usersPageInviteUserMutation, { data, loading, error }] = useUsersPage_InviteUserMutation({
 *   variables: {
 *      inviteUserInput: // value for 'inviteUserInput'
 *   },
 * });
 */
export function useUsersPage_InviteUserMutation(baseOptions?: Apollo.MutationHookOptions<UsersPage_InviteUserMutation, UsersPage_InviteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UsersPage_InviteUserMutation, UsersPage_InviteUserMutationVariables>(UsersPage_InviteUserDocument, options);
      }
export type UsersPage_InviteUserMutationHookResult = ReturnType<typeof useUsersPage_InviteUserMutation>;
export type UsersPage_InviteUserMutationResult = Apollo.MutationResult<UsersPage_InviteUserMutation>;
export type UsersPage_InviteUserMutationOptions = Apollo.BaseMutationOptions<UsersPage_InviteUserMutation, UsersPage_InviteUserMutationVariables>;
export const LoginProvider_LoginUserDocument = gql`
    mutation LoginProvider_LoginUser {
  loginUser {
    token
    user {
      _id
    }
  }
}
    `;
export type LoginProvider_LoginUserMutationFn = Apollo.MutationFunction<LoginProvider_LoginUserMutation, LoginProvider_LoginUserMutationVariables>;

/**
 * __useLoginProvider_LoginUserMutation__
 *
 * To run a mutation, you first call `useLoginProvider_LoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginProvider_LoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginProviderLoginUserMutation, { data, loading, error }] = useLoginProvider_LoginUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLoginProvider_LoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginProvider_LoginUserMutation, LoginProvider_LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginProvider_LoginUserMutation, LoginProvider_LoginUserMutationVariables>(LoginProvider_LoginUserDocument, options);
      }
export type LoginProvider_LoginUserMutationHookResult = ReturnType<typeof useLoginProvider_LoginUserMutation>;
export type LoginProvider_LoginUserMutationResult = Apollo.MutationResult<LoginProvider_LoginUserMutation>;
export type LoginProvider_LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginProvider_LoginUserMutation, LoginProvider_LoginUserMutationVariables>;
export const UserPage_UpdateUserDocument = gql`
    mutation UserPage_UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    _id
    email
    first_name
    last_name
    about
    address {
      city
      lineTwo
      lineOne
      state
      zip
    }
    phone
    image {
      _id
      path
      title
    }
  }
}
    `;
export type UserPage_UpdateUserMutationFn = Apollo.MutationFunction<UserPage_UpdateUserMutation, UserPage_UpdateUserMutationVariables>;

/**
 * __useUserPage_UpdateUserMutation__
 *
 * To run a mutation, you first call `useUserPage_UpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserPage_UpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userPageUpdateUserMutation, { data, loading, error }] = useUserPage_UpdateUserMutation({
 *   variables: {
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUserPage_UpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UserPage_UpdateUserMutation, UserPage_UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserPage_UpdateUserMutation, UserPage_UpdateUserMutationVariables>(UserPage_UpdateUserDocument, options);
      }
export type UserPage_UpdateUserMutationHookResult = ReturnType<typeof useUserPage_UpdateUserMutation>;
export type UserPage_UpdateUserMutationResult = Apollo.MutationResult<UserPage_UpdateUserMutation>;
export type UserPage_UpdateUserMutationOptions = Apollo.BaseMutationOptions<UserPage_UpdateUserMutation, UserPage_UpdateUserMutationVariables>;
export const App_MeDocument = gql`
    query App_Me {
  me {
    _id
    first_name
    last_name
    email
    image {
      path
    }
  }
}
    `;

/**
 * __useApp_MeQuery__
 *
 * To run a query within a React component, call `useApp_MeQuery` and pass it any options that fit your needs.
 * When your component renders, `useApp_MeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApp_MeQuery({
 *   variables: {
 *   },
 * });
 */
export function useApp_MeQuery(baseOptions?: Apollo.QueryHookOptions<App_MeQuery, App_MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<App_MeQuery, App_MeQueryVariables>(App_MeDocument, options);
      }
export function useApp_MeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<App_MeQuery, App_MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<App_MeQuery, App_MeQueryVariables>(App_MeDocument, options);
        }
export type App_MeQueryHookResult = ReturnType<typeof useApp_MeQuery>;
export type App_MeLazyQueryHookResult = ReturnType<typeof useApp_MeLazyQuery>;
export type App_MeQueryResult = Apollo.QueryResult<App_MeQuery, App_MeQueryVariables>;
export const UserCountWidget_GetUsersDocument = gql`
    query UserCountWidget_GetUsers($getUsersInput: GetUsersInput!) {
  getUsers(getUsersInput: $getUsersInput) {
    stats {
      total
      history {
        _id {
          MONTH
        }
        total
      }
    }
  }
}
    `;

/**
 * __useUserCountWidget_GetUsersQuery__
 *
 * To run a query within a React component, call `useUserCountWidget_GetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCountWidget_GetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCountWidget_GetUsersQuery({
 *   variables: {
 *      getUsersInput: // value for 'getUsersInput'
 *   },
 * });
 */
export function useUserCountWidget_GetUsersQuery(baseOptions: Apollo.QueryHookOptions<UserCountWidget_GetUsersQuery, UserCountWidget_GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserCountWidget_GetUsersQuery, UserCountWidget_GetUsersQueryVariables>(UserCountWidget_GetUsersDocument, options);
      }
export function useUserCountWidget_GetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserCountWidget_GetUsersQuery, UserCountWidget_GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserCountWidget_GetUsersQuery, UserCountWidget_GetUsersQueryVariables>(UserCountWidget_GetUsersDocument, options);
        }
export type UserCountWidget_GetUsersQueryHookResult = ReturnType<typeof useUserCountWidget_GetUsersQuery>;
export type UserCountWidget_GetUsersLazyQueryHookResult = ReturnType<typeof useUserCountWidget_GetUsersLazyQuery>;
export type UserCountWidget_GetUsersQueryResult = Apollo.QueryResult<UserCountWidget_GetUsersQuery, UserCountWidget_GetUsersQueryVariables>;
export const UserPage_GetUsersDocument = gql`
    query UserPage_GetUsers($getUsersInput: GetUsersInput!, $membershipsAccountUsersInput: GetUsersInput!) {
  getUsers(getUsersInput: $getUsersInput) {
    data {
      _id
      first_name
      last_name
      email
      phone
      about
      updatedAt
      createdAt
      address {
        lineOne
        lineTwo
        zip
        city
        state
        country
        _id
      }
      image {
        path
        _id
      }
      memberships {
        _id
        role
        status
        createdAt
        updatedAt
        default
        local {
          first_name
          last_name
          phone
          about
          image {
            _id
            path
          }
          address {
            lineOne
            lineTwo
            city
            state
            zip
            country
            _id
          }
        }
        account {
          _id
          email
          users(getUsersInput: $membershipsAccountUsersInput) {
            data {
              _id
              first_name
              last_name
              email
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useUserPage_GetUsersQuery__
 *
 * To run a query within a React component, call `useUserPage_GetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPage_GetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPage_GetUsersQuery({
 *   variables: {
 *      getUsersInput: // value for 'getUsersInput'
 *      membershipsAccountUsersInput: // value for 'membershipsAccountUsersInput'
 *   },
 * });
 */
export function useUserPage_GetUsersQuery(baseOptions: Apollo.QueryHookOptions<UserPage_GetUsersQuery, UserPage_GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserPage_GetUsersQuery, UserPage_GetUsersQueryVariables>(UserPage_GetUsersDocument, options);
      }
export function useUserPage_GetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserPage_GetUsersQuery, UserPage_GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserPage_GetUsersQuery, UserPage_GetUsersQueryVariables>(UserPage_GetUsersDocument, options);
        }
export type UserPage_GetUsersQueryHookResult = ReturnType<typeof useUserPage_GetUsersQuery>;
export type UserPage_GetUsersLazyQueryHookResult = ReturnType<typeof useUserPage_GetUsersLazyQuery>;
export type UserPage_GetUsersQueryResult = Apollo.QueryResult<UserPage_GetUsersQuery, UserPage_GetUsersQueryVariables>;
export const UserSelect_GetUsersDocument = gql`
    query UserSelect_GetUsers($getUsersInput: GetUsersInput!) {
  getUsers(getUsersInput: $getUsersInput) {
    data {
      _id
      email
      first_name
      last_name
    }
  }
}
    `;

/**
 * __useUserSelect_GetUsersQuery__
 *
 * To run a query within a React component, call `useUserSelect_GetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSelect_GetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSelect_GetUsersQuery({
 *   variables: {
 *      getUsersInput: // value for 'getUsersInput'
 *   },
 * });
 */
export function useUserSelect_GetUsersQuery(baseOptions: Apollo.QueryHookOptions<UserSelect_GetUsersQuery, UserSelect_GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserSelect_GetUsersQuery, UserSelect_GetUsersQueryVariables>(UserSelect_GetUsersDocument, options);
      }
export function useUserSelect_GetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserSelect_GetUsersQuery, UserSelect_GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserSelect_GetUsersQuery, UserSelect_GetUsersQueryVariables>(UserSelect_GetUsersDocument, options);
        }
export type UserSelect_GetUsersQueryHookResult = ReturnType<typeof useUserSelect_GetUsersQuery>;
export type UserSelect_GetUsersLazyQueryHookResult = ReturnType<typeof useUserSelect_GetUsersLazyQuery>;
export type UserSelect_GetUsersQueryResult = Apollo.QueryResult<UserSelect_GetUsersQuery, UserSelect_GetUsersQueryVariables>;
export const UsersPage_GetUsersDocument = gql`
    query UsersPage_GetUsers($getUsersInput: GetUsersInput!) {
  getUsers(getUsersInput: $getUsersInput) {
    stats {
      total
      remaining
      cursor
    }
    data {
      _id
      first_name
      last_name
      email
      phone
      image {
        path
        _id
      }
    }
  }
}
    `;

/**
 * __useUsersPage_GetUsersQuery__
 *
 * To run a query within a React component, call `useUsersPage_GetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersPage_GetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersPage_GetUsersQuery({
 *   variables: {
 *      getUsersInput: // value for 'getUsersInput'
 *   },
 * });
 */
export function useUsersPage_GetUsersQuery(baseOptions: Apollo.QueryHookOptions<UsersPage_GetUsersQuery, UsersPage_GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersPage_GetUsersQuery, UsersPage_GetUsersQueryVariables>(UsersPage_GetUsersDocument, options);
      }
export function useUsersPage_GetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersPage_GetUsersQuery, UsersPage_GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersPage_GetUsersQuery, UsersPage_GetUsersQueryVariables>(UsersPage_GetUsersDocument, options);
        }
export type UsersPage_GetUsersQueryHookResult = ReturnType<typeof useUsersPage_GetUsersQuery>;
export type UsersPage_GetUsersLazyQueryHookResult = ReturnType<typeof useUsersPage_GetUsersLazyQuery>;
export type UsersPage_GetUsersQueryResult = Apollo.QueryResult<UsersPage_GetUsersQuery, UsersPage_GetUsersQueryVariables>;