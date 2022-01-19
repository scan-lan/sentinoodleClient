import React, {FormEvent, useState} from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AlertState from "../../schemas/AlertState";
import Alert from "../../components/Alert";
import Session from "../../schemas/Session";
import Message from "../../schemas/Message";
import SessionDisplay from "../../components/SessionDisplay";
import { AxiosInstance } from "axios";
import Medication from "../../schemas/Medication";

interface SessionInfo {
  session: Session,
  messages: string[],
  medication: Medication
}

const ViewSession = ({ api }: { api: AxiosInstance }) => {
  const [deviceId, setDeviceId] = useState<string>("");
  const [sessionInfo, setSessionInfo] = useState<SessionInfo>();
  const [sessionRetrieved, setSessionRetrieved] = useState<boolean>(false)
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
        text: "Session retrieved",
        type: "success",
        open: true
      })
  }

  const setOpen = (open: boolean) => {
    setAlertState({...alertState, open: open})
  }

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    // const { data: session } = await api.get<Session>(`/sessionByDeviceID/${deviceId}`);
    // if (!session) {
    //   showError("Could not find session for given device ID");
    //   setSessionRetrieved(false);
    //   return;
    // }
    //
    // const { data: messages } = await api.get<Message[]>(`/messages/${session.id}`);
    //
    // let messageTexts;
    // if (!messages) {
    //   showError("Could not find messages for given session ID");
    //   setSessionRetrieved(false);
    //   return;
    // } else {
    //   messageTexts = messages.map((message) => message.message_text);
    // }
    //
    // const { status, data: medication } = await api.get<Medication>(`/medicationById/${session.medication_id}`);
    //
    // if (status === 200) {
    setSessionInfo({
      session: {
        id: 3,
        device_id: "e00fce68c8c00485cd7a3208",
        medication_id: 2,
        datetime_started: "17:54:29 02/12/2021",
        message_index: 1,
        message_wait_period_minutes: 15
      },
      messages: [
        "You have so much to be proud of",
        "You are going to have a great day"],
      medication: {
        id: 2,
        name: "Enalapril",
        dosage: 2,
        dosage_frequency: 3,
        doses_taken_today: 0
      }
    });
    showSuccess();
    setSessionRetrieved(true);
    // }
  }

  return (
    <>
      <Alert {...alertState} setOpen={setOpen} />
      <Typography variant="h4" align="right" sx={{pb: "1em", pt: ".2em"}}>
        View session
      </Typography>
      <Typography paragraph>
        Enter your device ID to see your session info.
      </Typography>
      <form onSubmit={onSubmitHandler}>
        <Stack spacing={2} sx={{pt: "2em"}}>
          <TextField
            required
            id="device-id"
            label="Device ID"
            value={deviceId}
            onChange={event => {setDeviceId(event.target.value)}} />
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </Stack>
      </form>
      {(sessionRetrieved && sessionInfo) ? <SessionDisplay
        session={sessionInfo.session}
        messages={sessionInfo.messages}
        medication={sessionInfo.medication}
      /> : null}
    </>
  );
}

export default ViewSession;
