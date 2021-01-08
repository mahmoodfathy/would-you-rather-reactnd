import { getInitialData } from "../Utils/_DATA";
import { getUserData } from "../Actions/user";
import { getUsersQuestions } from "../Actions/questions";
export const handleInitialData = () => {
  return async (dispatch) => {
    const data = await getInitialData();
    const { users, questions } = data;

    dispatch(getUserData(users));
    dispatch(getUsersQuestions(questions));
  };
};
