import * as yup from "yup";
import * as React from "react";
import { Form } from "../component/Form";
import { Field } from "../component/Field";
import { SignupDto } from "../model/SignupDto";
import { Input } from "../component/Input";
import { RequestError } from "../model/RequestError";
import { createStructuredSelector } from "reselect";
import {
  makeIsSignupRequestInProgress,
  makeIsSignupRequestSuccess,
  makeGetSignupRequestError
} from "../selector/signupRequestSelectors";
import { State } from "../reducer";
import { signup } from "../action/authActions";
import { connect, Selector } from "react-redux";
import { Button } from "../component/Button";
import { Message } from "../component/Message";

interface ConnectedProps {
  submitting: boolean;
  success: boolean;
  error?: RequestError<SignupDto>;
}

interface Props extends ConnectedProps {
  onSubmit: (values: SignupDto) => void;
}

const initialValues = {
  username: "",
  password: ""
};

const schema = yup.object<SignupDto>().shape({
  username: yup.string().required(),
  password: yup
    .string()
    .min(6)
    .required()
});

const makeMapStateToProps: Selector<
  State,
  ConnectedProps,
  {}
> = createStructuredSelector({
  submitting: makeIsSignupRequestInProgress(),
  success: makeIsSignupRequestSuccess(),
  error: makeGetSignupRequestError()
});

const enhance = connect(
  makeMapStateToProps,
  { onSubmit: signup.request }
);

export const SignupFormContainer = enhance(
  ({ submitting, success, error, onSubmit }: Props) => (
    <Form
      errors={error && error.details}
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <Message error={error} />
      <Field
        component={Input}
        name="username"
        type="text"
        label="Username"
        placeholder="Enter your username"
      />
      <Field
        component={Input}
        name="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
      />
      <Button type="submit">Sign Up</Button>
    </Form>
  )
);
