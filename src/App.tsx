import React from "react";
import "./App.css";

import {
  ConnectWalletButton,
  NetworkType,
} from "@cardano-foundation/cardano-connect-with-wallet";
import { AppBar, Container, CssBaseline, Toolbar } from "@mui/material";
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
        maxWidth="sm"
      >
        <Sign />
        <Verify />
      </Container>
    </ThemeProvider>
  );
}

export default App;
