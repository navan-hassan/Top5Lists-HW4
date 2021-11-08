import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AuthContext from '../auth'
import Alert from '@mui/material/Alert';
import { useContext } from 'react';

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

export default function ErrorModal() {
  const { auth } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    auth.handleError(null);
  };

  return (
    <div>
      <Modal
        open={auth.error}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Error
          </Typography>
          <Alert severity="error" variant = "outlined">{auth.errorMessage}</Alert>
          <Button 
        variant="outlined"
        onClick={handleClose}
        >Close</Button>
        </Box>
      </Modal>
    </div>
  );
}
  /*
  return (
    <div
        className="modal"
        id="error-modal"
        data-animation="slideInOutLeft">
        <div className="modal-dialog">
        <Alert icon = {false} severity="info">INVALID INPUT!</Alert>
        <Button 
        variant="outlined"
        onClick={handleClose}
        >Close</Button>    
        </div>
    </div>

);
*/