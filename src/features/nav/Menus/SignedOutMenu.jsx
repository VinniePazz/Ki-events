import React from "react";
import { Menu, Button } from "semantic-ui-react";

function SignedOutMenu({ signIn, register, mobile }) {
  return (
    <Menu.Item position="right">
      <Button
        onClick={register}
        content="Регистрация"
				inverted
				basic
				style={{ marginRight: '.5em' }}
      />
      { mobile ? 
				<Button basic inverted icon="sign-in" onClick={signIn} /> : 
				<Button basic inverted content="Вход" onClick={signIn} />
			}
    </Menu.Item>
  );
}

export default SignedOutMenu;
