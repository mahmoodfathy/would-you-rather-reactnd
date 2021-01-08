import React from "react";
import { connect } from "react-redux";
import { saveAnswerToQuestion } from "../Actions/questions";
import UserCard from "./UserCard";

import NavBar from "./NavBar";
import { Redirect } from "react-router-dom";

const QuestionPoll = ({ authUser, question, author }) => {
  const text = "Submit";
  let invalidPath = false;
  if (question === undefined) {
    invalidPath = true;
  }
  if (invalidPath) {
    return <Redirect to="/questions/not_found" />;
  }
  return (
    <>
      <NavBar />
      <UserCard
        question={question}
        actionText={text}
        user={author}
        pollview={true}
      />
    </>
  );
};
const mapStateToProps = (
  { authUser, getUsersQuestions, getUser },
  { match }
) => {
  const { id } = match.params;
  const question = getUsersQuestions[id];

  return {
    authUser,
    question,
    author: getUser,
  };
};
export default connect(mapStateToProps, { saveAnswerToQuestion })(QuestionPoll);
