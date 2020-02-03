import express from "express";
import { ApolloServer } from "apollo-server-express";
import { db } from "./pgAdaptor";
import cors from "cors";
import { Resolvers } from "./gen-types";
import { schema } from "./schema";

const resolvers: Resolvers = {
  Query: {
    theaters: () => {
      const query = "SELECT * FROM theaters";
      return db
        .many(query)
        .then(res =>
          res.map(dbObject => ({
            ...dbObject,
            artisticDirector: dbObject.artisticdirector
          }))
        )
        .catch(err => err);
    }
  },
  Mutation: {
    createTheater: (parent, args, context, info) => {
      const query =
        "INSERT INTO theaters(artisticdirector, active, yearfounded) VALUES ($1, $2, 2019) RETURNING id";
      const values = [args.artisticDirector, args.active];

      return db
        .one(query, values)
        .then(res => res)
        .catch(err => err);
    },
    deleteTheater: (parent, args, context, info) => {
      const query = "DELETE FROM theaters WHERE id=$1 RETURNING id";
      const values = [args.id];
      return db
        .one(query, values)
        .then(res => res)
        .catch(err => err);
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers as any
});

const app = express();
server.applyMiddleware({ app });

app.use(cors());

app.listen({ port: 4000 }, () =>
  console.log("Server running at http://localhost:4000" + server.graphqlPath)
);
