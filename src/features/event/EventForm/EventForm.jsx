/*global google*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withFirestore } from "react-redux-firebase";
import Script from "react-load-script";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import { createEvent, updateEvent, cancelToggle } from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";

const mapState = (state, ownProps) => {
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

  return {
    initialValues: event,
    event,
    loading: state.async.loading
  };
};

const actions = {
  createEvent,
  updateEvent,
  cancelToggle
};

const category = [
  { key: "party", text: "Вечеринка", value: "party" },
  { key: "pub", text: "Паб", value: "pub" },
  { key: "culture", text: "Культурное мероприятие", value: "culture" },
  { key: "film", text: "Кино", value: "film" },
  { key: "theatre", text: "Театр", value: "theatre" },
  { key: "food", text: "Званый Ужин", value: "food" },
  { key: "music", text: "Музыка", value: "music" },
  { key: "entertainment", text: "Развлечения", value: "entertainment" },
  { key: "picnic", text: "Пикник", value: "picnic" }
];

const validate = combineValidators({
  title: isRequired({ message: "Название обязательно" }),
  category: isRequired({ message: "Пожалуйста, выберите категорию" }),
  description: composeValidators(
    isRequired({ message: "Пожалуйста, опишите событие" }),
    hasLengthGreaterThan(4)({
      message: "Должно быть не меньше 5 символов"
    })
  )(),
  city: isRequired({ message: "Выберите город проведения" }),
  venue: isRequired({ message: "Выберите место проведения" }),
  date: isRequired({ message: "Выберите дату проведения" })
});

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  };

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        });
      })
      .then(() => {
        this.props.change("city", selectedCity);
      });
  };

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        });
      })
      .then(() => {
        this.props.change("venue", selectedVenue);
      });
  };

  onFormSubmit = values => {
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      if (Object.keys(values.venueLatLng).length === 0) {
        values.venueLatLng = this.props.event.venueLatLng;
      }
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      this.props.createEvent(values);
      this.props.history.push("/events");
    }
  };

  render() {
    const {
      invalid,
      submitting,
      pristine,
      event,
      cancelToggle,
      loading
    } = this.props;
    return (
      <Grid centered>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyC1Oy3Ic6JyE6RR4eEbEFw2T-ynXjjWzTc&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column
          mobile={16}
          tablet={16}
          largeScreen={10}
          textAlign="center"
        >
          <Segment>
            <Header
              sub
              color="teal"
              content="Детали Встречи"
              style={{ marginBottom: "1em" }}
            />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)} autoComplete="off">
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Название"
              />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                placeholder="Тематика"
              />
              <Field
                name="description"
                type="text"
                component={TextArea}
                rows={3}
                placeholder="Описание"
              />
              <Header
                sub
                color="teal"
                content="Место проведения встречи"
                style={{ marginBottom: "1em" }}
              />
              <Field
                name="city"
                type="text"
                component={PlaceInput}
                options={{ types: ["(cities)"] }}
                placeholder="город"
                onSelect={this.handleCitySelect}
              />
              {this.state.scriptLoaded && (
                <Field
                  name="venue"
                  type="text"
                  component={PlaceInput}
                  options={{
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000
                  }}
                  placeholder="место"
                  onSelect={this.handleVenueSelect}
                />
              )}
              <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat="YYYY-MM-DD HH:mm"
                timeFormat="HH:mm"
                showTimeSelect
                placeholder="дата и время"
								
              />
              <Grid style={{ padding: "1em" }} centered>
                <Button
                  loading={loading}
                  disabled={invalid || submitting || pristine}
                  positive
                  type="submit"
                >
                  Подтвердить
                </Button>
                <Button
                  disabled={loading}
                  onClick={this.props.history.goBack}
                  type="button"
                >
                  Отмена
                </Button>

                {event.id && (
                  <Button
                    onClick={() => cancelToggle(!event.cancelled, event.id)}
                    type="button"
                    color={event.cancelled ? "green" : "red"}
                    className="event"
                    content={
                      event.cancelled ? "Возобновить встречу" : "Отменить встречу"
                    }
                  />
                )}
              </Grid>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: "eventForm", enableReinitialize: true, validate })(
      EventForm
    )
  )
);
