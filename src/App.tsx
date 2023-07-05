import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  TextField,
  Container,
  CssBaseline,
  Button,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import {
  ConnectWalletButton,
  NetworkType,
  useCardano,
} from "@cardano-foundation/cardano-connect-with-wallet";
import verifySignature from "./hooks/useVerifySignature";

function App() {
  const [message, setMessage] = useState("");
  const [messageVerify, setMessageVerify] = useState("");
  const [signature, setSignature] = useState("");
  const [signatureVerify, setSignatureVerify] = useState("");
  const [key, setKey] = useState("");

  const { stakeAddress, signMessage, isConnected } = useCardano();

  const handleSignMessage = (signature: string, key?: string) => {
    setSignature(signature);
    console.log(key);
  };

  const onSignClick = async (message: string) => {
    if (isConnected) {
      if (message !== "") {
        await signMessage(message, handleSignMessage);
      } else {
        alert("The message cannot be empty");
      }
    } else {
      alert("The wallet is not connected");
    }
  };

  const onVerifyClick = (signature: string, key: string, messageVerify?: string) => {
    try {
      console.log("Verified:", verifySignature(signature, key, messageVerify));
    } catch (e) {
      console.log(e);
      alert("Verification error");
    }
    
  };

  const defaultTheme = createTheme();

  function handleMessage(message: string) {
    setMessage(message);
  }

  function handleMessageVerify(messageVerify: string) {
    setMessageVerify(messageVerify);
  }

  function handleSignature(signature: string) {
    setSignature(signature);
  }

  function handleSignatureVerify(signatureVerify: string) {
    setSignatureVerify(signatureVerify);
  }

  function handleKey(key: string) {
    setKey(key);
  }

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
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            sx={{ my: { xs: 3, md: 6 } }}
          >
            Sign
          </Typography>
          <Grid
            container
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <TextField
              fullWidth
              required
              multiline
              id="message"
              label="Message"
              variant="outlined"
              sx={{ my: 1 }}
              onChange={(e) => setMessage(e.target.value)}
            />
            <TextField
              fullWidth
              id="signatureResult"
              label="Signature"
              multiline
              variant="outlined"
              sx={{ my: 1 }}
              value={signature}
            />
          </Grid>

          <Grid
            container
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
            >
              Upload
              <input
                hidden
                type="file"
              />
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              onClick={() => onSignClick(message)}
            >
              Sign
            </Button>
          </Grid>
        </Paper>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            sx={{ my: { xs: 3, md: 6 } }}
          >
            Verify
          </Typography>
          <Grid
            container
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <TextField
              fullWidth
              required
              multiline
              id="signatureVerify"
              label="Signature"
              variant="outlined"
              sx={{ my: 1 }}
              onChange={(e) => setSignatureVerify(e.target.value)}
            />
            <TextField
              fullWidth
              required
              multiline
              id="key"
              label="Key"
              variant="outlined"
              sx={{ my: 1 }}
              onChange={(e) => setKey(e.target.value)}
            />
            <TextField
              fullWidth
              multiline
              id="messageVerify"
              label="Message"
              variant="outlined"
              sx={{ my: 1 }}
              onChange={(e) => setMessageVerify(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              onClick={() => onVerifyClick(signatureVerify, key, messageVerify)}
            >
              Verify
            </Button>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
