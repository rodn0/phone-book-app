import { useMutation, useQuery } from "@apollo/client";
import { createContext, PropsWithChildren } from "react";
import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT } from "../../api/Mutation/contact/contact.mutation";
import { GET_CONTACTS } from "../../api/Queries/contact/contact.queries";
import { ContactInput, ContactInterface } from "../../types/contactTypes";

interface ContactContextProps {
  data?: [ContactInterface];
  search?: (n: string) => void;
  loading?: boolean;
  add?: (contact: ContactInput, fn: (finishedAdding: boolean) => void) => void; 
  delete?: (id: string) => void;
  update?: (id: string, contact: ContactInput, fn: (finishedUpdating: boolean) => void) => void; 
}

export const ContactContext = createContext<ContactContextProps>({});

export const ContactProvider = ({ children }: PropsWithChildren) => {
  const { loading, data, refetch } = useQuery(GET_CONTACTS, {
    variables: {}
  });

  const [addContact, { loading: addLoading }] = useMutation<{addContact: ContactInput }>(ADD_CONTACT);
  const [updateContact, { loading: updateLoading }] = useMutation<{updateContact: ContactInput }>(UPDATE_CONTACT);
  const [deleteContact, { loading: deleteLoading }] = useMutation<{deleteContact: string}>(DELETE_CONTACT);

  const handleSearch = (lastName: string) => {
    refetch({ lastName })
  }

  const handleAdd = (input: ContactInput, callback: (finishedAdding: boolean) => void) => {
    addContact({
      variables: {
        input
      }
    }).then(() => {
      refetch();
      callback(true);
    })
  }

  const handleUpdate = (id: string, input: ContactInput, callback: (finishedUpdating: boolean) => void) => {
    updateContact({
      variables: {
        updateContactId: id,
        input
      }
    }).then(() => {
      refetch();
      callback(true);
    })
  }

  const handleDelete =  (id: string) => {
    deleteContact({ variables: { deleteContactId: id }}).then(() => {
      refetch();
    })
  }

  const contextProps: ContactContextProps = {
    data: data?.contacts,
    loading: loading || addLoading || deleteLoading || updateLoading,
    search: handleSearch,
    add: handleAdd,
    delete: handleDelete,
    update: handleUpdate
  }

  return (
    <ContactContext.Provider value={contextProps}>
      {children}
    </ContactContext.Provider>
  )
}

