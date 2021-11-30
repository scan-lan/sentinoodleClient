import React, {FormEvent, useState} from 'react';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {AxiosInstance} from "axios";
import Session from "../../schemas/Session";
import Summary from "../../schemas/Summary";
import SummaryDisplay from "../../components/SummaryDisplay";

const Home = ({ api }: { api: AxiosInstance }) => {
  const [deviceId, setDeviceId] = useState<string>("");
  const [summaryInfo, setSummaryInfo] = useState<Summary>();
  const [summaryRetrieved, setSummaryRetrieved] = useState<boolean>(false)

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    const { data: session } = await api.get<Session>(`/sessionByDeviceID/${deviceId}`);
    const { data: summary } = await api.get<Summary>(`/daySummary/${session.id}`);
    setSummaryInfo(summary);
    setSummaryRetrieved(true);
  }

  return (
    <>
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
