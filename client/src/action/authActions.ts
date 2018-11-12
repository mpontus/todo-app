import { createStandardAction } from "typesafe-actions";
import { AuthState } from "../model/AuthState";
import { LoginDto } from "../model/LoginDto";
import { SignupDto } from "../model/SignupDto";

export const authStatusChange = createStandardAction("AUTH_STATUS_CHANGE")<
  AuthState
>();

export const login = createStandardAction("LOGIN")<LoginDto>();

export const signup = createStandardAction("SIGNUP")<SignupDto>();

export const logout = createStandardAction("LOGOUT")<void>();
