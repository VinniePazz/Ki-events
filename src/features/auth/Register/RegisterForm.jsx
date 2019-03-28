import React from "react";
import { connect } from "react-redux";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { combineValidators, isRequired } from "revalidate";
import TextInput from "../../../app/common/form/TextInput";
import { registerUser, socialLogin } from "../authActions";
import SocialLogin from "../SocialLogin/SocialLogin";

const actions = {
	registerUser,
	socialLogin
};

const validate = combineValidators({
  displayName: isRequired({ message: 'Пожалуйста, введите логин' }),
  email: isRequired({ message: 'Пожалуйста, введите email' }),
  password: isRequired({ message: 'Пожалуйста, введите пароль' })
});

const RegisterForm = ({
  registerUser,
  handleSubmit,
  error,
  invalid,
	submitting,
	socialLogin
}) => {
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(registerUser)}>
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="имя"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="пароль"
          />
          {error && (
            <Label basic color="red">
              {error}
            </Label>
          )}
          <Button
            disabled={invalid || submitting}
            fluid
            size="large"
            color="teal"
          >
            Зарегистрироваться
          </Button>
          <Divider horizontal>или</Divider>
          <SocialLogin socialLogin={socialLogin} />
        </Segment>
      </Form>
    </div>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: "registerForm", validate })(RegisterForm));
