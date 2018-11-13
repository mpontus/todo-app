import { Epic, combineEpics } from "redux-observable";
import {
  map,
  filter,
  tap,
  switchMap,
  ignoreElements,
  catchError
} from "rxjs/operators";
import { Action } from "../action";
import { State } from "../reducer";
import { Dependencies } from "../configureStore";
import { makeGetAuthToken } from "../selector/authSelectors";
import { loginAnonymously } from "../api/method/loginAnonymously";
import * as actions from "../action/authActions";
import { isOfType, getType } from "typesafe-actions";
import { login } from "../api/method/login";
import { signup } from "../api/method/signup";
import { of, from } from "rxjs";
import { RequestError } from "../model/RequestError";
import { handleApiError } from "./utils/handleApiError";

export const setTokenEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) =>
  state$.pipe(
    map(makeGetAuthToken()),
    filter(Boolean),
    tap(api.setAuthToken.bind(api)),
    ignoreElements()
  );

export const anonymousLoginEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) =>
  state$.pipe(
    map(makeGetAuthToken()),
    filter(it => it === undefined),
    switchMap(() => loginAnonymously(api)),
    map(actions.anonymousLoginSuccess)
  );

export const loginEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) =>
  action$.pipe(
    filter(isOfType(getType(actions.login.request))),
    switchMap(action =>
      from(login(api, action.payload)).pipe(
        map(actions.login.success),
        handleApiError(actions.login.failure)
      )
    )
  );

export const signupEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) =>
  action$.pipe(
    filter(isOfType(getType(actions.signup.request))),
    switchMap(action =>
      from(signup(api, action.payload)).pipe(
        map(actions.signup.success),
        handleApiError(actions.signup.failure)
      )
    )
  );

export const authEpic = combineEpics(
  setTokenEpic,
  anonymousLoginEpic,
  loginEpic,
  signupEpic
);
