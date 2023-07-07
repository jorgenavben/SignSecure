import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import FileUpload from "../FileUpload/fileUpload";
import verifySignature from "@cardano-foundation/cardano-verify-datasignature";

function Verify() {
  const [signature, setSignature] = useState("");
  const [key, setKey] = useState("");
  const [hash, setHash] = useState("");

  const [isSuccessfulVerificationVisible, setIsSuccessfulVerificationVisible] =
    useState(false);
  const [
    isUnSuccessfulVerificationVisible,
    setIsUnSuccessfulVerificationVisible,
  ] = useState(false);

  const onVerifyClick = (signature: string, key: string, message?: string) => {
    try {
      if (verifySignature(signature, key, message)) {
        setIsSuccessfulVerificationVisible(true);
        setIsUnSuccessfulVerificationVisible(false);
      } else {
        setIsSuccessfulVerificationVisible(false);
        setIsUnSuccessfulVerificationVisible(true);
      }
    } catch (e) {
      console.log(e);
      setIsSuccessfulVerificationVisible(false);
      setIsUnSuccessfulVerificationVisible(true);
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
        sx={{ my: { xs: 3, md: 2 } }}
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

        <FileUpload
          data={hash}
          onValueChange={setHash}
        />

        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          onClick={() => onVerifyClick(signature, key, hash)}
        >
          Verify
        </Button>

        {isSuccessfulVerificationVisible && (
          <Alert severity="success">Sucessfully verified</Alert>
        )}

        {isUnSuccessfulVerificationVisible && (
          <Alert severity="error">
            It was not possible to verify the information
          </Alert>
        )}
      </Grid>
    </Paper>
  );
}

export default Verify;
