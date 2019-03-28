import React from "react";
import { Menu, Button } from "semantic-ui-react";

function SignedOutMenu({ signIn, register }) {
  return (
    <Menu.Item position="right">
      <Button
        onClick={register}
        content="Регистрация"
				inverted
				basic
				style={{ marginRight: '.5em' }}
      />
      <Button basic inverted icon="sign-in" onClick={signIn} />
    </Menu.Item>
  );
}

export default SignedOutMenu;
