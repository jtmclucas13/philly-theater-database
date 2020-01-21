const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

let theaters = [
    {
        id: 0,
        artisticDirector: 'Blanka Zizka',
        active: true,
    }
];

const typeDefs = gql`
    type Theater {
        id: String
        artisticDirector: String
        active: Boolean
    }
    type Query {
        theaters: [Theater]!
    }
    type Mutation {
        createTheater(artisticDirector: String!, active: Boolean):String
        deleteTheater(id: String!):String
    }
`;

const resolvers = {
    Query: {
        theaters: () => theaters,
    },
    Mutation: {
        createTheater: (parent, args, context, info) => {
            return theaters.push({
                id: Date.now().toString(),
                artisticDirector: args.artisticDirector,
                active: args.active,
            });
        },
        deleteTheater: (parent, args, context, info) => {
            const indexToRemove = theaters.findIndex(theater => theater.id === args.id);
            theaters.splice(indexToRemove, 1);
            return args.id;
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.use(cors());

app.listen({ port: 4000 }, () => console.log('Server running at http://localhost:4000' + server.graphqlPath));
