import React from "react";
import {
  Card,
  Grid,
  Header,
  Image,
  Segment,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import format from "date-fns/format";

const ruLocale = require("date-fns/locale/ru");

const tabs = [
  { content: "Все", index: 0 },
  { content: "Прошедшие", index: 1 },
  { content: "Будущие", index: 2 },
  { content: "Ваши", index: 3 }
];

const UserDeteiledEvents = ({
  events,
  eventsLoading,
  changeTab,
  currentTab
}) => {
  return (
    <Grid.Column width={16}>
      <Segment style={{ display: "flex", justifyContent: "center" }}>
        <Header as="h2">
          <Icon name="calendar" />
          <Header.Content>Встречи</Header.Content>
        </Header>
      </Segment>
			<div className="tab-menu">
          {tabs.map(tab => (
            <div
              key={tab.index}
              onClick={() => changeTab(tab.index)}
              className={`tab-item ${currentTab === tab.index ? `active` : ``}`}
            >
              {tab.content}
            </div>
          ))}
        </div>
      <Segment attached loading={eventsLoading} style={{border: 'none'}}>
        <Card.Group>
          {events &&
            events.map(event => (
              <Card as={Link} to={`/event/${event.id}`} key={event.id}>
                <Image src={`/assets/categoryImages/${event.category}.jpg`} />
                <Card.Content>
                  <Card.Header textAlign="center">{event.title}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{format(event.date, "DD MMM YYYY", { locale: ruLocale })}</div>
                    <div>в {format(event.date, "H:mm", { locale: ruLocale })}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDeteiledEvents;
