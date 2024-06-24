import { Box } from "@mui/material";

export default function LandingControls({ children }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
      {children}
    </Box>
  );
}
