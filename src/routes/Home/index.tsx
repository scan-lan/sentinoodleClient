import React, { FormEvent, useState } from 'react';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AxiosInstance } from "axios";
import Alert from "../../components/Alert";
import AlertState from "../../schemas/AlertState";
import Session from "../../schemas/Session";
import Summary from "../../schemas/Summary";
import SummaryDisplay from "../../components/SummaryDisplay";
import {Link} from "react-router-dom";

const Home = ({ api }: { api: AxiosInstance }) => {
  const [deviceId, setDeviceId] = useState<string>("");
  const [summaryInfo, setSummaryInfo] = useState<Summary>();
  const [summaryRetrieved, setSummaryRetrieved] = useState<boolean>(false)
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
        text: "Day summary retrieved",
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
    //   setSummaryRetrieved(false);
    //   return;
    // }
    //
    // const { status: summaryStatus, data: summary } = await api.get<Summary>(`/daySummary/${session.id}`);
    // if (summaryStatus === 200) showSuccess();
    // else {
    //   showError("Summary could not be retrieved with this device ID");
    //   return;
    // }
    setSummaryInfo({
      last_room_entered: {
        room: "bedroom",
        time: "15:47:32 06/12/2021"
      },
      time_woke_up: "07:35:42 06/12/2021",
      messages_received_today: [
        "You have so much to be proud of",
        "You are going to have a great day",
        "You have so much to be proud of"],
      last_ate: "13:02:25 06/12/2021"})
    setSummaryRetrieved(true);
  }

  return (
    <>
      <Alert {...alertState} setOpen={setOpen} />
      <Typography variant="h4" align="right" sx={{pb: "1em", pt: ".2em"}}>
        Home
      </Typography>
      <Stack direction="row" spacing={1} sx={{pb: "2em"}}>
        <Button fullWidth variant="contained" component={Link} to="/newSession">
          Create session
        </Button>
        <Button fullWidth variant="contained" component={Link} to="/session">
          View session
        </Button>
      </Stack>
      <Typography paragraph>
        Enter your device ID to see a summary of events from your day:
      </Typography>
      <form onSubmit={onSubmitHandler}>
        <Stack spacing={2} sx={{pt: ".5em"}}>
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
      {(summaryRetrieved && summaryInfo) ? <SummaryDisplay summaryInfo={summaryInfo} /> : null}
    </>
  );
}

export default Home;
