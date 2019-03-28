import React from 'react';
import { Segment, Image, Item, Header, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom'


const eventImageStyle = {
    filter: 'brightness(30%)'
};

const EventDetailedHeader = ({ openModal, authenticated, loading, event, isHost, isGoing, goingToEvent, cancelGoingToEvent}) => {

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image src={`/assets/categoryImages/${event.category}.jpg`} fluid style={eventImageStyle} />

        <Segment basic className="header">
        <Item.Group>
            <Item style={{ margin: '0' }}>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: 'white', marginBottom: '.2em' }}
                />
                <p>
                  Hosted by <Link to={`/profile/${event.hostUid}`} style={{color: '#ffffff'}}>{event.hostedBy}</Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

			<Segment attached="bottom">
        {!isHost && (
          <div>
						{isGoing &&
							<Button onClick={() => cancelGoingToEvent(event)}>Cancel My Place</Button>}

						{!isGoing && authenticated && !event.cancelled &&
							<Button loading={loading} onClick={() => goingToEvent(event)} color="teal">JOIN THIS EVENT</Button>}
								
						{!authenticated && !event.cancelled &&
							<Button loading={loading} onClick={() => openModal('UnauthModal')} color="teal">LOGIN TO JOIN THIS EVENT</Button>}

						{event.cancelled && !isHost &&
						<Label size='large' color='red' content='This event has been cancelled'/>}
          </div>
        )}

        {isHost && (
          <Button
            as={Link}
            to={`/manage/${event.id}`}
            color="orange"
          >
            Редактировать
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedHeader;
