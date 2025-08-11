export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddObjectInsertInput = {
  catId: Scalars['String']['input'];
  objName: Scalars['String']['input'];
};

export type AddPriceInsertInput = {
  actionDate: Scalars['String']['input'];
  amount: Scalars['String']['input'];
  comment: Scalars['String']['input'];
  objId: Scalars['String']['input'];
};

export type CatGql = {
  __typename?: 'CatGql';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  template: Scalars['Int']['output'];
};

export type ModifObjectInput = {
  id: Scalars['String']['input'];
  objName: Scalars['String']['input'];
  template: Scalars['String']['input'];
};

export type ModifPriceUpdateInput = {
  actionDate: Scalars['String']['input'];
  amount: Scalars['String']['input'];
  comment: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  objId: Scalars['String']['input'];
  template: Scalars['String']['input'];
};

export type MostUsedObjectGql = {
  __typename?: 'MostUsedObjectGql';
  catId: Scalars['Int']['output'];
  catName: Scalars['String']['output'];
  nb: Scalars['Int']['output'];
  objId: Scalars['Int']['output'];
  objName: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addObject: ObjGql;
  addPrice: PriceGql;
  modifObject: ObjGql;
  modifPrice: PriceGql;
};


export type MutationAddObjectArgs = {
  insert: AddObjectInsertInput;
};


export type MutationAddPriceArgs = {
  insert: AddPriceInsertInput;
};


export type MutationModifObjectArgs = {
  update: ModifObjectInput;
};


export type MutationModifPriceArgs = {
  update: ModifPriceUpdateInput;
};

export type ObjCatGql = {
  __typename?: 'ObjCatGql';
  id: Scalars['ID']['output'];
};

export type ObjGql = {
  __typename?: 'ObjGql';
  cat: ObjCatGql;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  template: Scalars['Int']['output'];
};

export type ObjectsWhereInput = {
  catId?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type PriceByIdWhereInput = {
  id: Scalars['ID']['input'];
};

export type PriceGql = {
  __typename?: 'PriceGql';
  actionDate: Scalars['String']['output'];
  amount: Scalars['String']['output'];
  cat: CatGql;
  comment?: Maybe<Scalars['String']['output']>;
  dateCreate: Scalars['String']['output'];
  dateModif: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  obj: PriceObjGql;
  template: Scalars['Int']['output'];
};

export type PriceObjGql = {
  __typename?: 'PriceObjGql';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  template: Scalars['Int']['output'];
};

export type PricesByDatesWhereInput = {
  months: Scalars['String']['input'];
  years: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  categories?: Maybe<Array<CatGql>>;
  lastPrices?: Maybe<Array<PriceGql>>;
  mostUsedObjects?: Maybe<Array<MostUsedObjectGql>>;
  objects?: Maybe<Array<ObjGql>>;
  priceById?: Maybe<Array<PriceGql>>;
  pricesByDates?: Maybe<Array<PriceGql>>;
  years?: Maybe<Array<YearGql>>;
};


export type QueryObjectsArgs = {
  where?: InputMaybe<ObjectsWhereInput>;
};


export type QueryPriceByIdArgs = {
  where: PriceByIdWhereInput;
};


export type QueryPricesByDatesArgs = {
  where: PricesByDatesWhereInput;
};

export type YearGql = {
  __typename?: 'YearGql';
  name: Scalars['String']['output'];
};
