import React from 'react';
import {Button, Link as MUILink} from '@mui/material';
import {Link} from "react-router-dom";

const Home = () => (
  <div>
    <Button variant="contained">No sleep needed</Button>
    <br/>
    <MUILink component={Link} to="test">
      {"Test <3"}
    </MUILink>
  </div>
);

export default Home;
