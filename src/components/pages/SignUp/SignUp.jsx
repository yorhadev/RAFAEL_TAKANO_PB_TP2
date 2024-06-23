import { default as Container } from "./SignUpContainer";
import { default as Avatar } from "./SignUpAvatar";
import { default as Title } from "./SignUpTitle";
import { default as Footer } from "./SignUpFooter";
import { FormButton, FormCheckbox } from "../../form";
import { FormController, FormTextField } from "../../form";
import { useState } from "react";
import { useTextField } from "../../../composables/useForm";
import { useEmail, useMinLen } from "../../../composables/useRules";
import { useRequired } from "../../../composables/useRules";

export default function SignUp() {
  const [name, setName] = useState({
    ...useTextField("name", "Nome"),
    rules: [useRequired],
    customHelperText: "obrigatório",
  });
  const [surname, setSurname] = useState({
    ...useTextField("surname", "Sobrenome"),
    rules: [useRequired],
    customHelperText: "obrigatório",
  });
  const [email, setEmail] = useState({
    ...useTextField("email", "E-mail"),
    rules: [useEmail],
  });
  const [password, setPassword] = useState({
    ...useTextField("password", "Senha"),
    rules: [useMinLen],
  });
  const handleSignUp = async (e) => {
    console.log("handle sign up");
  };

  return (
    <Container>
      <Avatar />
      <Title title={"Cadastrar"} />
      <FormController
        sx={{ mt: 2, width: "100%" }}
        validate={[
          { input: name, update: setName },
          { input: surname, update: setSurname },
          { input: email, update: setEmail },
          { input: password, update: setPassword },
        ]}
        onSubmit={handleSignUp}
      >
        <FormTextField
          name={name.name}
          label={name.label}
          error={name.error}
          helperText={name.helperText}
          autoFocus={true}
          required={true}
          sm={6}
          onInput={(e) => setName({ ...name, value: e.target.value })}
        />
        <FormTextField
          name={surname.name}
          label={surname.label}
          error={surname.error}
          helperText={surname.helperText}
          required={true}
          sm={6}
          onInput={(e) => setSurname({ ...surname, value: e.target.value })}
        />
        <FormTextField
          name={email.name}
          label={email.label}
          error={email.error}
          helperText={email.helperText}
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
        <FormCheckbox label="Quero receber promoções de marketing e atualizações por e-mail." />
        <FormButton type="submit">Cadastrar</FormButton>
      </FormController>
      <Footer />
    </Container>
  );
}
