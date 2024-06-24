import { Box, Button, Grid } from "@mui/material";
import { FormController, FormTextField } from "../../form";
import { useContext, useState } from "react";
import { useTextField } from "../../../composables/useForm";
import { useRequired } from "../../../composables/useRules";
import { ScreenContext } from "../../../contexts";
import { useScreenAlert } from "../../../composables/useScreen";
import { useScreenLoading } from "../../../composables/useScreen";
import firebaseService from "../../../services/firebaseService";

export default function ProductsForm({ rows, setRows }) {
  const [name, setName] = useState({
    ...useTextField("name", "Nome"),
    rules: [useRequired],
    customHelperText: "obrigatório",
  });
  const [code, setCode] = useState({
    ...useTextField("code", "Código"),
    rules: [useRequired],
    customHelperText: "obrigatório",
  });
  const [details, setDetails] = useState({
    ...useTextField("details", "Detalhes"),
    rules: [useRequired],
    customHelperText: "obrigatório",
  });

  const { appScreen, setAppScreen } = useContext(ScreenContext);

  const handleOnSubmit = async (e) => {
    setAppScreen(useScreenLoading(true));
    const { data, error } = await firebaseService.createDoc("Products", {
      id: String(name.value).toUpperCase(),
      name: name.value,
      code: code.value,
      details: details.value,
      collectionId: firebaseService.currentUser().uid,
    });
    setAppScreen(useScreenLoading(false));
    if (error) {
      setAppScreen(useScreenAlert(error, "error"));
    }
    if (data) {
      setAppScreen(useScreenAlert("Salvo com sucesso!", "success"));
      setRows([...rows, data]);
    }
  };
  return (
    <FormController
      sx={{ mt: 2 }}
      validate={[
        { input: name, update: setName },
        { input: code, update: setCode },
        { input: details, update: setDetails },
      ]}
      onSubmit={handleOnSubmit}
    >
      <FormTextField
        name={name.name}
        label={name.label}
        error={name.error}
        helperText={name.helperText}
        autoFocus={true}
        required={true}
        loading={appScreen.screenLoading}
        sm={4}
        onInput={(e) => setName({ ...name, value: e.target.value })}
      />
      <FormTextField
        name={code.name}
        label={code.label}
        error={code.error}
        helperText={code.helperText}
        required={true}
        loading={appScreen.screenLoading}
        sm={4}
        onInput={(e) => setCode({ ...code, value: e.target.value })}
      />
      <FormTextField
        name={details.name}
        label={details.label}
        error={details.error}
        helperText={details.helperText}
        required={true}
        loading={appScreen.screenLoading}
        sm={4}
        onInput={(e) => setDetails({ ...details, value: e.target.value })}
      />
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button type="submit" variant="contained">
            Criar
          </Button>
        </Box>
      </Grid>
    </FormController>
  );
}
