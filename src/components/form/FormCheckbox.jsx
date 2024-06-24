import { Checkbox, FormControlLabel, Grid } from "@mui/material";

export default function FormCheckbox({
  color = "primary",
  label,
  value,
  disabled = false,
  loading = false,
  xs = 12,
  sm = 12,
  ...props
}) {
  return (
    <Grid item xs={xs} sm={sm}>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            color={color}
            value={value}
            {...props}
            disabled={disabled || loading}
          />
        }
      />
    </Grid>
  );
}
