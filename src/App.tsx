import React from "react";
import "./App.css";

import {
  ConnectWalletButton,
  NetworkType,
} from "@cardano-foundation/cardano-connect-with-wallet";
import { AppBar, Container, CssBaseline, Grid, Toolbar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Sign from "./components/Sign/sign";
import Verify from "./components/Verify/verify";

/**
 * The main component of the application.
 */
function App() {
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      {/* Application bar */}
      <AppBar position="static">
        <Toolbar>
          {/* Connect wallet button */}
          <ConnectWalletButton limitNetwork={NetworkType.MAINNET} />
        </Toolbar>
      </AppBar>

      {/* Main container */}
      <Container
        component="main"
        maxWidth="lg"
      >
        {/* Grid layout */}
        <Grid
          container
          spacing={2}
        >
          {/* Sign component */}
          <Grid
            item
            xs={12}
            sm={6}
          >
            <Sign />
          </Grid>

          {/* Verify component */}
          <Grid
            item
            xs={12}
            sm={6}
          >
            <Verify />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;