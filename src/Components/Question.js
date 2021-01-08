import React from "react";
import { connect } from "react-redux";
import { saveAnswerToQuestion } from "../Actions/questions";
import UserCard from "./UserCard";

import NavBar from "./NavBar";

const QuestionPoll = ({ authUser, question, author }) => {
  const text = "Submit";
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
