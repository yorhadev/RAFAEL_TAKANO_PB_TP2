import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useState } from "react";
import { useNavTheme } from "../../composables/useTheme";
import firebaseService from "../../services/firebaseService";
import { RouterContext, ScreenContext } from "../../contexts";
import { useScreenAlert } from "../../composables/useScreen";

export default function UiNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setAppScreen } = useContext(ScreenContext);
  const { setCurrentRoute } = useContext(RouterContext);

  const handleRoute = (route) => {
    setCurrentRoute(route);
  };
  const handleSignOut = async () => {
    const { error } = await firebaseService.signOut();
    if (error) return setAppScreen(useScreenAlert(error, "error"));
    setAppScreen(useScreenAlert("Desconectado com sucesso!", "success"));
  };

  return (
    <_NavBar>
      <_NavContainer>
        <_NavToolbar sx={useNavTheme}>
          <_NavMenu>
            <_NavLogo onClick={(e) => handleRoute("Landing")} />
            <_NavMenuWrapper>
              <_NavMenuItem onClick={(e) => handleRoute("Products")}>
                Produtos
              </_NavMenuItem>
              <_NavMenuItem onClick={(e) => handleRoute("Quotes")}>
                Cotações
              </_NavMenuItem>
              <_NavMenuItem>Contatos</_NavMenuItem>
              <_NavMenuItem onClick={(e) => handleRoute("Suppliers")}>
                Fornecedores
              </_NavMenuItem>
            </_NavMenuWrapper>
          </_NavMenu>
          <_NavControls>
            <_NavButton size="small" onClick={handleSignOut}>
              Sair
            </_NavButton>
          </_NavControls>
          <_NavMenuMobile>
            <_NavMenuMobileHamburguer
              onClick={(e) => setMobileMenuOpen(!mobileMenuOpen)}
            />
            <_NavMenuMobileDrawer
              open={mobileMenuOpen}
              onClose={(e) => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <_NavMenuMobileItem onClick={(e) => handleRoute("Products")}>
                Produtos
              </_NavMenuMobileItem>
              <_NavMenuMobileItem onClick={(e) => handleRoute("Quotes")}>
                Cotações
              </_NavMenuMobileItem>
              <_NavMenuMobileItem>Contatos</_NavMenuMobileItem>
              <_NavMenuMobileItem onClick={(e) => handleRoute("Suppliers")}>
                Fornecedores
              </_NavMenuMobileItem>
              <Divider />
              <_NavMenuMobileItem>
                <_NavButton
                  variant="outlined"
                  sx={{ width: "100%" }}
                  onClick={handleSignOut}
                >
                  Sair
                </_NavButton>
              </_NavMenuMobileItem>
            </_NavMenuMobileDrawer>
          </_NavMenuMobile>
        </_NavToolbar>
      </_NavContainer>
    </_NavBar>
  );
}

function _NavBar({ children }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 2,
        zIndex: 1,
      }}
    >
      {children}
    </AppBar>
  );
}

function _NavContainer({ children }) {
  return <Container maxWidth="lg">{children}</Container>;
}

function _NavToolbar({ children, sx }) {
  return (
    <Toolbar variant="regular" sx={sx}>
      {children}
    </Toolbar>
  );
}

function _NavMenu({ children }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        // ml: "-18px",
        // px: 0,
      }}
    >
      {children}
    </Box>
  );
}

function _NavLogo({ onClick = () => {} }) {
  return (
    <Typography
      component="div"
      variant="h6"
      sx={{ pl: 2, cursor: "pointer" }}
      onClick={onClick}
    >
      <Box component="span" sx={{ color: "primary.main" }}>
        GENERICO
      </Box>
      <Box component="span" sx={{ color: "primary.main", fontWeight: 300 }}>
        SYSTEM
      </Box>
    </Typography>
  );
}

function _NavMenuWrapper({ children }) {
  return (
    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, ml: 1 }}>
      {children}
    </Box>
  );
}

function _NavMenuItem({ children, onClick = () => {} }) {
  return (
    <MenuItem onClick={onClick} sx={{ pt: 1, "&:hover": { borderRadius: 2 } }}>
      <Typography variant="body2" color="text.primary">
        {children}
      </Typography>
    </MenuItem>
  );
}

function _NavControls({ children }) {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        gap: 1,
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
}

function _NavButton({
  children,
  size = "medium",
  variant = "text",
  sx,
  onClick = () => {},
}) {
  return (
    <Button
      color="primary"
      variant={variant}
      size={size}
      component="a"
      sx={sx}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function _NavMenuMobile({ children }) {
  return <Box sx={{ display: { sm: "", md: "none" } }}>{children}</Box>;
}

function _NavMenuMobileHamburguer({ onClick = () => {} }) {
  return (
    <Button
      variant="text"
      color="primary"
      aria-label="menu"
      onClick={onClick}
      sx={{ minWidth: "30px", p: "4px" }}
    >
      <MenuIcon />
    </Button>
  );
}

function _NavMenuMobileDrawer({ children, open = false, onClose = () => {} }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          minWidth: "60dvw",
          p: 2,
          backgroundColor: "background.paper",
          flexGrow: 1,
        }}
      >
        {children}
      </Box>
    </Drawer>
  );
}

function _NavMenuMobileItem({ children, onClick = () => {} }) {
  return <MenuItem onClick={onClick}>{children}</MenuItem>;
}
