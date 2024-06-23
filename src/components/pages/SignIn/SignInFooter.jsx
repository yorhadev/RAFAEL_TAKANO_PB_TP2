import { Grid, Link } from "@mui/material";
import { useContext } from "react";
import { RouterContext } from "../../../contexts/";

export default function SignInFooter() {
  const { setCurrentRoute } = useContext(RouterContext);
  const handleLinkRoute = (e) => {
    e.preventDefault();
    setCurrentRoute("SignUp");
  };

  return (
    <Grid container mt={2} justifyContent="flex-end">
      <Grid item>
        <Link href="#" variant="body2" onClick={handleLinkRoute}>
          Ainda não possui uma conta? Cadastre-se
        </Link>
      </Grid>
    </Grid>
  );
}
