import { Box, Container } from "@mui/material";

export default function SignUpContainer({ children }) {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          marginTop: 10,
        }}
      >
        {children}
      </Box>
    </Container>
  );
}
