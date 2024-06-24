import { Grid, Link } from "@mui/material";
import { useContext } from "react";
import { RouterContext } from "../../../contexts/";

export default function SignUpFooter() {
  const { setCurrentRoute } = useContext(RouterContext);
  const handleLinkRoute = (e) => {
    e.preventDefault();
    setCurrentRoute("SignIn");
  };

  return (
    <Grid container mt={2} justifyContent="flex-end">
      <Grid item>
        <Link href="#" variant="body2" onClick={handleLinkRoute}>
          Já possui uma conta? Entrar
        </Link>
      </Grid>
    </Grid>
  );
}
