import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import {
  Image,
  Segment,
  Header,
  Grid,
  Button,
  Card,
  Icon
} from "semantic-ui-react";
import { toastr } from "react-redux-toastr";
import Dropzone from "react-dropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { uploadProfileImage, deletePhoto, setMainPhoto } from "../userActions";

const query = ({ auth }) => {
  return [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "photos" }],
      storeAs: "photos"
    }
  ];
};

const actions = {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
  loading: state.async.loading
});

const style = {
  marginBottom: "1em"
};

class PhotosPage extends Component {
  state = {
    files: [],
    fileName: "",
    cropResult: null,
    image: {}
  };

  cancelCrop = () => {
    this.setState({
      files: [],
      image: {}
    });
  };

  uploadImage = async () => {
    try {
      await this.props.uploadProfileImage(
        this.state.image,
        this.state.fileName
      );
      this.cancelCrop();
      toastr.success("Успех", "Фото загружено");
    } catch (error) {
      toastr.error("Упс", "Что-то пошло не так");
    }
  };

  handlePhotoDelete = photo => async () => {
    try {
      this.props.deletePhoto(photo);
    } catch (error) {
      toastr.error("Oops", error.message);
    }
  };

  handleSetMainPhoto = photo => async () => {
    try {
      await this.props.setMainPhoto(photo);
    } catch (error) {
      toastr.error("Oops", error.message);
    }
  };

  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === "undefined") {
      return;
    }

    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageUrl = URL.createObjectURL(blob);
      this.setState({
        cropResult: imageUrl,
        image: blob
      });
    }, "image/jpeg");
  };

  onDrop = files => {
    this.setState({
      files,
      fileName: files[0].name
    });
  };

  render() {
    const { photos, profile, loading } = this.props;
    let filteredPhotos;
    if (photos) {
      filteredPhotos = photos.filter(photo => {
        return photo.url !== profile.photoURL;
      });
    }
    return (
      <>
        <Segment>
          <Grid stackable centered>
            <Grid.Column
              textAlign="center"
              width={5}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <Header
                color="teal"
                sub
                content="Шаг 1 - Добавьте фото"
                style={style}
              />
              <Dropzone
                onDrop={this.onDrop}
                multiple={false}
                style={{ height: "auto", border: "1px dashed black" }}
              >
                <div style={{ padding: "2em 0", textAlign: "center" }}>
                  <Icon name="upload" size="large" />
                  <Header content="Кликните сюда или перетащите файл" />
                </div>
              </Dropzone>
            </Grid.Column>
            <Grid.Column
              textAlign="center"
              width={5}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <Header
                sub
                color="teal"
                content="Шаг 2 - Измените размер"
                style={style}
              />
              {this.state.files[0] && (
                <Cropper
                  style={{ height: "14rem", width: "100%" }}
                  ref="cropper"
                  src={this.state.files[0].preview}
                  aspectRatio={1}
                  viewMode={0}
                  dragMode="move"
                  guides={true}
                  scalable={true}
                  cropBoxMovable={true}
                  cropBoxResizable={true}
                  crop={this.cropImage}
                />
              )}
            </Grid.Column>
            <Grid.Column textAlign="center" width={5}>
              <Header
                sub
                color="teal"
                content="Шаг 3 - Загрузите фото"
                style={style}
              />
              {this.state.files[0] && (
                <div
                  style={{
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto"
                  }}
                >
                  <Image
                    style={{ width: "100%" }}
                    src={this.state.cropResult}
                  />
                  <Button.Group style={{ width: "100%" }}>
                    <Button
                      loading={loading}
                      onClick={this.uploadImage}
                      positive
                      icon="check"
                    />
                    <Button
                      disabled={loading}
                      onClick={this.cancelCrop}
                      icon="close"
                    />
                  </Button.Group>
                </div>
              )}
            </Grid.Column>
          </Grid>
        </Segment>

        <Segment>
          <Header content="Все фотографии" style={style} />

          <Grid>
            <Grid.Column
              tablet={8}
              mobile={8}
              computer={4}
              largeScreen={4}
              widescreen={4}
            >
              <Card>
                <Image src={profile.photoURL || "/assets/user.png"} />
                <Button positive style={{ padding: ".8em .5em" }}>
                  Фото профиля
                </Button>
              </Card>
            </Grid.Column>
            {photos &&
              filteredPhotos.map(photo => (
                <Grid.Column
                  tablet={8}
                  mobile={8}
                  computer={4}
                  largeScreen={4}
                  widescreen={4}
                >
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    <div className="ui two buttons">
                      <Button
                        loading={loading}
                        onClick={this.handleSetMainPhoto(photo)}
                        basic
                        icon="trash"
                        color="green"
                      >
                        Main
                      </Button>
                      <Button
                        onClick={this.handlePhotoDelete(photo)}
                        basic
                        icon="trash"
                        color="red"
                      />
                    </div>
                  </Card>
                </Grid.Column>
              ))}
          </Grid>
        </Segment>
      </>
    );
  }
}

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect(auth => query(auth))
)(PhotosPage);
