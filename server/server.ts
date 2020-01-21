import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { Resolvers } from './gen-types'
import { schema } from './schema';

let theaters = [
    {
        id: '0',
        artisticDirector: 'Blanka Zizka',
        active: true,
    }
];

const resolvers: Resolvers = {
    Query: {
        theaters: () => theaters,
    },
    Mutation: {
        createTheater: (parent, args, context, info) => {
            const newId = Date.now().toString(); 
            theaters.push({
                id: newId,
                artisticDirector: args.artisticDirector,
                active: !!args.active,
            });
            return newId;
        },
        deleteTheater: (parent, args, context, info) => {
            const indexToRemove = theaters.findIndex(theater => theater.id === args.id);
            theaters.splice(indexToRemove, 1);
            return args.id;
        }
    }
}

const server = new ApolloServer({ typeDefs: schema, resolvers: resolvers as any });

const app = express();
server.applyMiddleware({ app });

app.use(cors());

app.listen({ port: 4000 }, () => console.log('Server running at http://localhost:4000' + server.graphqlPath));
