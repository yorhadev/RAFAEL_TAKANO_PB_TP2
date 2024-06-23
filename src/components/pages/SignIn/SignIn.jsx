import { default as Container } from "./SignInContainer";
import { default as Avatar } from "./SignInAvatar";
import { default as Title } from "./SignInTitle";
import { default as Footer } from "./SignInFooter";
import { FormButton, FormCheckbox } from "../../form";
import { FormController, FormTextField } from "../../form";
import { useContext, useState } from "react";
import { useTextField } from "../../../composables/useForm";
import { useEmail, useMinLen } from "../../../composables/useRules";
import { ScreenContext } from "../../../contexts";
import { useScreenAlert } from "../../../composables/useScreen";
import { useScreenLoading } from "../../../composables/useScreen";
import firebaseService from "../../../services/firebaseService";

export default function Signin() {
  const [email, setEmail] = useState({
    ...useTextField("email", "E-mail"),
    rules: [useEmail],
  });
  const [password, setPassword] = useState({
    ...useTextField("password", "Senha"),
    rules: [useMinLen],
  });

  const { appScreen, setAppScreen } = useContext(ScreenContext);

  const handleSignIn = async (e) => {
    setAppScreen(useScreenLoading(true));
    const { user, error } = await firebaseService.signIn(email, password);
    setAppScreen(useScreenLoading(false));
    if (error) {
      setAppScreen(useScreenAlert(error, "error"));
    }
    if (user) {
      setAppScreen(useScreenAlert("Usuário entrou com sucesso!", "success"));
    }
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
          label="Lembre-se de mim"
          loading={appScreen.screenLoading}
        />
        <FormButton type="submit" loading={appScreen.screenLoading}>
          Enviar
        </FormButton>
      </FormController>
      <Footer />
    </Container>
  );
}
