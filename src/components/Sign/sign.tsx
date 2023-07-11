import {
  Paper,
  Typography,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import FileUploader from "../FileUploader/fileUploader";

function Sign() {
  const [hash, setHash] = useState("");
  const [signature, setSignature] = useState("");
  const [key, setKey] = useState("");

  const { signMessage, isConnected } = useCardano();

  const onSignClick = async (message: string) => {
    if (isConnected) {
      if (message !== "") {
        await signMessage(message, handleSign);
      } else {
        alert("The message cannot be empty");
      }
    } else {
      alert("The wallet is not connected");
    }
  };

  const handleSign = (signature: string, key?: string) => {
    setSignature(signature);
    if(key) {
      setKey(key);
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
        Sign
      </Typography>
      <FormControl fullWidth>
        <FileUploader onValueChange={handleHash} />

        <TextField
          fullWidth
          id="hash"
          label="Hash"
          multiline
          variant="outlined"
          sx={{ my: 1 }}
          value={hash}
        />

        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          onClick={() => onSignClick(hash)}
        >
          Sign
        </Button>
      </FormControl>

      <TextField
        fullWidth
        id="signature"
        label="Signature"
        multiline
        variant="outlined"
        sx={{ my: 1 }}
        value={signature}
      />

<TextField
        fullWidth
        id="key"
        label="Key"
        multiline
        variant="outlined"
        sx={{ my: 1 }}
        value={key}
      />
    </Paper>
  );
}

export default Sign;
