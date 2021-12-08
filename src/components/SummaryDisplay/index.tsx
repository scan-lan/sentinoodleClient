import React from "react";
import List from "@mui/material/List";
import {ListItem, Paper} from "@mui/material";
import Summary from "../../schemas/Summary";
import Stack from "@mui/material/Stack";

const SummaryDisplay = ({ summaryInfo: {
  last_room_entered,
  time_woke_up,
  messages_received_today,
  last_ate
} }: { summaryInfo: Summary }) => {
  const Item = ({ text, value }: {text: string, value: string}) => {
    return (
      <ListItem divider={text !== "Last room entered"}>
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
        <Item
          text="Last room entered"
          value={
            (last_room_entered === null) ?
            "No events for this session" :
            last_room_entered.room}
        />
        <Item text="Time entered" value={
          (last_room_entered === null) ?
          "No time for session with no events" :
          new Date(last_room_entered.time).toLocaleString()}
        />
        <Item
          text="Time woke up"
          value={(time_woke_up) ?
            new Date(time_woke_up).toLocaleString() :
            "No motion detected in the bedroom, today"}
        />
        <Item text="Messages received today" value={'["' + messages_received_today.join('", "') + '"]'} />
        <Item
          text="Last ate"
          value={(last_ate === null) ?
            "No last ate events found" :
            new Date(last_ate).toLocaleString()}
        />
      </List>
    </>
  )
}

export default SummaryDisplay;
