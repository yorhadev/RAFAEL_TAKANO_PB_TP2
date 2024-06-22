import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: { mode: "light" },
  });

  return (
    <div className="_app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div> hauhua</div>
      </ThemeProvider>
    </div>
  );
}

export default App;
