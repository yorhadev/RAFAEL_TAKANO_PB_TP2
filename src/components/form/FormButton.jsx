import { Button, Grid } from "@mui/material";

export default function FormButton({
  children,
  type = "normal",
  variant = "contained",
  fullWidth = true,
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
        sx={sx}
        {...props}
      >
        {children}
      </Button>
    </Grid>
  );
}
