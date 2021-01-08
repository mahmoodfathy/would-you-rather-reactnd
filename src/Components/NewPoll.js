import React, { useState } from "react";
import NavBar from "./NavBar";
import {
  Card,
  Typography,
  TextField,
  Divider,
  Button,
  CardActions,
} from "@material-ui/core";
import { connect } from "react-redux";
import { handleSavingQuestion } from "../Actions/questions";
import { Redirect } from "react-router-dom";
const NewPoll = ({ authUser, handleSavingQuestion }) => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [submitComplete, setSubmitComplete] = useState(false);
  const disableButton = optionOne === "" || optionTwo === "";

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSavingQuestion(optionOne, optionTwo, authUser);
    setSubmitComplete(true);
  };
  if (submitComplete) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <NavBar />
      <Card
        raised
        style={{
          width: "300px",
          height: "300px",
          margin: "auto",
          marginTop: "15px",
        }}
      >
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Create New Poll
        </Typography>
        <Typography variant="h6" style={{ marginLeft: "10px" }}>
          Would you Rather
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            style={{ marginLeft: "25px", marginTop: "17px" }}
            label="Option One"
            onChange={(e) => {
              setOptionOne(e.target.value);
            }}
          />
          <Divider style={{ marginTop: "17px" }} variant="middle" />
          <TextField
            variant="outlined"
            style={{ marginLeft: "25px", marginTop: "17px" }}
            label="Option Two"
            onChange={(e) => {
              setOptionTwo(e.target.value);
            }}
          />
          <CardActions>
            <Button
              disabled={disableButton}
              style={{ marginLeft: "10px", marginTop: "15px", width: "250px" }}
              variant="outlined"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </CardActions>
        </form>
      </Card>
    </>
  );
};
const mapStateToProps = ({ authUser }) => {
  return {
    authUser,
  };
};

export default connect(mapStateToProps, { handleSavingQuestion })(NewPoll);
