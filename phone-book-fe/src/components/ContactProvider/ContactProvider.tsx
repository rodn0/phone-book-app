import { ApolloCache, DefaultContext, FetchResult, MutationFunctionOptions, OperationVariables, useMutation, useQuery } from "@apollo/client";
import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { CREATE_CONTACT, DELETE_CONTACT } from "../../api/Mutation/contact/contact.mutation";
import { GET_CONTACTS } from "../../api/Queries/contact/contact.queries";
import { ContactInterface } from "../../types/contactTypes";

interface ContactContextProps {
  data?: [ContactInterface];
  search?: (n: string) => void;
  loading?: boolean;
  create?: (contact: CreateContactInput) => void; 
  delete?: (id: string) => void;
}

interface CreateContactInput {
  firstName: string;
  lastName: string;
  number: string;
}

export const ContactContext = createContext<ContactContextProps>({});

export const ContactProvider = ({ children }: PropsWithChildren) => {
  const { loading, data, refetch } = useQuery(GET_CONTACTS, {
    variables: {}
  });

  const [createContact, { loading: createLoading }] = useMutation<{createContact: CreateContactInput }>(CREATE_CONTACT);
  const [deleteContact, { loading: deleteLoading }] = useMutation<{deleteContact: string}>(DELETE_CONTACT);

  const handleSearch = (lastName: string) => {
    refetch({ lastName })
  }

  const handleCreate = (input: CreateContactInput) => {
    createContact({
      variables: {
        input
      }
    }).then(() => {
      refetch();
    })
  }

  const handleDelete =  (id: string) => {
    deleteContact({ variables: { deleteContactId: id }}).then(() => {
      refetch();
    })
  }

  const contextProps: ContactContextProps = {
    data: data?.contacts,
    loading: loading || createLoading || deleteLoading,
    search: handleSearch,
    create: handleCreate,
    delete: handleDelete
  }

  return (
    <ContactContext.Provider value={contextProps}>
      {children}
    </ContactContext.Provider>
  )
}

