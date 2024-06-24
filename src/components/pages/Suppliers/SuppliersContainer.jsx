import { Container, Paper } from "@mui/material";

export default function SuppliersContainer({ children }) {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: { xs: 14, sm: 20 },
        pb: { xs: 8, sm: 12 },
      }}
    >
      <Paper sx={{ width: { xs: "100%", sm: "70%" }, p: 2 }}>{children}</Paper>
    </Container>
  );
}
