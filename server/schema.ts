import gql from "graphql-tag";

export const schema = gql`
  type Theater {
    id: String!
    artisticDirector: String
    active: Boolean
    yearFounded: Int
  }
  type Artist {
    id: String!
    firstName: String
    lastName: String
    preferredName: String
    profession: String
    associatedOrganizations: [Theater] //JTM LEFT OFF HERE - adding foreign/primary keys to db for artists table
  }
  type Query {
    theaters: [Theater!]!
  }
  type Mutation {
    createTheater(artisticDirector: String!, active: Boolean): String
    deleteTheater(id: String!): String
  }
`;
