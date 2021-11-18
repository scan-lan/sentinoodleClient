import React from 'react';
import {Button, Link as MUILink} from '@mui/material';
import {Link} from "react-router-dom";

const Home = () => (
  <div>
    <Button variant="contained">No sleep needed</Button>
    <br/>
    <Link to="test"><MUILink>{"Test <3"}</MUILink></Link>
  </div>
);

export default Home;
