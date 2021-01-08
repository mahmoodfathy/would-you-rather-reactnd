import React from "react";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import LinearProgress from "./ProgressBar";
import { Chip, Button } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";

const PollStats = ({ question, user }) => {
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;
  const userVote = user.answers[question.id];
  const percntageOne = ((optionOneVotes / totalVotes) * 100).toFixed(2);

  const percntageTwo = ((optionTwoVotes / totalVotes) * 100).toFixed(2);

  const history = useHistory();
  const handleRedirect = () => {
    history.push("/");
  };
  return (
    <>
      <div style={{ marginLeft: "70px", marginTop: "-60px" }}>
        <Typography style={{ marginLeft: "20px" }} variant="h6">
          Results
        </Typography>
        <Typography variant="h6">{question.optionOne.text}</Typography>
        <LinearProgress value={parseInt(percntageOne)} />
        {userVote === "optionOne" && (
          <Chip
            icon={<DoneIcon />}
            color="primary"
            style={{ backgroundColor: "green" }}
            label="your Vote"
          />
        )}
        <Typography>
          {optionOneVotes} out of {totalVotes} votes
        </Typography>
        <Typography variant="h6">{question.optionTwo.text}</Typography>
        <LinearProgress value={parseInt(percntageTwo)} />
        {userVote === "optionTwo" && (
          <Chip
            icon={<DoneIcon />}
            color="primary"
            style={{ backgroundColor: "green" }}
            label="your Vote"
          />
        )}
        <Button variant="outlined" color="primary" onClick={handleRedirect}>
          Back
        </Button>
        <Typography>
          {optionTwoVotes} out of {totalVotes} votes
        </Typography>
      </div>
    </>
  );
};
const mapStateToProps = ({ authUser, getUser }) => {
  const user = getUser[authUser];
  return {
    user,
  };
};

export default connect(mapStateToProps)(PollStats);
