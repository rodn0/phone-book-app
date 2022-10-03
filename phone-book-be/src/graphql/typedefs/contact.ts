import { gql } from "apollo-server-express";

export default gql`
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