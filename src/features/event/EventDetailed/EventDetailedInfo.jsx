import React, { Component } from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import EventDetailedMap from './EventDetailedMap'
import format from 'date-fns/format'

const ruLocale = require('date-fns/locale/ru')

class EventDetailedInfo extends Component {
  state = {
    showMap: true
  }

  componentWillUnmount() {
    this.setState({
      showMap: false
    })
  }

  showMapToggle = () => {
    this.setState(prevState => ({
      showMap: !prevState.showMap
    }))
  }

  render() {
    const { event } = this.props;

    return (
      <Segment.Group>
        <Segment attached="top">
          <Grid stackable verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon size="big" color="teal" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{event.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid stackable verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="calendar alternate" size="big" color="teal" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>{format(event.date, 'dddd D MMMM', { locale: ruLocale})} в {format(event.date, 'H:mm', { locale: ruLocale})}</span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid stackable verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="map marker alternate" size="big" color="teal" />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>{event.venue}</span>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button className="map" onClick={this.showMapToggle} color="teal" size="tiny" content={this.state.showMap ? 'Скрыть карту' : 'Показать на карте'}/>
            </Grid.Column>
          </Grid>
        </Segment>
        {this.state.showMap &&
        <EventDetailedMap lat={event.venueLatLng.lat} lng={event.venueLatLng.lng}/>}
      </Segment.Group>
    );
  }
}

export default EventDetailedInfo;
