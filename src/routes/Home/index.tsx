import React from 'react';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";

const Home = () => (
  <div>
    <Button variant="contained">No sleep needed</Button>
    <Link to={"Test"}>{"Test < 3"}</Link>
  </div>
);

export default Home;
