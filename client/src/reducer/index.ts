import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
  auth: authReducer
});

export type State = StateType<typeof rootReducer>;
