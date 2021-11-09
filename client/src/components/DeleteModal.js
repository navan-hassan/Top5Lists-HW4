import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal() {
  const { store } = useContext(GlobalStoreContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
      store.unmarkListForDeletion();
  }

  const handleDeleteList = () => {
      store.deleteMarkedList();
      handleClose();
  }


  

  return (
    <div>
      <Modal
        open={store.listMarkedForDeletion !== null}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Alert severity="error" variant = "outlined">Delete the Top 5 {store.listMarkedForDeletion ?
        store.listMarkedForDeletion.name: ""} List?</Alert>
        <Button 
        variant="outlined"
        onClick={handleDeleteList}
        >Confirm</Button>
         <Button 
        variant="outlined"
        onClick={handleClose}
        >Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}