import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormGroup, TextField } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { ContactDialogMode } from "../../../enums/contactDialogMode.enum";
import { ContactInterface } from "../../../types/contactTypes";
import { ContactContext } from "../../ContactProvider/ContactProvider";

interface ContactDialogProps {
  open: boolean;
  handleClose: () => void;
  contact: ContactInterface | undefined,
  mode: string
}

const ContactDialog:FC<ContactDialogProps> = ({ open, handleClose, contact, mode }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [number, setNumber] = useState('');

  const contactContext = useContext(ContactContext);

  useEffect(() => {
    if(mode === ContactDialogMode.UPDATE) {
      setFirstName(contact?.firstName as string);
      setLastName(contact?.lastName as string);
      setNumber(contact?.number as string);
    } else {
      setFirstName('');
      setLastName('');
      setNumber('');
    }
  }, [mode])

  const handleAdd = () => {
    if(contactContext.add) {
      contactContext.add({firstName, lastName, number }, (completed) => {
        if(completed) {
          handleClose();
        }
      });
    }
  }

  const handleUpdate = () => {
    if(contactContext.update) {
      contactContext.update(contact?._id as string, {firstName, lastName, number }, (completed: boolean) => {
        if(completed) {
          handleClose();
        }
      })
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-contact-dialog"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="responsive-dialog-title">
        {mode === ContactDialogMode.ADD ? "Add Contact" : "Update Contact" }
      </DialogTitle>
      <DialogContent>
        <FormGroup>
          <TextField 
            name="firstName" 
            value={firstName}
            variant="standard" 
            label="Enter First Name" 
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <TextField 
            name="lastName" 
            value={lastName}
            variant="standard" 
            label="Enter Last Name" 
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <TextField 
            name="number" 
            value={number}
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
        <Button onClick={mode === ContactDialogMode.ADD ? handleAdd : handleUpdate } autoFocus>
          { mode === ContactDialogMode.ADD ? "Add" : "Update" }
        </Button>
      </DialogActions>
      <Backdrop open={contactContext?.loading as boolean}>
        <CircularProgress />
      </Backdrop>
    </Dialog>
  )
};

export default ContactDialog;