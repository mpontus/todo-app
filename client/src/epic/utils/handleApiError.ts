import { OperatorFunction, of } from "rxjs";
import { Action } from "redux";
import { catchError } from "rxjs/operators";
import { RequestError } from "../../model/RequestError";

/**
 * Helper function to handle API error
 *
 * Wraps error caught from source observable into RequestError and
 * passes it onto specified action creator before merging it into the
 * result stream.
 */
export const handleApiError = <T, R>(
  failureActionCreator: (e: any) => R
): OperatorFunction<T, T | R> =>
  catchError(error =>
    of(failureActionCreator(RequestError.fromApiError(error)))
  );
