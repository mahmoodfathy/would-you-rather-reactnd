//@todo make the users actions and reducers and handle inital data loading

import React, { useState } from "react";
import {
  Select,
  Button,
  Avatar,
  MenuItem,
  Card,
  CardHeader,
  InputLabel,
  CardActions,
  FormControl,
  CardMedia,
} from "@material-ui/core";
import { setAuth } from "../Actions/authUser";
import { connect } from "react-redux";
const Login = (props) => {
  const [selectedName, setSelectedName] = useState("");
  const [selectedNameId, setSelectedNameId] = useState("");
  const { users } = props;
  const disabled = selectedName === "" ? true : false;
  const handleChoices = (e) => {
    setSelectedName(e.target.value);

    // setSelected(true);
  };
  const handleClick = (user) => {
    // setSelected(true);
    props.setAuth(user);
  };

  return (
    <>
      <Card raised style={{ width: "500px", height: "550px", margin: "auto" }}>
        <CardHeader
          title="Welcome to the Would You Rather App!"
          subheader="Please sign in to continue"
          style={{ textAlign: "center" }}
        />
        <CardMedia>
          <img src="people.jpg" style={{ width: "500px" }} />
        </CardMedia>
        <CardActions>
          <FormControl>
            <InputLabel style={{ marginTop: "-13px" }}>
              Please Select Name....
            </InputLabel>
            <Select
              onChange={handleChoices}
              defaultValue=""
              style={{ width: "450px", margin: "auto" }}
              value={selectedName}
            >
              {/* onClick={handleClick} */}
              {users.map((user) => {
                return (
                  <MenuItem
                    onClick={() => {
                      setSelectedNameId(user.id);
                    }}
                    key={user.id}
                    value={user.name}
                  >
                    {user.name}
                    <Avatar src={user.avatarURL}></Avatar>
                  </MenuItem>
                );
              })}
            </Select>
            <Button
              style={{ marginTop: "10px" }}
              variant="outlined"
              color="primary"
              onClick={() => handleClick(selectedNameId)}
              disabled={disabled}
            >
              Login
            </Button>
          </FormControl>
        </CardActions>
      </Card>
    </>
  );
};
const mapStateToProps = ({ authUser, getUser }) => {
  return {
    users: Object.values(getUser),
    authUser,
  };
};
export default connect(mapStateToProps, { setAuth })(Login);
