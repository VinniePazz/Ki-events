import React, { Component } from "react";
import EventlistItem from "./EventListItem";

class EventList extends Component {
  render() {
    const { events, onOpenEvent, deleteEvent } = this.props;
    return (
      <div>
        <h1>Event List</h1>
        {events.map(event => (
          <EventlistItem
            key={event.id}
            event={event}
            onOpenEvent={onOpenEvent}
						deleteEvent={deleteEvent}
          />
        ))}
      </div>
    );
  }
}

export default EventList;
