export const SET_AUTH_USER = "SET_AUTH_USER";

export const setAuth = (id) => {
  //   console.log("i got called");
  return {
    type: SET_AUTH_USER,
    id,
  };
};
