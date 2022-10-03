import { Phone } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { ContactInterface } from '../../types/contactTypes';

interface ContactItemProps {
  contact: ContactInterface;
  onDelete: (id: string) => void;
  onUpdate: (contact: ContactInterface) => void
}

const ContactItem: FC<ContactItemProps> =({ contact, onDelete, onUpdate }: ContactItemProps) => {

  return (
    <Box key={contact._id} mt={2} height={80} sx={{
      backgroundColor: "#FFFFFF",
      display: "flex",
      justifyItems: "center"
    }}>
      <Grid container alignItems="center" ml={2} mr={2}>
        <Grid item xs={10}>
          <Typography fontSize={18} fontWeight="Bold">
            {`${contact.firstName} ${contact.lastName}`}
          </Typography>
          <Box display="flex" mt={1} alignItems="center">
            <Phone fontSize='small' color="action" />
            <Typography ml={1} color="gray" fontSize={18}>
              {contact.number}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2} display="flex" justifyContent="flex-end">
          <Box>
            <Button variant="contained" color="primary" onClick={() => onUpdate(contact)}>
              <EditIcon/>
            </Button>
          </Box>
          <Box ml={2}>
            <Button variant="contained" color="error" onClick={() => onDelete(contact._id)}>
              <DeleteIcon/>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactItem;