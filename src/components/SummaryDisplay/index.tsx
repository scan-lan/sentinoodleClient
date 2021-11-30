import React from "react";
import List from "@mui/material/List";
import {ListItem, Paper} from "@mui/material";
import Summary from "../../schemas/Summary";
import Stack from "@mui/material/Stack";

const SummaryDisplay = ({ summaryInfo }: { summaryInfo: Summary }) => {
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
        <Item text="Last room entered" value={summaryInfo.last_room_entered.room} />
        <Item text="Time entered" value={new Date(summaryInfo.last_room_entered.time).toLocaleString()} />
        <Item text="Time woke up" value={new Date(summaryInfo.time_woke_up).toLocaleString()} />
        <Item text="Messages received" value={'["' + summaryInfo.messages_received_today.join('", "') + '"]'} />
        <Item text="Last ate" value={new Date(summaryInfo.last_ate).toLocaleString()} />
      </List>
    </>
  )
}

export default SummaryDisplay;
