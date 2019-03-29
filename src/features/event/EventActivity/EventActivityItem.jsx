import React, { Component } from 'react';
import { Feed } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import format from 'date-fns/format';

const ruLocale = require('date-fns/locale/ru')

class EventActivityItem extends Component {
  renderSummary = activity => {
    switch (activity.type) {
      case 'newEvent':
        return (
          <div>
            Новая встреча!{' '}
            <Feed.User as={Link} to={{ pathname: '/profile/' + activity.hostUid }}>
              {activity.hostedBy}
            </Feed.User>{' '}
            предложил <Link to={{ pathname: '/event/' + activity.eventId }}>{activity.title}</Link>
          </div>
        );
      case 'cancelledEvent':
        return (
          <div>
            Встреча отменена!{' '}
            <Feed.User as={Link} to={{ pathname: '/profile/' + activity.hostUid }}>
              {activity.hostedBy}
            </Feed.User>{' '}
            отменил <Link to={{ pathname: '/event/' + activity.eventId }}>{activity.title}</Link>
          </div>
        );
      default:
        return;
    }
  };

  render() {
    const { activity } = this.props;
    return (
      <Feed.Event>
        <Feed.Label>
          <img src={activity.photoURL || '/assets/user.png'} alt="user's face" />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>{this.renderSummary(activity)}</Feed.Summary>
          <Feed.Meta>
            <Feed.Date>{distanceInWordsToNow(format(activity.timestamp), {locale: ruLocale})} назад</Feed.Date>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

export default EventActivityItem;
