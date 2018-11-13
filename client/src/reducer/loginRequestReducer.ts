import { createRequestStateReducer } from "./utils/createRequestStateReducer";
import { login } from "../action/authActions";
import { isOfType, getType, StateType } from "typesafe-actions";

/**
 * Maintains the state of the login request
 */
export const loginRequestReducer = createRequestStateReducer(
  isOfType(getType(login.request)),
  isOfType(getType(login.success)),
  isOfType(getType(login.failure)),
  action => action.payload
);
