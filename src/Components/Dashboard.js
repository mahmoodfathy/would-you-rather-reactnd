import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Container } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import UserCard from "./UserCard";
import NavBar from "./NavBar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box>{children}</Box>
        </Container>
      )}
    </div>
  );
}
export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "aliceblue",
  },
}));
const QuestionsTab = ({ userQuestions, user }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const text = "Answer Poll";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Unanswered" />

          <Tab label="Answered" />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        {userQuestions.unAnsweredQuestions.map((question) => {
          return (
            <UserCard
              key={question.id}
              question={question}
              user={user}
              action={null}
              actionText={text}
            />
          );
        })}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {userQuestions.answeredQuestions.map((question) => {
          return (
            <UserCard
              key={question.id}
              question={question}
              user={user}
              actionText={"View Poll Results"}
              action={null}
            />
          );
        })}
      </TabPanel>
    </>
  );
};
const Dashboard = ({ authUser, userQuestions, getUser }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return (
    <div className={classes.root}>
      <NavBar />

      <TabPanel value={value} index={0}>
        <QuestionsTab userQuestions={userQuestions} user={getUser} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        New Poll
      </TabPanel>
      <TabPanel value={value} index={2}>
        LeaderBoard
      </TabPanel>
    </div>
  );
};
const mapStateToProps = ({ authUser, getUser, getUsersQuestions }) => {
  const answerdIds = Object.keys(getUser[authUser].answers);
  const answeredQuestions = Object.values(getUsersQuestions)
    .filter((question) => answerdIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unAnsweredQuestions = Object.values(getUsersQuestions)
    .filter((question) => !answerdIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    userQuestions: {
      answeredQuestions,
      unAnsweredQuestions,
    },
    getUser,
  };
};

export default connect(mapStateToProps)(Dashboard);
