import { Paper, Typography, Grid, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import verifySignature from "../../hooks/useVerifySignature";
import FileUploader from "../FileUploader/fileUploader";

function Verify() {
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [key, setKey] = useState("");
  const [hash, setHash] = useState("");

  const onVerifyClick = (signature: string, key: string, message?: string) => {
    try {
      verifySignature(signature, key, message);
      alert("Successfully verified");
    } catch (e) {
      console.log(e);
      alert("Verification error");
    }
  };

  const handleHash = (hash: string) => {
    setHash(hash);
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
        <FileUploader onValueChange={handleHash} />

        <TextField
          fullWidth
          required
          multiline
          id="signature"
          label="Signature"
          variant="outlined"
          sx={{ my: 1 }}
          onChange={(e) => setSignature(e.target.value)}
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
        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          onClick={() => onVerifyClick(signature, key, hash)}
        >
          Verify
        </Button>
      </Grid>
    </Paper>
  );
}

export default Verify;
