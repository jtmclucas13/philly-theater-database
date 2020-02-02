import gql from 'graphql-tag';

export const schema = gql`
    type Theater {
        id: String!
        artisticDirector: String
        active: Boolean
        yearFounded: Int
    }
    type Query {
        theaters: [Theater!]!
    }
    type Mutation {
        createTheater(artisticDirector: String!, active: Boolean):String
        deleteTheater(id: String!):String
    }
`;