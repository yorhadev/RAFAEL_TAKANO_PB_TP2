import { Container, Stack } from "@mui/material";

export default function LandingContainer({ children }) {
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
      <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
        {children}
      </Stack>
    </Container>
  );
}
