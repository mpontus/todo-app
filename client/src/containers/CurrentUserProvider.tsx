import { makeGetCurrentUser } from "../selector/authSelectors";
import { createStructuredSelector } from "reselect";
import { logout } from "../action/authActions";
import { connect, Selector, DispatchProp } from "react-redux";
import { State } from "../reducer";
import { Dispatch } from "redux";
import { User } from "../model/User";

interface StateProps {
  user?: User;
}

interface DispatchProps {
  onLogout: () => void;
}

interface RenderProps extends StateProps, DispatchProps {}

interface OwnProps {
  children: (props: RenderProps) => React.ReactNode;
}

interface Props extends OwnProps, StateProps, DispatchProps {}

const makeMapStateToProps = (): Selector<State, StateProps, {}> =>
  createStructuredSelector({
    user: makeGetCurrentUser()
  });

const enhance = connect(
  makeMapStateToProps,
  { onLogout: logout }
);

export const CurrentUserProvider = enhance((({ user, onLogout, children }) =>
  children({ user, onLogout })) as React.SFC<Props>);
