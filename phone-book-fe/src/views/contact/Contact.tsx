import { Backdrop, Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useContext, useState } from "react";
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import ContactItem from "../../components/ContactItem/ContactItem";
import { ContactContext } from "../../components/ContactProvider/ContactProvider";
import ContactDialog from "../../components/Dialogs/ContactDialog/ContactDialog";
import SearchInput from "../../components/SearchInput/SearchInput";
import { ContactDialogMode } from "../../enums/contactDialogMode.enum";
import { ContactInterface } from "../../types/contactTypes";

const Contact = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editableContact, setEditableContact] = useState<ContactInterface>();
  const [mode, setMode] = useState('')
  const contactContext = useContext(ContactContext);
  
  const contactData = contactContext.data ? contactContext.data : [];
  
  const handleCloseCreateDialog = () => {
    setShowCreateDialog(false);
  }

  const handleDelete = (id: string) => {
    if(contactContext?.delete) {
      contactContext?.delete(id);
    }
  }

  const handleSearchChange = (term: string) => {
    if(contactContext.search) {
      contactContext.search(term)
    }
  }

  const handleShowUpdateDialog = (contact: ContactInterface) => {
    setEditableContact(contact);
    setMode(ContactDialogMode.UPDATE);
    setShowCreateDialog(true);
  }

  const handleShowAddContactDialog = () => {
    setMode(ContactDialogMode.ADD);
    setShowCreateDialog(true);
  }

  return (
    <BaseLayout>
      <Box mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h5" fontWeight="Bold">Contact</Typography>
          </Grid>
          <Grid item xs={4} display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleShowAddContactDialog}>{`+ Add Contact`}</Button>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <SearchInput onSearchChange={handleSearchChange}/>
      </Box>
      <Box>
        {
          contactData?.map(d => <ContactItem contact={d} onDelete={handleDelete} onUpdate={handleShowUpdateDialog}/>)
        }
      </Box>
      <ContactDialog open={showCreateDialog} handleClose={handleCloseCreateDialog} contact={editableContact} mode={mode}/>
      <Backdrop open={contactContext.loading as boolean}>
        <CircularProgress />
      </Backdrop>
    </BaseLayout>
  )
};

export default Contact;