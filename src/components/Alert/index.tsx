import React from "react";
import MUIAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";


interface MessageProps {
  text: string,
  type: "error" | "success",
  open: boolean,
  setOpen: (newState: boolean) => void
}

const Alert = ({text, type, open, setOpen}: MessageProps) => {

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{vertical: "bottom", horizontal: "right"}}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <MUIAlert
        variant="filled"
        onClose={handleClose}
        severity={type}
        sx={{ width: '100%' }}
      >
        {text}
      </MUIAlert>
    </Snackbar>
  )
}

export default Alert;
