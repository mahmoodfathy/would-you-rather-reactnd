import { saveAnswerToQuestion } from "./questions";
import { _saveQuestionAnswer } from "../Utils/_DATA";
export const GET_USERS_DATA = "GET_USERS_DATA";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";
export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER";

export const getUserData = (users) => {
  return {
    type: GET_USERS_DATA,
    users,
  };
};
export const addQuestionToUser = ({ author, id }) => {
  return {
    type: ADD_QUESTION_TO_USER,
    author,
    id,
  };
};
const addAnswerToUser = (authUser, qid, answer) => {
  return {
    type: ADD_ANSWER_TO_USER,
    authUser,
    qid,
    answer,
  };
};

export const handleSaveQuestionAnswer = (authUser, qid, answer) => {
  const authedUser = authUser;
  return (dispatch) => {
    dispatch(addAnswerToUser(authUser, qid, answer));
    dispatch(saveAnswerToQuestion(authUser, qid, answer));
    return _saveQuestionAnswer({ authedUser, qid, answer }).catch((error) => {
      console.log(error);
    });
  };
};
