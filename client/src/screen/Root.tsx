import * as React from "react";
import { Redirect, Route, Switch } from "react-router";
import { Container } from "../component/Container";
import { Footer } from "../component/Footer";
import { SingleColumnLayout } from "../component/SingleColumnLayout";
import { LoginFormContainer } from "../containers/LoginFormContainer";
import { SignupFormContainer } from "../containers/SignupFormContainer";
import { CurrentUserProvider } from "../containers/CurrentUserProvider";
import { AuthGate } from "../containers/AuthGate";

/**
 * Root screen
 *
 * Contains top-level routes of the website.
 */
export const Root = () => (
  <AuthGate placeholder={<div>Loading</div>}>
    <div>
      <CurrentUserProvider>
        {({ user, onLogout }) => (
          <div>
            {user ? (
              <div>
                {`You are authenticated as ${user.username}`}
                <button onClick={onLogout}>Logout</button>
              </div>
            ) : (
              "You are authenticated anonymously"
            )}
          </div>
        )}
      </CurrentUserProvider>
      <LoginFormContainer />
      <SignupFormContainer />
    </div>
  </AuthGate>
);
