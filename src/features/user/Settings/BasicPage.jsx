import React, { Component } from 'react';
import { Segment, Form, Header, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import TextInput from '../../../app/common/form/TextInput';
import RadioInput from '../../../app/common/form/RadioInput';

class BasicPage extends Component {
  render() {
    const { pristine, submitting, handleSubmit, updateProfile } = this.props;
    return (
      <Segment clearing>
        <Header dividing size="large" content="Общие" />
        <Form onSubmit={handleSubmit(updateProfile)}>
          <Field
            width={16}
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Ваше имя"
          />
          <Form.Group inline>
            <label>Пол: </label>
            <Field
              name="gender"
              type="radio"
              value="male"
              label="Мужской"
              component={RadioInput}
            />
            <Field
              name="gender"
              type="radio"
              value="female"
              label="Женский"
              component={RadioInput}
            />
          </Form.Group>
          <Field
            width={16}
            name="dateOfBirth"
            component={DateInput}
            dateFormat='YYYY-MM-DD'
            showYearDropdown={true}
            showMonthDropdown={true}
            dropdownMode='select'
            maxDate={moment().subtract(18, 'years')}
            placeholder="Дата рождения"
          />
          <Field
            name="city"
            placeholder="Место проживания"
            options={{ types: ['(cities)'] }}
            component={PlaceInput}
            width={16}
          />
          <Divider />
          <Button
					floated="right"
            disabled={pristine || submitting}
            size="large"
            positive
            content="Обновить"
          />
        </Form>
      </Segment>
    );
  }
}

export default reduxForm({ form: 'userProfile', enableReinitialize: true, destroyOnUnmount: false })(
  BasicPage
);
