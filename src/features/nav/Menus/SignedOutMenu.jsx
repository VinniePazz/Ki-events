import React from "react";
import { Menu, Button } from "semantic-ui-react";

function SignedOutMenu({ signIn, register, mobile }) {
  return (
    <Menu.Item position="right">
      {mobile ? (
        <Button basic inverted icon="sign-in" onClick={signIn} style={{ marginRight: ".5em" }} />
      ) : (
        <Button basic inverted content="Вход" onClick={signIn} style={{ marginRight: ".5em" }} />
      )}
      <Button
        onClick={register}
        content="Регистрация"
        inverted
        basic
      />
    </Menu.Item>
  );
}

export default SignedOutMenu;
