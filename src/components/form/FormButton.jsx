import { Button, CircularProgress, Grid } from "@mui/material";

export default function FormButton({
  children,
  type = "normal",
  variant = "contained",
  fullWidth = true,
  disabled = false,
  loading = false,
  sx,
  xs = 12,
  sm = 12,
  ...props
}) {
  return (
    <Grid item xs={xs} sm={sm}>
      <Button
        type={type}
        variant={variant}
        fullWidth={fullWidth}
        disabled={disabled || loading}
        startIcon={loading && <CircularProgress color="inherit" size={20} />}
        sx={sx}
        {...props}
      >
        {children}
      </Button>
    </Grid>
  );
}
