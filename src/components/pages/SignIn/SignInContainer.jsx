import { Box, Container } from "@mui/material";

export default function SignInContainer({ children }) {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          pt: 10,
        }}
      >
        {children}
      </Box>
    </Container>
  );
}
