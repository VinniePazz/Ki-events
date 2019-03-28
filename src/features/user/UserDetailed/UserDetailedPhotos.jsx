import React, { Component } from "react";
import { Grid, Header, Image, Segment, Icon } from "semantic-ui-react";

class UserDetailedPhotos extends Component {
shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.photos.length !== this.props.photos.length) {
			return true;
		}
		return false;
	}	
  render() {
		const { photos } = this.props;
    return (
      <Grid.Column width={16}>
        <Segment style={{ display: "flex", justifyContent: "center" }}>
          <Header as="h2">
            <Icon name="image" />
            <Header.Content>Фотографии</Header.Content>
          </Header>
        </Segment>

        <Segment attached textAlign="center">
          <Image.Group size="medium">
            {photos &&
              photos.map(photo => <Image src={photo.url} key={photo.id} />)}
          </Image.Group>
        </Segment>
      </Grid.Column>
    );
  }
}

export default UserDetailedPhotos;
