import * as React from "react";
import { makeIsUserAuthenticated } from "../selector/authSelectors";
import { createStructuredSelector } from "reselect";
import { State } from "../reducer";
import { Selector, connect } from "react-redux";

interface OwnProps {
  placeholder?: React.ReactNode;
  children: React.ReactNode;
}

interface StateProps {
  isAuthenticated: boolean;
}

interface Props extends OwnProps, StateProps {}

const makeMapStateToProps = (): Selector<State, StateProps, {}> =>
  createStructuredSelector({
    isAuthenticated: makeIsUserAuthenticated()
  });

const enhance = connect(makeMapStateToProps);

/**
 * Prevent children from rendering before authentication
 */
export const AuthGate = enhance(
  ({ isAuthenticated, children, placeholder = null }: Props) => (
    <React.Fragment>{isAuthenticated ? children : placeholder}</React.Fragment>
  )
);
