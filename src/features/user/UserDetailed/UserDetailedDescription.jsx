import React from 'react';
import { Grid, Header, Icon, Item, List, Segment } from 'semantic-ui-react';
import format from 'date-fns/format';

const UserDetailedDescription = ({ profile }) => {
	let createdAt;
  if (profile.createdAt) {
    createdAt = format(profile.createdAt, 'D MMM YYYY');
  }
  return (
    <Grid.Column width={12}>
      <Segment> 
        <Grid columns={2} stackable>
          <Grid.Column width={10} textAlign="left">
            <Header icon="smile" content="About Display Name" />
            <p>
              I am a: <strong>{profile.occupation || 'tbn'}</strong>
            </p>
            <p>
              Originally from <strong>{profile.origin || 'tbn'}</strong>
            </p>
            <p>
              Member Since: <strong>{createdAt}</strong>
            </p>
            <p>{profile.description}</p>
          </Grid.Column>
          <Grid.Column width={6} >
            <Header icon="heart outline" content="Интересы"  />
            {profile.interests ?
            <List as="ul">
              {profile.interests &&
                profile.interests.map((interest, index) => (
                  <List.Item key={index} as="li">
                    <List.Content>{interest}</List.Content>
                  </List.Item>
                ))}
            </List> : <p>No interests</p>}
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedDescription;
