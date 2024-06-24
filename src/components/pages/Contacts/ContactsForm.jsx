import { Box, Button, Grid, MenuItem } from "@mui/material";
import { FormController, FormSelect, FormTextField } from "../../form";
import { useContext, useEffect, useState } from "react";
import { useTextField } from "../../../composables/useForm";
import { useNumber, useRequired } from "../../../composables/useRules";
import { ScreenContext } from "../../../contexts";
import { useScreenAlert } from "../../../composables/useScreen";
import { useScreenLoading } from "../../../composables/useScreen";
import firebaseService from "../../../services/firebaseService";
import { useUpper } from "../../../composables/useFormat";

export default function ContactsForm({ rows, setRows }) {
  const [name, setName] = useState({
    ...useTextField("name", "Nome"),
    rules: [useRequired],
    customHelperText: "obrigatório",
  });
  const [phone, setPhone] = useState({
    ...useTextField("phone", "Telefone"),
    rules: [useNumber],
    customHelperText: "não é número",
  });
  const [supplier, setSupplier] = useState({
    ...useTextField("supplier", "Fornecedor"),
    rules: [useRequired],
    customHelperText: "obrigatório",
  });

  const [supplierItems, setSupplierItems] = useState([]);

  const { appScreen, setAppScreen } = useContext(ScreenContext);

  const handleOnSubmit = async (e) => {
    setAppScreen(useScreenLoading(true));
    const { data, error } = await firebaseService.createDoc("Contacts", {
      id: `${useUpper(supplier.value)}${useUpper(name.value)}${phone.value}`,
      name: name.value,
      phone: phone.value,
      supplier: supplier.value,
      supplierId: useUpper(supplier.value),
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

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await firebaseService.getDocs(
        "Suppliers",
        firebaseService.currentUser().uid
      );
      if (error) return;
      if (data.length > 0) setSupplierItems(data);
    };
    fetchData();
  }, []);

  return (
    <FormController
      sx={{ mt: 2 }}
      validate={[
        { input: name, update: setName },
        { input: phone, update: setPhone },
        { input: supplier, update: setSupplier },
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
        name={phone.name}
        label={phone.label}
        error={phone.error}
        helperText={phone.helperText}
        required={true}
        loading={appScreen.screenLoading}
        sm={4}
        onInput={(e) => setPhone({ ...phone, value: e.target.value })}
      />
      <FormSelect
        label={`${supplier.label} *`}
        error={supplier.error}
        helperText={supplier.helperText}
        value={supplier.value}
        sm={4}
        onChange={(e) => setSupplier({ ...supplier, value: e.target.value })}
      >
        {supplierItems.map((supplier, index) => (
          <MenuItem key={index} value={supplier.name}>
            {supplier.name}
          </MenuItem>
        ))}
      </FormSelect>
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
