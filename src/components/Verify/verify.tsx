import { Paper, Typography, Grid, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import verifySignature from "../../hooks/useVerifySignature";

function Verify() {
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [key, setKey] = useState("");

  function handleSignature(signature: string) {
    setSignature(signature);
  }

  function handleKey(key: string) {
    setKey(key);
  }

  function handleMessage(message: string) {
    setMessage(message);
  }

  const onVerifyClick = (signature: string, key: string, message?: string) => {
    try {
      verifySignature(signature, key, message);
      alert("Successfully verified");
    } catch (e) {
      console.log(e);
      alert("Verification error");
    }
  };

  return (
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
          id="signature"
          label="Signature"
          variant="outlined"
          sx={{ my: 1 }}
          onChange={(e) => handleSignature(e.target.value)}
        />
        <TextField
          fullWidth
          required
          multiline
          id="key"
          label="Key"
          variant="outlined"
          sx={{ my: 1 }}
          onChange={(e) => handleKey(e.target.value)}
        />
        <TextField
          fullWidth
          multiline
          id="message"
          label="Message"
          variant="outlined"
          sx={{ my: 1 }}
          onChange={(e) => handleMessage(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          onClick={() => onVerifyClick(signature, key, message)}
        >
          Verify
        </Button>
      </Grid>
    </Paper>
  );
}

export default Verify;
