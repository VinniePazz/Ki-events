import React, { Component } from "react";
import {
  Segment,
  Item,
  Icon,
  List,
  Button,
  Label,
  Image
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import EventListAttendee from "./EventListAttendee";
import format from "date-fns/format";
import { objectToArray } from "../../../app/common/utils/helpers";

const ruLocale = require("date-fns/locale/ru");

class EventListItem extends Component {
  render() {
    const { event } = this.props;
    return (
      <Segment.Group>
        <Segment style={{padding: '0'}}>
          <Image alt="The logo of event" fluid src={`/assets/categoryImages/${event.category}.jpg`} as={Link} to={`/event/${event.id}`} />

          {/* <Item.Group>
            <Item className="eventItem">
              <Item.Image
                size="large"
                src={`/assets/categoryImages/${event.category}.jpg`}
              />
							
              <Item.Content>
                <Item.Header as={Link} to={`/event/${event.id}`}>
                  {event.title}
                </Item.Header>
                <Item.Description>{event.description}</Item.Description>
                {!event.cancelled && (
                  <Item.Description style={{textAlign: 'right', marginTop: '1em'}}>
                    Предложил  {" "}
                    <Link to={`/profile/${event.hostUid}`}>
                      {event.hostedBy}
                    </Link>
                  </Item.Description>
                )}
                {event.cancelled && (
                  <Label
                    style={{ top: "10px" }}
                    ribbon="right"
                    color="red"
                    content="Встреча отменена"
                  />
                )}
              </Item.Content>
            </Item>
          </Item.Group> */}
        </Segment>
				<Segment>
					<h2 style={{textAlign: 'center'}}>{event.title}</h2>
				</Segment>
        <Segment>
          <Item.Content>
            <Item.Description>{event.description}</Item.Description>
            {!event.cancelled && (
              <Item.Extra style={{ textAlign: "right", marginTop: "1em" }}>
                Предложил{" "}
                <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>
              </Item.Extra>
            )}
          </Item.Content>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" />{" "}
            {format(event.date, "dd D MMMM", { locale: ruLocale })} в{" "}
            {format(event.date, "HH:mm", { locale: ruLocale })} <br />
            <br />
            <Icon name="marker" />
            {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          Участники:{" "}
          <List horizontal>
            {event.attendees &&
              objectToArray(event.attendees).map(attendee => (
                <EventListAttendee key={attendee.id} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <Button
            as={Link}
            to={`/event/${event.id}`}
            color="teal"
            floated="right"
            content="Подробнее"
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
