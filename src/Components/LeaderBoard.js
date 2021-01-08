import React from "react";
import NavBar from "./NavBar";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardMedia,
  Avatar,
  Typography,
  CardContent,
  Chip,
} from "@material-ui/core";
import { Filter1, Filter2, Filter3, Done } from "@material-ui/icons";

const LeaderBoard = ({ Data }) => {
  const Icons = [
    <Filter1 style={{ color: "green", fontSize: 70 }} />,
    <Filter2 style={{ color: "blue", fontSize: 70 }} />,
    <Filter3 style={{ color: "orange", fontSize: 70 }} />,
  ];
  const colors = ["green", "blue", "orange"];

  return (
    <>
      <NavBar />
      {Data.map((user, index) => {
        return (
          <Card
            raised
            style={{
              width: "300px",
              height: "350px",
              margin: "auto",
              marginTop: "50px",
            }}
            key={user.id}
          >
            <CardHeader title={user.name} style={{ textAlign: "center" }} />

            <CardMedia>
              <div style={{ marginLeft: "110px" }}>{Icons[index]}</div>
              <Avatar
                style={{ width: "70px", height: "70px" }}
                src={`/${user.avatarURL}`}
              />
            </CardMedia>
            <CardContent>
              <Typography>Answered Questions: {user.answerCount}</Typography>
              <br />
              <Typography>Created Questions: {user.questionCount}</Typography>

              <Chip
                icon={<Done />}
                color="primary"
                style={{
                  backgroundColor: colors[index],
                  marginLeft: "100px",
                  marginTop: "10px",
                }}
                label={`${user.total}`}
              />
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};
const mapStateToProps = ({ getUser }) => {
  const Data = Object.values(getUser)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answerCount: Object.values(user.answers).length,
      questionCount: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length,
    }))
    .sort((a, b) => a.total - b.total)
    .reverse()
    .slice(0, 3);

  return {
    Data,
  };
};
export default connect(mapStateToProps)(LeaderBoard);
