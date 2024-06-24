import { Link, Typography } from "@mui/material";

export default function LandingTerms({ children }) {
  return (
    <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
      Ao clicar em &quot;Iniciar&quot; você concorda com nossos&nbsp;
      <Link href="#" color="primary" onClick={(e) => e.preventDefault()}>
        Termos e Condições
      </Link>
      .
    </Typography>
  );
}
