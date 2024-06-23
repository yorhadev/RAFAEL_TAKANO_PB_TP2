import { CssBaseline, ThemeProvider } from "@mui/material";
import { useTheme } from "./composables/useTheme";
import { AppAuth, AppRouter, AppScreen } from "./components/app";

export default function App() {
  return (
    <div className="_app">
      <ThemeProvider theme={useTheme}>
        <CssBaseline />
        <AppScreen>
          <AppAuth>
            <AppRouter />
          </AppAuth>
        </AppScreen>
      </ThemeProvider>
    </div>
  );
}
