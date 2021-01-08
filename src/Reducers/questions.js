import {
  GET_USERS_QUESTIONS,
  SAVE_QUESTION,
  SAVE_ANSWER_QUESTION,
} from "../Actions/questions";
export const getUsersQuestions = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SAVE_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    case SAVE_ANSWER_QUESTION:
      const { authedUser, qid, answer } = action;

      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat(authedUser),
          },
        },
      };

    default:
      return state;
  }
};
