import { gql } from "@apollo/client";

export const GET_CONTACTS = gql`
  query Contacts($lastName: String) {
    contacts(lastName: $lastName) {
      firstName
      lastName
      number
      _id
    }
  }
`