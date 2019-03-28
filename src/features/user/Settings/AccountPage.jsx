import React from 'react';
import {
  Segment,
  Header,
  Form,
  Divider,
  Label,
  Button,
  Icon
} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {
  combineValidators,
  matchesField,
  isRequired,
  composeValidators
} from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';

const validate = combineValidators({
  newPassword1: isRequired({ message: 'Пожалуйста, введите пароль' }),
  newPassword2: composeValidators(
    isRequired({ message: 'Пожалуйста, подтвердите новый пароль' }),
    matchesField('newPassword1')({ message: 'Пароли не совпадают!' })
  )()
});

const AccountPage = ({
  error,
  invalid,
  submitting,
  handleSubmit,
  updatePassword,
  providerId
}) => {
  return (
    <Segment clearing>
      <Header dividing size="large" content="Аккаунт" />
      {providerId &&
        providerId === 'password' && (
          <div>
            <Header color="teal" sub content="Измените ваш пароль" style={{ marginBottom: '1em' }} />
            
            <Form onSubmit={handleSubmit(updatePassword)}>
              <Field
                
                name="newPassword1"
                type="password"
                pointing="left"
                inline={true}
                component={TextInput}
                basic={true}
                placeholder="новый пароль"
              />
              <Field
                
                name="newPassword2"
                type="password"
                inline={true}
                basic={true}
                pointing="left"
                component={TextInput}
                placeholder="подтвердите пароль"
              />
              {error && (
                <Label basic color="red">
                  {error}
                </Label>
              )}
              <Divider />
              <Button
                disabled={invalid || submitting}
                size="large"
                positive
                content="Подтвердить"
								floated="right"
              />
            </Form>
          </div>
        )}
      {providerId &&
        providerId === 'google.com' && (
          <div>
            <Header color="teal" sub content="Google Account" />
            <p>Пожалуйста, посетите Google чтобы обновить вашы настройки</p>
            <Button type="button" color="google plus">
              <Icon name="google plus" />
              Google
            </Button>
          </div>
        )}
    </Segment>
  );
};

export default reduxForm({ form: 'account', validate })(AccountPage);
