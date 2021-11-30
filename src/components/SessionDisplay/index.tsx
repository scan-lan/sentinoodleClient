import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Session from "../../schemas/Session";
import Stack from "@mui/material/Stack";

const SummaryDisplay = ({ session: {
  id,
  device_id,
  medication_id,
  datetime_started,
  message_index,
  message_wait_period_minutes
}, messages }: { session: Session, messages: string[] }) => {
  const Item = ({ text, value }: {text: string, value: string}) => {
    return (
      <ListItem divider>
        <Stack direction="row" alignItems="stretch" spacing={3}>
          <strong>{text}:</strong>
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
        <Item text="Medication ID" value={medication_id.toString()} />
        <Item text="Session started" value={new Date(datetime_started).toLocaleString()} />
        <Item text="Affirmation message index" value={(message_index || message_index === 0) ? message_index.toString() : "None"} />
        <Item text="Wait period" value={`${message_wait_period_minutes} minutes`} />
        <Item text="Affirmation messages" value={`["${messages.join('", "')}"]`} />
      </List>
    </>
  )
}

export default SummaryDisplay;
