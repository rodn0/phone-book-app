import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormGroup, TextField } from "@mui/material";
import { FC, useContext, useState } from "react";
import { ContactContext } from "../../ContactProvider/ContactProvider";

interface CreateContactDialogProps {
  open: boolean;
  handleClose: () => void;
}

const CreateContactDialog:FC<CreateContactDialogProps> = ({ open, handleClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [number, setNumber] = useState('');

  const contactContext = useContext(ContactContext);

  const handleCreate = () => {
    if(contactContext.create) {
      contactContext.create({firstName, lastName, number });
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-contact-dialog"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="responsive-dialog-title">
        {"Create Contact"}
      </DialogTitle>
      <DialogContent>
        <FormGroup>
          <TextField 
            name="firstName" 
            variant="standard" 
            label="Enter First Name" 
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <TextField 
            name="lastName" 
            variant="standard" 
            label="Enter Last Name" 
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <TextField 
            name="number" 
            variant="standard" 
            label="Enter number" 
            onChange={(e) => setNumber(e.target.value)}
          />
        </FormGroup>
        
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleCreate} autoFocus>
          Create
        </Button>
      </DialogActions>
      <Backdrop open={contactContext?.loading as boolean}>
        <CircularProgress />
      </Backdrop>
    </Dialog>
  )
};

export default CreateContactDialog;