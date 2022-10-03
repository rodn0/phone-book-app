import { gql } from "@apollo/client";

export const CREATE_CONTACT = gql`
  mutation CreateContact($input: CreateContactInput!) {
    createContact(input: $input) {
      _id
      firstName
      lastName
      number
    }
  }
`

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($updateContactId: ID!, $input: UpdateContactInput!) {
    updateContact(id: $updateContactId, input: $input) {
      _id
      firstName
      lastName
      number
    }
  }
`

export const DELETE_CONTACT = gql`
  mutation DeleteContact($deleteContactId: ID!) {
    deleteContact(id: $deleteContactId) {
      _id
    }
  }
`