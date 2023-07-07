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

function App() {
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <ConnectWalletButton limitNetwork={NetworkType.MAINNET} />
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        maxWidth="lg"
      >
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
            sm={6}
          >
            <Sign />
          </Grid>
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
