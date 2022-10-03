"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql) `
    type Contact {
        _id: ID!
        firstName: String!
        lastName: String!
        number: String!
    }

    input CreateContactInput {
        firstName: String!
        lastName: String!
        number: String!
    }

    input UpdateContactInput {
        firstName: String!
        lastName: String!
        number: String!
    }

    type DeletePayload {
        _id: ID!
    }

    type Query{
        contacts(lastName: String): [Contact]
        searchContact(lastName: String!): [Contact]
    }
    
    type Mutation{
        createContact(input: CreateContactInput!): Contact! 
        updateContact(id: ID!, input: UpdateContactInput!): Contact!
        deleteContact(id: ID!): DeletePayload!
    }
`;
