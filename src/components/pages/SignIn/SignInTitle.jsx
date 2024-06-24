import { Typography } from "@mui/material";

export default function SignInTitle({ title }) {
  return (
    <Typography component="h1" variant="h5">
      {title}
    </Typography>
  );
}
