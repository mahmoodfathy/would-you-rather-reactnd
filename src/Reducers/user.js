import {
  GET_USERS_DATA,
  ADD_QUESTION_TO_USER,
  ADD_ANSWER_TO_USER,
} from "../Actions/user";

export default function getUser(state = {}, action) {
  switch (action.type) {
    case GET_USERS_DATA:
      return {
        ...state,
        ...action.users,
      };
    case ADD_QUESTION_TO_USER:
      return {
        ...state,
        [action.author]: {
          ...state[action.author],
          questions: state[action.author].questions.concat(action.id),
        },
      };
    case ADD_ANSWER_TO_USER:
      return {
        ...state,
        [action.authUser]: {
          ...state[action.authUser],
          answers: {
            ...state[action.authUser].answers,
            [action.qid]: action.answer,
          },
        },
      };

    default:
      return state;
  }
}
