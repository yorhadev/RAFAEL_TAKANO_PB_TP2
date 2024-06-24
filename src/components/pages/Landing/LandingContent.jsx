import { Typography } from "@mui/material";

export default function LandingContent({ children }) {
  return (
    <Typography
      textAlign="center"
      color="text.secondary"
      sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
    >
      {children}
    </Typography>
  );
}
