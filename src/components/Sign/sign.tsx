import {
  Paper,
  Typography,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";

function Sign() {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File>();
  const [signature, setSignature] = useState("");

  const { signMessage, isConnected } = useCardano();

  function handleMessage(message: string) {
    setMessage(message);
  }

  function handleFile(file: File) {
    setFile(file);
  }

  function handleSignature(signature: string) {
    setSignature(signature);
  }

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

  const handleSignMessage = (signature: string, key?: string) => {
    handleSignature(signature);
    console.log(key);
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
        Sign
      </Typography>
      <FormControl fullWidth>
        <TextField
          fullWidth
          required
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
        >
          Upload
          <input
            onChange={(e) => {
              if (e.target.files != null) {
                handleFile(e.target.files[0]);
              }
            }}
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
      </FormControl>

      <TextField
        fullWidth
        id="signatureResult"
        label="Signature"
        multiline
        variant="outlined"
        sx={{ my: 1 }}
        value={signature}
      />
    </Paper>
  );
}

export default Sign;
