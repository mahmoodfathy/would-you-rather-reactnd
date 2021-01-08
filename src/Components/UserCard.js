import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Button,
  Avatar,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { handleSaveQuestionAnswer } from "../Actions/user";
import PollStats from "./PollStats";

const UserCard = ({
  authUser,
  question,
  user,
  actionText,
  action,
  pollview,
  handleSaveQuestionAnswer,
}) => {
  const [viewPoll, setViewPoll] = useState(false);
  const [value, setValue] = React.useState("");
  const [pollStatsView, setPollStatsView] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const disabled = value === "" ? true : false;
  const handleView = () => {
    setPollStatsView(true);
    setHideButton(true);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = (e) => {
    setViewPoll(true);
  };

  if (viewPoll === true) {
    return <Redirect push to={`/questions/${question.id}`} />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveQuestionAnswer(authUser, question.id, value);
    setPollStatsView(true);
  };
  return (
    <>
      <Card
        raised
        style={{
          width: "300px",
          height: "350px",
          margin: "auto",
          marginTop: "50px",
        }}
      >
        <CardHeader
          title="Would you Rather"
          subheader={question.optionOne.text + " or......."}
          style={{ textAlign: "center" }}
        />
        <CardMedia>
          <Avatar
            style={{ width: "70px", height: "70px" }}
            src={`/${user[question.author].avatarURL}`}
          />
          {pollStatsView && <PollStats question={question} />}
          {pollview && !pollStatsView && (
            <FormControl component="fieldset">
              <FormLabel style={{ margin: "auto" }} component="legend">
                Poll Question
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}
                style={{ margin: "auto" }}
              >
                <FormControlLabel
                  value="optionOne"
                  control={<Radio />}
                  label={question.optionOne.text}
                  style={{ marginLeft: "15px" }}
                  // onChange={handleChange}
                />
                <FormControlLabel
                  value="optionTwo"
                  control={<Radio />}
                  label={question.optionTwo.text}
                  style={{ marginLeft: "15px" }}
                  // onChange={handleChange}
                />
              </RadioGroup>
            </FormControl>
          )}
        </CardMedia>
        <CardActions>
          {!pollStatsView && actionText !== "View Poll Results" && (
            <Button
              onClick={pollview ? handleSubmit : handleClick}
              style={{ margin: "auto", width: "250px", marginTop: "5px" }}
              variant="outlined"
              color="primary"
              disabled={disabled && pollview}
            >
              {actionText}
            </Button>
          )}
          {actionText === "View Poll Results" && !hideButton && (
            <Button
              onClick={handleView}
              style={{ margin: "auto", width: "250px", marginTop: "5px" }}
              variant="outlined"
              color="primary"
            >
              {actionText}
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};
const mapStateToProps = ({ authUser, getUser }) => {
  return {
    authUser,
    getUser,
  };
};

export default connect(mapStateToProps, { handleSaveQuestionAnswer })(UserCard);
