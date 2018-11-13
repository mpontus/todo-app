import * as yup from "yup";
import * as React from "react";
import { Form } from "../component/Form";
import { Field } from "../component/Field";
import { LoginDto } from "../model/LoginDto";
import { Input } from "../component/Input";
import { RequestError } from "../model/RequestError";
import { createStructuredSelector } from "reselect";
import {
  makeIsLoginRequestInProgress,
  makeIsLoginRequestSuccess,
  makeGetLoginRequestError
} from "../selector/loginRequestSelectors";
import { State } from "../reducer";
import { login } from "../action/authActions";
import { connect, Selector } from "react-redux";
import { Button } from "../component/Button";
import { Message } from "../component/Message";

interface ConnectedProps {
  submitting: boolean;
  success: boolean;
  error?: RequestError<LoginDto>;
}

interface Props extends ConnectedProps {
  onSubmit: (values: LoginDto) => void;
}

const initialValues = {
  username: "",
  password: ""
};

const schema = yup.object<LoginDto>().shape({
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
  submitting: makeIsLoginRequestInProgress(),
  success: makeIsLoginRequestSuccess(),
  error: makeGetLoginRequestError()
});

const enhance = connect(
  makeMapStateToProps,
  { onSubmit: login.request }
);

export const LoginFormContainer = enhance(
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
      <Button type="submit">Log In</Button>
    </Form>
  )
);
