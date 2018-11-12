import { Reducer } from "redux";
import { Action } from "../action";
import { User } from "../model/User";
import { getType } from "typesafe-actions";
import * as actions from "../action/authActions";

interface State {
  token?: string;
  user?: User;
}

const initalState: State = {};

export const authReducer: Reducer<State, Action> = (
  state = initalState,
  action
) => {
  switch (action.type) {
    case getType(actions.authStatusChange):
      return {
        token: action.payload.token,
        user: action.payload.user
      };

    case getType(actions.logout):
      return initalState;

    default:
      return state;
  }
};
