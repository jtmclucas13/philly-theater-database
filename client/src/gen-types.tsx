import gql from "graphql-tag";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: "Mutation";
  createTheater?: Maybe<Scalars["String"]>;
  deleteTheater?: Maybe<Scalars["String"]>;
};

export type MutationCreateTheaterArgs = {
  artisticDirector: Scalars["String"];
  active?: Maybe<Scalars["Boolean"]>;
};

export type MutationDeleteTheaterArgs = {
  id: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  theaters: Array<Theater>;
};

export type Theater = {
  __typename?: "Theater";
  id: Scalars["String"];
  artisticDirector?: Maybe<Scalars["String"]>;
  active?: Maybe<Scalars["Boolean"]>;
  yearFounded?: Maybe<Scalars["Int"]>;
};
