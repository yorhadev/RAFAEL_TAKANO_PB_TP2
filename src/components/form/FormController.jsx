import { Box, Grid } from "@mui/material";
import {
  useClearError,
  useCustomHelperText,
  useCustomLabel,
} from "../../composables/useForm";

export default function FormController({
  children,
  sx,
  onSubmit,
  spacing = 2,
  validate = [],
}) {
  const clearError = (input, update) => {
    useClearError(input, update);
    update(useClearError(input, update));
  };

  const handleValidation = (e) => {
    e.preventDefault();

    let canSubmit = true;

    validate.map(({ input, update }) => {
      if (!("rules" in input)) return;
      if (input?.rules.length <= 0) return;

      clearError(input, update);

      input.rules.map((rule) => {
        if (rule(input.value)) return;
        const text = `${useCustomLabel(input)} ${useCustomHelperText(input)}`;
        update({ ...input, error: true, helperText: text });
        canSubmit = false;
      });
    });

    if (canSubmit) onSubmit(e);
  };

  return (
    <_Form sx={sx} onSubmit={handleValidation}>
      <_FormGrid spacing={spacing}>{children}</_FormGrid>
    </_Form>
  );
}

function _Form({ children, sx, onSubmit }) {
  return (
    <Box component="form" noValidate sx={sx} onSubmit={onSubmit}>
      {children}
    </Box>
  );
}

function _FormGrid({ children, spacing }) {
  return (
    <Grid container spacing={spacing}>
      {children}
    </Grid>
  );
}
