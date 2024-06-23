import { Grid, TextField } from "@mui/material";

export default function FormTextField({
  fullWidth = true,
  xs = 12,
  sm = 12,
  ...props
}) {
  return (
    <Grid item xs={xs} sm={sm}>
      <TextField {...props} fullWidth />
    </Grid>
  );
}
