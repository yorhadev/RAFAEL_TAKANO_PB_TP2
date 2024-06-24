import { Box, Button, Grid } from "@mui/material";
import { FormController, FormTextField } from "../../form";
import { useContext, useState } from "react";
import { useTextField } from "../../../composables/useForm";
import { useRequired } from "../../../composables/useRules";
import { ScreenContext } from "../../../contexts";
import { useScreenAlert } from "../../../composables/useScreen";
import { useScreenLoading } from "../../../composables/useScreen";
import firebaseService from "../../../services/firebaseService";

export default function SuppliersForm({ rows, setRows }) {
  const [name, setName] = useState({
    ...useTextField("name", "Nome"),
    rules: [useRequired],
    customHelperText: "obrigatório",
  });
  const [address, setAddress] = useState({
    ...useTextField("address", "Endereço"),
    rules: [useRequired],
    customHelperText: "obrigatório",
  });

  const { appScreen, setAppScreen } = useContext(ScreenContext);

  const handleOnSubmit = async (e) => {
    setAppScreen(useScreenLoading(true));
    const { data, error } = await firebaseService.createDoc("Suppliers", {
      id: String(name.value).toUpperCase(),
      name: name.value,
      address: address.value,
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
        { input: address, update: setAddress },
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
        sm={6}
        onInput={(e) => setName({ ...name, value: e.target.value })}
      />
      <FormTextField
        name={address.name}
        label={address.label}
        error={address.error}
        helperText={address.helperText}
        required={true}
        loading={appScreen.screenLoading}
        sm={6}
        onInput={(e) => setAddress({ ...address, value: e.target.value })}
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
