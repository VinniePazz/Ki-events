import React, { Component } from "react";
import { Grid, Header, Image, Segment, Icon } from "semantic-ui-react";
import LazyLoad from "react-lazyload";

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
              photos.map(photo => (
                <LazyLoad
                  key={photo.id}
                  height={300}
                  placeholder={<Image src="/assets/user.png" />}
                >
                  <Image src={photo.url} />
                </LazyLoad>
              ))}
          </Image.Group>
        </Segment>
      </Grid.Column>
    );
  }
}

export default UserDetailedPhotos;
