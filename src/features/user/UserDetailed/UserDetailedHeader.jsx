import React from "react";
import { Grid, Header, Item, Segment, Image } from "semantic-ui-react";


const UserDetailedHeader = ({ profile }) => {

  return (
    <Grid.Column width={4} verticalAlign="middle">
        <Image
          style={{ margin: '0 auto'}}
          size="medium"
					circular
          src={profile.photoURL || "/assets/user.png"}
        />
    </Grid.Column>
  );
};

export default UserDetailedHeader;
