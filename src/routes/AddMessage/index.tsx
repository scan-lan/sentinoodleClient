import React, { FormEvent, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import { AxiosInstance } from "axios";
import Session from "../../schemas/Session";
import Message from "../../schemas/Message";
import Alert from "../../components/Alert";


interface AlertState {
  text: string,
  type: "error" | "success"
  open: boolean
}

const AddMessage = ({ api }: { api: AxiosInstance }) => {
  const [deviceId, setDeviceId] = useState<string>("");
  const [messageText, setMessageText] = useState<string>("");
  const [alertState, setAlertState] = useState<AlertState>({text: "", type: "error", open: false});
  const showError = (text: string) => {
    setAlertState({
        text: text,
        type: "error",
        open: true
      })
  }
  const showSuccess = () => {
    setAlertState({
        text: "Message added successfully",
        type: "success",
        open: true
      })
  }

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const { data: session } = await api.get<Session>(`/sessionByDeviceID/${deviceId}`);
    const requestBody = {
        session_id: -1,
        message_text: messageText
      }
    try { requestBody.session_id = session.id; }
    catch (e) {
      showError("Could not find session for given device ID");
      console.log(e)
      return;
    }
    const response = await api.post<Message>("/message", requestBody);
    if (response.status === 200) showSuccess();
    else showError("Could not upload message");
  }

  const setOpen = (open: boolean) => {
    setAlertState({...alertState, open: open})
  }

  return (
    <>
      <Alert {...alertState} setOpen={setOpen} />
      <Typography variant="h4" align="right">
        Add message
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
