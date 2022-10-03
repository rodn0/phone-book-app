import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { GraphQLSchema } from "graphql";
import { Express } from "express";

export const initializeApollo = async(app: Express) => {
    const { registerSchemas } = require("../graphql");

    const schema = <GraphQLSchema> await registerSchemas();
    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [
            ApolloServerPluginLandingPageLocalDefault({ embed: true }),
        ],
    });

    await server.start();

    server.applyMiddleware({ app, path: '/api/graphql' });
};
