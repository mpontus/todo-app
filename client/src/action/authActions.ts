import { createStandardAction, createAsyncAction } from "typesafe-actions";
import { AuthState } from "../model/AuthState";
import { LoginDto } from "../model/LoginDto";
import { SignupDto } from "../model/SignupDto";
import { RequestError } from "../model/RequestError";

export const anonymousLoginSuccess = createStandardAction("ANONYMOUS_LOGIN")<
  AuthState
>();

export const login = createAsyncAction(
  "LOGIN_REQUEST",
  "LOGIN_SUCCESS",
  "LOGIN_FAILURE"
)<LoginDto, AuthState, RequestError<LoginDto>>();

export const signup = createAsyncAction(
  "SIGNUP_REQUEST",
  "SIGNUP_SUCCESS",
  "SIGNUP_FAILURE"
)<SignupDto, AuthState, RequestError<SignupDto>>();

export const logout = createStandardAction("LOGOUT")<void>();
