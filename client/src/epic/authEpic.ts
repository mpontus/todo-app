import { Epic, combineEpics } from "redux-observable";
import { map, filter, tap, switchMap, ignoreElements } from "rxjs/operators";
import { Action } from "../action";
import { State } from "../reducer";
import { Dependencies } from "../configureStore";
import { makeGetAuthToken } from "../selector/authSelectors";
import { loginAnonymously } from "../api/method/loginAnonymously";
import * as actions from "../action/authActions";
import { isOfType, getType } from "typesafe-actions";
import { login } from "../api/method/login";
import { signup } from "../api/method/signup";

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
    map(actions.authStatusChange)
  );

export const loginEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) =>
  action$.pipe(
    filter(isOfType(getType(actions.login))),
    switchMap(action => login(api, action.payload)),
    map(actions.authStatusChange)
  );

export const signupEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) =>
  action$.pipe(
    filter(isOfType(getType(actions.signup))),
    switchMap(action => signup(api, action.payload)),
    map(actions.authStatusChange)
  );

export const authEpic = combineEpics(
  setTokenEpic,
  anonymousLoginEpic,
  loginEpic,
  signupEpic
);
