import React from 'react';
import { Button, Divider, Form, Header, Segment } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextArea from '../../../app/common/form/TextArea';
import PlaceInput from '../../../app/common/form/PlaceInput';
import SelectInput from '../../../app/common/form/SelectInput';

const interests = [
  { key: 'саморазвитие', text: 'саморазвитие', value: 'свморазвитие' },
  { key: 'books', text: 'книги', value: 'книги' },
  { key: 'film', text: 'кинематограф', value: 'кинематограф' },
  { key: 'food', text: 'кулинария', value: 'кулинария' },
  { key: 'music', text: 'музыка', value: 'музыка' },
  { key: 'games', text: 'игры', value: 'игры' },
  { key: 'travel', text: 'путешествия', value: 'путешествия' },
	{ key: 'physhology', text: 'психология', value: 'психология' },
	{ key: 'party', text: 'вечеринки', value: 'вечеринки' },
];

const AboutPage = ({ pristine, submitting, handleSubmit, updateProfile }) => {
  return (
    <Segment clearing>
      <Header dividing size="large" content="Обо мне" />
      <Form onSubmit={handleSubmit(updateProfile)}>
        <Field name="about" component={TextArea} placeholder="Расскажи о себе несколько слов странник" />
        <Field
          name="interests"
          component={SelectInput}
          options={interests}
          value="interests"
          multiple={true}
          placeholder="Выберите ваши интересы"
        />
        <Field
          name="origin"
          options={{ types: ['(regions)'] }}
          component={PlaceInput}
          placeholder="Место рождения"
        />
        <Divider />
        <Button disabled={pristine || submitting} size="large" positive content="Обновить" floated="right" />
      </Form>
    </Segment>
  );
};

export default reduxForm({ form: 'userProfile', enableReinitialize: true, destroyOnUnmount: false })(AboutPage);