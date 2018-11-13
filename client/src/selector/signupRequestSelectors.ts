import { Selector } from "react-redux";
import { State } from "../reducer";
import { SignupDto } from "../model/SignupDto";
import { RequestError } from "../model/RequestError";
/**
 * Return whether signup request is in progress
 */
export const makeIsSignupRequestInProgress = (): Selector<
  State,
  boolean,
  {}
> => state => state.signupRequest.loading;

/**
 * Return whether signup request has finished successfully
 */
export const makeIsSignupRequestSuccess = (): Selector<
  State,
  boolean,
  {}
> => state => state.signupRequest.success;

/**
 * Return signup request error if any
 */
export const makeGetSignupRequestError = (): Selector<
  State,
  RequestError<SignupDto> | undefined,
  {}
> => state => state.signupRequest.error;
