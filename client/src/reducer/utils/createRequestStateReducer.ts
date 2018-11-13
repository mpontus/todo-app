import { Reducer } from "redux";
import { Action } from "../../action";

interface RequestState<ErrorType> {
  loading: boolean;
  success: boolean;
  error?: ErrorType;
}

const initialState = {
  loading: false,
  success: false
};

export const createRequestStateReducer = <
  BaseAction extends Action,
  RequestAction extends BaseAction,
  SuccessAction extends BaseAction,
  FailureAction extends BaseAction,
  ErrorType extends Error
>(
  requestActionPredicate: (value: BaseAction) => value is RequestAction,
  successActionPredicate: (value: BaseAction) => value is SuccessAction,
  failureActionPredicate: (value: BaseAction) => value is FailureAction,
  errorSelector: (value: FailureAction) => ErrorType
): Reducer<RequestState<ErrorType>, BaseAction> => (
  state = initialState,
  action
) => {
  if (requestActionPredicate(action)) {
    return {
      loading: true,
      success: false
    };
  }

  if (successActionPredicate(action)) {
    return {
      loading: false,
      success: true
    };
  }

  if (failureActionPredicate(action)) {
    return {
      loading: false,
      success: false,
      error: errorSelector(action)
    };
  }

  return state;
};
