import React, {FormEvent, useState} from "react";
import {AxiosInstance} from "axios";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Session from "../../schemas/Session";
import AlertState from "../../schemas/AlertState";
import Alert from "../../components/Alert";

interface FormInfo {
  deviceId: string,
  waitPeriod: string
}

const UpdateWaitPeriod = ({ api }: {api: AxiosInstance}) => {
  const [formInfo, setFormInfo] = useState<FormInfo>({deviceId: "", waitPeriod: "5"});
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
        text: "Wait time updated successfully",
        type: "success",
        open: true
      })
  }

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const { data: session } = await api.get<Session>(`/sessionByDeviceID/${formInfo.deviceId}`);
    const requestBody = {
      session_id: -1,
      message_wait_period_minutes: parseInt(formInfo.waitPeriod)
    }
    try { requestBody.session_id = session.id; }
    catch (e) {
      showError("Could not find session for given device ID");
      console.log(e)
      return;
    }
    const response = await api.post("/messageWaitTime", requestBody);
    if (response.status === 200) showSuccess();
    else showError("Could not update wait period");
  }

  const setOpen = (open: boolean) => {
    setAlertState({...alertState, open: open})
  }

  const handleChange = (event: SelectChangeEvent) => {
    setFormInfo({...formInfo, waitPeriod: event.target.value})
  }

  return (
    <>
      <Alert {...alertState} setOpen={setOpen} />
      <Typography variant="h4" align="right" sx={{pb: "1em", pt: ".2em"}}>
        Update wait period
      </Typography>
      <Typography paragraph>
        Choose the wait period between the system giving you messages.
      </Typography>
      <form onSubmit={onSubmitHandler}>
        <Stack spacing={2} sx={{pt: "2em"}}>
          <TextField
            required
            id="device-id"
            label="Device ID"
            value={formInfo.deviceId}
            onChange={event => {
              setFormInfo({...formInfo, deviceId: event.target.value})
            }} />
          <FormControl>
            <InputLabel id="wait-period-label">Wait period</InputLabel>
            <Select
              labelId="wait-period-label"
              id="wait-period"
              value={formInfo.waitPeriod}
              label="Wait period"
              onChange={handleChange}
              required
            >
              <MenuItem value={"0"}>No wait time (will get annoying)</MenuItem>
              <MenuItem value={"5"}>Five minutes</MenuItem>
              <MenuItem value={"10"}>Ten minutes</MenuItem>
              <MenuItem value={"15"}>Fifteen minutes</MenuItem>
              <MenuItem value={"30"}>Thirty minutes</MenuItem>
              <MenuItem value={"60"}>An hour</MenuItem>
              <MenuItem value={"120"}>Two hours</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </Stack>
      </form>
    </>
  )
}

export default UpdateWaitPeriod;
