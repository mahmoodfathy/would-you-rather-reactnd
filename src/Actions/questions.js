import { _saveQuestion } from "../Utils/_DATA";
import { addQuestionToUser } from "./user";
export const GET_USERS_QUESTIONS = "GET_USERS_QUESTIONS";
export const SAVE_ANSWER_QUESTION = "SAVE_ANSWER_QUESTION";
export const SAVE_QUESTION = "SAVE_QUESTION";

export const getUsersQuestions = (questions) => {
  return {
    type: GET_USERS_QUESTIONS,
    questions,
  };
};

export const saveAnswerToQuestion = (authedUser, qid, answer) => {
  return {
    type: SAVE_ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  };
};

const saveNewQuestion = (question) => {
  return {
    type: SAVE_QUESTION,
    question,
  };
};

export const handleSavingQuestion = (optionOneText, optionTwoText, author) => {
  return (dispatch) => {
    return _saveQuestion({ optionOneText, optionTwoText, author }).then(
      (question) => {
        dispatch(saveNewQuestion(question));
        dispatch(addQuestionToUser(question));
      }
    );
  };
};
