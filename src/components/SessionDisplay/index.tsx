import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Session from "../../schemas/Session";
import Stack from "@mui/material/Stack";
import Medication from "../../schemas/Medication";
import Typography from "@mui/material/Typography";

const SummaryDisplay = ({ session: {
  id,
  device_id,
  datetime_started,
  message_index,
  message_wait_period_minutes
}, messages, medication }: { session: Session, messages: string[], medication: Medication }) => {
  const Item = ({ text, value, divider=true }: {text: string, value: string, divider?: boolean}) => {
    return (
      <ListItem divider={divider}>
        <Stack direction="row" alignItems="stretch" spacing={3}>
          <div>{text}:</div>
          <Paper elevation={8}>
            {value}
          </Paper>
        </Stack>
      </ListItem>)
  }

  return (
    <>
      <List>
        <Item text="ID" value={id.toString()} />
        <Item text="Device ID" value={device_id} />
        <ListItem>
          <Typography fontWeight={900}>
            Medication:
          </Typography>
        </ListItem>
        <Item text="Name" value={medication.name} divider={false} />
        <Item text="Dosage" value={medication.dosage.toString()} divider={false} />
        <Item text={"Dosage frequency (doses per day)"} value={medication.dosage_frequency.toString()} />
        <Item text="Session started" value={new Date(datetime_started).toLocaleString()} />
        <Item text="Affirmation message index" value={(message_index || message_index === 0) ? message_index.toString() : "None"} />
        <Item text="Wait period" value={`${message_wait_period_minutes} minutes`} />
        <Item text="Affirmation messages" value={`["${messages.join('", "')}"]`} />
      </List>
    </>
  )
}

export default SummaryDisplay;
