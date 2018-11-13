import * as React from "react";
import { Redirect, Route, Switch } from "react-router";
import { Container } from "../component/Container";
import { Footer } from "../component/Footer";
import { SingleColumnLayout } from "../component/SingleColumnLayout";
import { SignupFormContainer } from "../containers/SignupFormContainer";

/**
 * Root screen
 *
 * Contains top-level routes of the website.
 */
export const Root = () => (
  <div>
    <SignupFormContainer />
  </div>
);
