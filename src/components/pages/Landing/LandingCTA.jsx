import { Typography } from "@mui/material";

export default function LandingCTA() {
  return (
    <_CTAH1>
      O melhor em&nbsp;
      <_CTASpan>cotações</_CTASpan>
    </_CTAH1>
  );
}

function _CTAH1({ children }) {
  return (
    <Typography
      variant="h1"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignSelf: "center",
        textAlign: "center",
        fontSize: "clamp(3.5rem, 10vw, 4rem)",
      }}
    >
      {children}
    </Typography>
  );
}

function _CTASpan({ children }) {
  return (
    <Typography
      component="span"
      variant="h1"
      sx={{
        fontSize: "clamp(3rem, 10vw, 4rem)",
        color: "primary.main",
      }}
    >
      {children}
    </Typography>
  );
}
