import { Selector } from "reselect";
import { State } from "../reducer";
import { User } from "../model/User";

/**
 * Return access token
 */
export const makeGetAuthToken = (): Selector<
  State,
  string | undefined
> => state => state.auth.token;

/**
 * Return whether user is authenticated
 */
export const makeIsUserAuthenticated = (): Selector<State, boolean> => state =>
  state.auth.token !== undefined;

/**
 * Return whether user is authenticated anonymously
 */
export const makeIsUserAnonymous = (): Selector<State, boolean> => state =>
  state.auth.token !== undefined && state.auth.user === undefined;

/**
 * Return currently logged in user
 */
export const makeGetCurrentUser = (): Selector<
  State,
  User | undefined
> => state => state.auth.user;
