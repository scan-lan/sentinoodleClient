import React, {FormEvent, useState} from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import { AxiosInstance } from "axios";


const AddMessage = ({ api }: { api: AxiosInstance }) => {
  const [deviceId, setDeviceId] = useState<string>("");
  const [messageText, setMessageText] = useState<string>("");

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const requestBody = {
      device_id: deviceId,
      message_text: messageText
    }
    const response = await api.post("/message", requestBody);
    console.dir(response);
  }

  return (
    <>
      <Typography variant="h4" align="right">
        Add message
      </Typography>
      <Typography paragraph variant="body1">
        Explanatory text
      </Typography>
      <form onSubmit={onSubmitHandler}>
        <Stack spacing={2} sx={{pt: "2em"}}>
          <TextField
            required
            id="device-id"
            label="Device ID"
            value={deviceId}
            onChange={event => {setDeviceId(event.target.value)}} />
          <TextField
            required
            id="message-text"
            label="New message"
            value={messageText}
            onChange={event => {setMessageText(event.target.value)}} />
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default AddMessage;
