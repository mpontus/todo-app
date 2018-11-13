import { Selector } from "react-redux";
import { State } from "../reducer";
import { LoginDto } from "../model/LoginDto";
import { RequestError } from "../model/RequestError";
/**
 * Return whether login request is in progress
 */
export const makeIsLoginRequestInProgress = (): Selector<
  State,
  boolean,
  {}
> => state => state.loginRequest.loading;

/**
 * Return whether login request has finished successfully
 */
export const makeIsLoginRequestSuccess = (): Selector<
  State,
  boolean,
  {}
> => state => state.loginRequest.success;

/**
 * Return login request error if any
 */
export const makeGetLoginRequestError = (): Selector<
  State,
  RequestError<LoginDto> | undefined,
  {}
> => state => state.loginRequest.error;
