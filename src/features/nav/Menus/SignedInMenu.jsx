import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const SignedInMenu = ({signOut, profile, auth}) => {
  return (
    <Menu.Item position="right" style={{padding: '.1em .5em'}}>
      <Image avatar spaced="right" src={profile.photoURL || "/assets/user.png"} />
      <Dropdown pointing="top right" text={profile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={'/createEvent'} text="Создать встречу" icon="plus" />
          <Dropdown.Item as={Link} to="/people" text="Подписчики" icon="users" />
          <Dropdown.Item as={Link} to={`/profile/${auth.uid}`} text="Профиль" icon="user" />
          <Dropdown.Item as={Link} to='/settings' text="Настройки" icon="setting" />
          <Dropdown.Item onClick={signOut} text="Выйти" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;
