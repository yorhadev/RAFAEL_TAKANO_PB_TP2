import { default as Container } from "./SignInContainer";
import { default as Avatar } from "./SignInAvatar";
import { default as Title } from "./SignInTitle";
import { default as Footer } from "./SignInFooter";
import { FormButton, FormCheckbox } from "../../form";
import { FormController, FormTextField } from "../../form";
import { useState } from "react";
import { useTextField } from "../../../composables/useForm";
import { useEmail, useMinLen } from "../../../composables/useRules";

export default function Signin() {
  const [email, setEmail] = useState({
    ...useTextField("email", "E-mail"),
    rules: [useEmail],
  });
  const [password, setPassword] = useState({
    ...useTextField("password", "Senha"),
    rules: [useMinLen],
  });
  const handleSignIn = (e) => {
    console.log("handle sign in");
  };

  return (
    <Container>
      <Avatar />
      <Title title={"Entrar"} />
      <FormController
        sx={{ mt: 2, width: "100%" }}
        validate={[
          { input: email, update: setEmail },
          { input: password, update: setPassword },
        ]}
        onSubmit={handleSignIn}
      >
        <FormTextField
          name={email.name}
          label={email.label}
          error={email.error}
          helperText={email.helperText}
          autoFocus={true}
          required={true}
          onInput={(e) => setEmail({ ...email, value: e.target.value })}
        />
        <FormTextField
          name={password.name}
          label={password.label}
          error={password.error}
          helperText={password.helperText}
          type="password"
          required={true}
          onInput={(e) => setPassword({ ...password, value: e.target.value })}
        />
        <FormCheckbox label="Lembre-se de mim" />
        <FormButton type="submit">Enviar</FormButton>
      </FormController>
      <Footer />
    </Container>
  );
}
