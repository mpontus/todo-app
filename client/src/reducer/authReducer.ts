import { Reducer } from "redux";
import { Action } from "../action";
import { User } from "../model/User";
import { getType } from "typesafe-actions";
import * as actions from "../action/authActions";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface State {
  token?: string;
  user?: User;
}

const initalState: State = {};

export const authReducer = persistReducer(
  { key: "auth", storage },
  (state: State = initalState, action: Action) => {
    switch (action.type) {
      case getType(actions.anonymousLoginSuccess):
      case getType(actions.login.success):
      case getType(actions.signup.success):
        return {
          token: action.payload.token,
          user: action.payload.user
        };

      case getType(actions.logout):
        return initalState;

      default:
        return state;
    }
  }
);
