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
import AlertState from "../../schemas/AlertState";
import Alert from "../../components/Alert";
import Medication from "../../schemas/Medication";

interface SessionFormInfo {
  deviceId: string,
  medicationName: string,
  dosage: string,
  dosageFrequency: string,
  waitPeriod: string
}

const NewSession = ({ api }: {api: AxiosInstance}) => {
  const [formInfo, setFormInfo] = useState<SessionFormInfo>({
    deviceId: "",
    medicationName: "",
    dosage: "1",
    dosageFrequency: "1",
    waitPeriod: "5"
  });
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
        text: "New session created",
        type: "success",
        open: true
      })
  }

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const medicationRequestBody = {
      name: formInfo.medicationName,
      dosage: parseFloat(formInfo.dosage),
      dosage_frequency: parseInt(formInfo.dosageFrequency)
    }
    const medicationResponse = await api.post<Medication>("/medication", medicationRequestBody);
    const sessionRequestBody = {
      device_id: formInfo.deviceId,
      medication_id: medicationResponse?.data.id,
      message_wait_period_minutes: parseInt(formInfo.waitPeriod)
    }
    if (!sessionRequestBody.medication_id) {
      showError("Could not create medication info");
      console.log(e)
      return;
    }
    const response = await api.post("/session", sessionRequestBody);
    console.log(response?.data)
    if (response.status === 200) showSuccess();
    else showError("Could not create new session");
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
        Create session
      </Typography>
      <Typography paragraph>
        Create a session for your new system.
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
          <TextField
            required
            id="medication-name"
            label="Medication name"
            value={formInfo.medicationName}
            onChange={event => { setFormInfo({...formInfo, medicationName: event.target.value})}}
          />
          <Stack direction="row" spacing={2} alignItems="stretch">
            <TextField
              required
              fullWidth
              type="number"
              inputProps={{min: 1}}
              id="medication-dosage"
              label="Medication dosage"
              value={formInfo.dosage}
              onChange={event => { setFormInfo({...formInfo, dosage: event.target.value})}}
            />
            <TextField
              required
              fullWidth
              type="number"
              inputProps={{min: 1}}
              id="medication-dosage-frequency"
              label="Dosage frequency"
              value={formInfo.dosageFrequency}
              onChange={event => { setFormInfo({...formInfo, dosageFrequency: event.target.value})}}
            />
          </Stack>
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

export default NewSession;
