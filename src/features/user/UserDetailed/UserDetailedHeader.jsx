import React from "react";
import { Grid, Header, Item, Segment, Image } from "semantic-ui-react";
import differenceInYears from "date-fns/difference_in_years";

const UserDetailedHeader = ({ profile }) => {
  let age;
  if (profile.dateOfBirth) {
    age = differenceInYears(Date.now(), profile.dateOfBirth);
  } else {
    age = "unknown age";
  }
  return (
    <Grid.Column width={16}>
      <Segment>
        <Image
          circular
          size="medium"
          src={profile.photoURL || "/assets/user.png"}
        />
        <Header as="h1">{profile.displayName}</Header>
        <Header as="h3">{profile.occupation}</Header>
        <Header as="h3">
          {age}, Lives in {profile.city || "unknown city"}
        </Header>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedHeader;
