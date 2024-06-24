import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function FormSelect({
  children,
  label = "",
  fullWidth = true,
  error = false,
  helperText = "",
  disabled = false,
  loading = false,
  sx,
  xs = 12,
  sm = 12,
  ...props
}) {
  return (
    <Grid item xs={xs} sm={sm}>
      <FormControl fullWidth={fullWidth} error={error}>
        <InputLabel id="form-select-label">{label}</InputLabel>
        <Select
          id="form-select"
          labelId="form-select-label"
          label={label}
          {...props}
        >
          <MenuItem value={""}>
            <em>Vazio</em>
          </MenuItem>
          {children}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Grid>
  );
}
