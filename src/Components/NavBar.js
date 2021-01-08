import { Link } from "react-router-dom";
import React, { useState } from "react";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { a11yProps } from "./Dashboard";

import { setAuth } from "../Actions/authUser";
const NavBar = ({ setAuth }) => {
  const [value, setValue] = useState(0);
  const handleLogout = (e) => {
    e.preventDefault();

    setAuth(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <AppBar position="static">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab component={Link} to="/" label="Home" {...a11yProps(0)}></Tab>

        <Tab
          style={{ textDecoration: "none" }}
          label="New POll"
          {...a11yProps(1)}
          component={Link}
          to="/add"
        ></Tab>

        <Tab
          to="/leaderboard"
          component={Link}
          label="LeaderBoard"
          {...a11yProps(2)}
        ></Tab>

        <Tab onClick={handleLogout} label="Logout" {...a11yProps(3)} />
      </Tabs>
    </AppBar>
  );
};
const mapStateToProps = ({ authUser }) => {
  return {
    authUser,
  };
};
export default connect(mapStateToProps, { setAuth })(NavBar);
