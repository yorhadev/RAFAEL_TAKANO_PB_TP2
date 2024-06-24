import { default as Container } from "./SignUpContainer";
import { default as Avatar } from "./SignUpAvatar";
import { default as Title } from "./SignUpTitle";
import { default as Footer } from "./SignUpFooter";
import { FormButton, FormCheckbox } from "../../form";
import { FormController, FormTextField } from "../../form";
import { useContext, useState } from "react";
import { useTextField } from "../../../composables/useForm";
import { useEmail, useMinLen } from "../../../composables/useRules";
import { useRequired } from "../../../composables/useRules";
import { RouterContext, ScreenContext } from "../../../contexts";
import { useScreenAlert } from "../../../composables/useScreen";
import { useScreenLoading } from "../../../composables/useScreen";
import firebaseService from "../../../services/firebaseService";

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

  const { appScreen, setAppScreen } = useContext(ScreenContext);
  const { setCurrentRoute } = useContext(RouterContext);

  const handleSignUp = async (e) => {
    setAppScreen(useScreenLoading(true));
    const { user, error } = await firebaseService.createUser(
      email.value,
      password.value
    );
    setAppScreen(useScreenLoading(false));
    if (error) {
      setAppScreen(useScreenAlert(error, "error"));
    }
    if (user) {
      setAppScreen(useScreenAlert("Usuário conectado com sucesso!", "success"));
      setCurrentRoute("Landing");
    }
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
          loading={appScreen.screenLoading}
          sm={6}
          onInput={(e) => setName({ ...name, value: e.target.value })}
        />
        <FormTextField
          name={surname.name}
          label={surname.label}
          error={surname.error}
          helperText={surname.helperText}
          required={true}
          loading={appScreen.screenLoading}
          sm={6}
          onInput={(e) => setSurname({ ...surname, value: e.target.value })}
        />
        <FormTextField
          name={email.name}
          label={email.label}
          error={email.error}
          helperText={email.helperText}
          required={true}
          loading={appScreen.screenLoading}
          onInput={(e) => setEmail({ ...email, value: e.target.value })}
        />
        <FormTextField
          name={password.name}
          label={password.label}
          error={password.error}
          helperText={password.helperText}
          type="password"
          required={true}
          loading={appScreen.screenLoading}
          onInput={(e) => setPassword({ ...password, value: e.target.value })}
        />
        <FormCheckbox
          label="Quero receber promoções de marketing e atualizações por e-mail."
          loading={appScreen.screenLoading}
        />
        <FormButton type="submit" loading={appScreen.screenLoading}>
          Cadastrar
        </FormButton>
      </FormController>
      <Footer />
    </Container>
  );
}
