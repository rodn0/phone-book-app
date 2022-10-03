import { Backdrop, Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useContext, useState } from "react";
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import ContactItem from "../../components/ContactItem/ContactItem";
import { ContactContext } from "../../components/ContactProvider/ContactProvider";
import CreateContactDialog from "../../components/Dialogs/CreateContact/CreateContect";
import SearchInput from "../../components/SearchInput/SearchInput";

const Contact = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const contactContext = useContext(ContactContext);
  
  const contactData = contactContext.data ? contactContext.data : [];
  const searchOptions = contactData.map(contact => contact.lastName);
  
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

  return (
    <BaseLayout>
      <Box mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h5" fontWeight="Bold">Contact</Typography>
          </Grid>
          <Grid item xs={4} display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={() => setShowCreateDialog(true)}>{`+ Add Contact`}</Button>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <SearchInput onSearchChange={handleSearchChange}/>
      </Box>
      <Box>
        {
          contactData?.map(d => <ContactItem contact={d} onDelete={handleDelete}/>)
        }
      </Box>
      <CreateContactDialog open={showCreateDialog} handleClose={handleCloseCreateDialog} />
      <Backdrop open={contactContext.loading as boolean}>
        <CircularProgress />
      </Backdrop>
    </BaseLayout>
  )
};

export default Contact;