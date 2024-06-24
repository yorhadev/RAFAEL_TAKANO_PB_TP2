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

export default function QuotesForm({ rows, setRows }) {
  const [price, setPrice] = useState({
    ...useTextField("price", "Preço"),
    rules: [useNumber],
    customHelperText: "não é número",
  });
  const [product, setProduct] = useState({
    ...useTextField("product", "Produto"),
    rules: [useRequired],
    customHelperText: "obrigatório",
  });
  const [productItems, setProductItems] = useState([]);

  const { appScreen, setAppScreen } = useContext(ScreenContext);

  const handleOnSubmit = async (e) => {
    setAppScreen(useScreenLoading(true));
    const { data, error } = await firebaseService.createDoc("Quotes", {
      id: `${useUpper(product.value)}${useUpper(price.value)}`,
      date: Date.now(),
      price: price.value,
      product: product.value,
      productId: useUpper(product.value),
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
        "Products",
        firebaseService.currentUser().uid
      );
      if (error) return;
      if (data.length > 0) setProductItems(data);
    };
    fetchData();
  }, []);

  return (
    <FormController
      sx={{ mt: 2 }}
      validate={[
        { input: price, update: setPrice },
        { input: product, update: setProduct },
      ]}
      onSubmit={handleOnSubmit}
    >
      <FormTextField
        name={price.name}
        label={price.label}
        error={price.error}
        helperText={price.helperText}
        required={true}
        loading={appScreen.screenLoading}
        sm={6}
        onInput={(e) => setPrice({ ...price, value: e.target.value })}
      />
      <FormSelect
        label={`${product.label} *`}
        error={product.error}
        helperText={product.helperText}
        value={product.value}
        sm={6}
        onChange={(e) => setProduct({ ...product, value: e.target.value })}
      >
        {productItems.map((product, index) => (
          <MenuItem key={index} value={product.name}>
            {product.name}
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
