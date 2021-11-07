import * as React from 'react';
import Alert from '@mui/material/Alert';



export default function ErrorModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (event) => {
      event.target.classList.remove('is-visible');
  };


  return (
    <div
        className="modal"
        id="error-modal"
        data-animation="slideInOutLeft">
        <div className="modal-dialog">
        <Alert severity="error">INVALID INPUT!</Alert>
                <button
                    id="dialog-no-button"
                    className="modal-button"
                    onClick={handleClose}
                >Close</button>
            </div>
        </div>

);

  /*return (
    <div>
      <Modal
        className="modal"
        id="error-modal"
        data-animation="slideInOutLeft"
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
        <Alert severity="error">INVALID INPUT!</Alert>
        <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
  */
}