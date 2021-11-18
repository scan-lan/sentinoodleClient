import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom';
import Divider from "@mui/material/Divider";

interface DrawerContentProps {
  routes: {
    route: string,
    text: string
  }[],
  clickHandler: () => void
}

const DrawerContent = ({ routes, clickHandler }: DrawerContentProps) => (
  <List>
    {routes.map(({route, text}) => (
      <div key={text}>
        <ListItem>
          <ListItemButton onClick={clickHandler} component={Link} to={route}>
            {text}
          </ListItemButton>
        </ListItem>
        <Divider />
      </div>
    ))}
  </List>
)

export default DrawerContent
