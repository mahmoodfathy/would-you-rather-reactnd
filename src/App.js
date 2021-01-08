import React, { useEffect } from "react";
import Login from "./Components/Login.js";
import { connect } from "react-redux";
import { handleInitialData } from "./Actions/shared";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import QuestionPoll from "./Components/Question";
import LeaderBoard from "./Components/LeaderBoard";
import NewPoll from "./Components/NewPoll";
import NotFound from "./Components/NotFound";

function App({ handleInitialData, authUser }) {
  useEffect(() => {
    handleInitialData();
  }, [handleInitialData]);
  return (
    <>
      <Router>
        {authUser === null ? (
          <div className="App">
            <Login />
          </div>
        ) : (
          <div>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/questions/not_found" component={NotFound} />
              <Route exact path="/add" component={NewPoll} />
              <Route exact path="/questions/:id" component={QuestionPoll} />
              <Route exact path="/leaderboard" component={LeaderBoard} />

              <Route exact component={NotFound} />
            </Switch>
          </div>
        )}
      </Router>
    </>
  );
}
const mapStateToProps = ({ authUser }) => {
  return {
    authUser,
  };
};

export default connect(mapStateToProps, { handleInitialData })(App);
