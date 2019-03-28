import React from "react";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import SocialLogin from "../SocialLogin/SocialLogin";
import { login, socialLogin } from "../authActions";

const actions = {
	login,
	socialLogin
};

const LoginForm = ({ login, handleSubmit, error, socialLogin }) => {
  return (
    <Form
      size="large"
      onSubmit={handleSubmit(login)}
      style={{ textAlign: "center" }}
    >
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="пароль"
        />
        {error && (
          <Label basic color="red" style={{ marginBottom: "1em" }}>
            {error}
          </Label>
        )}
        <Button fluid size="large" color="teal">
          Вход
        </Button>
				<Divider horizontal>или</Divider>
        <SocialLogin socialLogin={socialLogin}/>
      </Segment>
    </Form>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: "loginForm" })(LoginForm));
