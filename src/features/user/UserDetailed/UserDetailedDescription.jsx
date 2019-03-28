import React from "react";
import {
  Grid,
  Header,
  Icon,
  Item,
  List,
  Segment,
  Button
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import differenceInYears from "date-fns/difference_in_years";

const ruLocale = require("date-fns/locale/ru");

const UserDetailedDescription = ({
  profile,
  isCurrentUser,
  followUser,
  isFollowing,
  unfollowUser
}) => {
  let age;
  if (profile.dateOfBirth) {
    age = differenceInYears(Date.now(), profile.dateOfBirth);
  } else {
    age = "unknown age";
  }

  return (
    <Grid.Column width={12} verticalAlign="middle">
      <Grid columns={2} stackable>
        <Grid.Column width={11} textAlign="left">
          <Header as="h3">{profile.displayName}</Header>
          <em style={{ marginBottom: "1rem", display: "block" }}>{age} года</em>
          <p>{profile.about || "Здесь могла быть ваша реклама"}</p>
          <p>
            Участник с:{" "}
            <em>
              {format(profile.createdAt, "D MMMM YYYY", { locale: ruLocale })}
            </em>
          </p>
          <p>{profile.description}</p>
        </Grid.Column>
        <Grid.Column width={5}>
          <Header content="Интересы" />
          {profile.interests ? (
            <List as="ul">
              {profile.interests &&
                profile.interests.map((interest, index) => (
                  <List.Item key={index} as="li">
                    <List.Content>{interest}</List.Content>
                  </List.Item>
                ))}
            </List>
          ) : (
            <p>No interests</p>
          )}
					<br/>

          {isCurrentUser && (
            <Button
              as={Link}
              to="/settings"
              color="teal"
              basic
              fluid
              content="Изменить профиль"
            />
          )}
          {!isCurrentUser && !isFollowing && (
            <Button
              onClick={() => followUser(profile)}
              color="teal"
              basic
              fluid
              content="Подписатья"
            />
          )}

          {!isCurrentUser && isFollowing && (
            <Button
              onClick={() => unfollowUser(profile)}
              color="teal"
              basic
              fluid
              content="Отписаться"
            />
          )}
        </Grid.Column>
      </Grid>
    </Grid.Column>
  );
};

export default UserDetailedDescription;
