import { combineReducers } from "redux";
import authUser from "./authUser";
import getUser from "./user";
import { getUsersQuestions } from "./questions";

export default combineReducers({
  authUser,
  getUsersQuestions,
  getUser,
});
