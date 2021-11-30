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
    const { status: sessionStatus, data: session } = await api.get<Session>(`/sessionByDeviceID/${deviceId}`);
    if (sessionStatus !== 200) {
      showError("No session could be found");
      return;
    }

    const { status: summaryStatus, data: summary } = await api.get<Summary>(`/daySummary/${session.id}`);
    if (summaryStatus === 200) showSuccess();
    else {
      showError("Summary could not be retrieved with this device ID");
      return;
    }
    setSummaryInfo(summary);
    setSummaryRetrieved(true);
  }

  return (
    <>
      <Alert {...alertState} setOpen={setOpen} />
      <Typography variant="h4" align="right">
        Home
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
      {(summaryRetrieved && summaryInfo) ? <SummaryDisplay summaryInfo={summaryInfo} /> : null}
    </>
  );
}

export default Home;
