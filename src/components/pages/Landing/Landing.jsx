import { default as Container } from "./LandingContainer";
import { default as CTA } from "./LandingCTA";
import { default as Content } from "./LandingContent";
import { default as Controls } from "./LandingControls";
import { default as TermsOfService } from "./LandingTerms";
import { Button } from "@mui/material";

export default function Landing() {
  return (
    <Container>
      <CTA />
      <Content>
        Explore nosso painel de última geração, oferecendo soluções de alta
        qualidade adaptado às suas necessidades. Eleve sua experiência com
        recursos de primeira linha e serviços.
      </Content>
      <Controls>
        <Button variant="contained" color="primary">
          Iniciar
        </Button>
      </Controls>
      <TermsOfService />
    </Container>
  );
}
