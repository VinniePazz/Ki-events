import React from "react";
import {Grid, Menu, Header} from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

function SettingsNav() {
  return (
			<>
				<Menu vertical>
					<Header icon="user" attached inverted color="grey" content="Профиль" />
					<Menu.Item as={NavLink} to='/settings/basic'>Общие</Menu.Item>
					<Menu.Item as={NavLink} to='/settings/about'>Обо мне</Menu.Item>
					<Menu.Item as={NavLink} to='/settings/photos'>Фотографии</Menu.Item>
				</Menu>
				
				<Menu vertical>
					<Header
						icon="settings"
						attached
						inverted
						color="grey"
						content="Аккаунт"
					/>
					<Menu.Item as={NavLink} to='/settings/account'>Изменить пароль</Menu.Item>
				</Menu>
			</>
  );
}

export default SettingsNav;
