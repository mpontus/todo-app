import { isOfType, getType, StateType } from "typesafe-actions";
import { createRequestStateReducer } from "./utils/createRequestStateReducer";
import { signup } from "../action/authActions";

/**
 * Maintains the state of the login request
 */
export const signupRequestReducer = createRequestStateReducer(
  isOfType(getType(signup.request)),
  isOfType(getType(signup.success)),
  isOfType(getType(signup.failure)),
  action => action.payload
);
