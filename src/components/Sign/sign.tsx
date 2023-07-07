import {
  Paper,
  Typography,
  FormControl,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import FileUpload from "../FileUpload/fileUpload";
import { saveAs } from "file-saver";

function Sign() {
  const [hash, setHash] = useState("");
  const [signature, setSignature] = useState("");
  const [key, setKey] = useState("");

  const [isSignatureKeyVisible, setIsSignatureKeyVisible] = useState(false);
  const [
    isWalletNotConnectedOnSignVisible,
    setIsWalletNotConnectedOnSignVisible,
  ] = useState(false);

  const { signMessage, isConnected } = useCardano();

  const onSignClick = async () => {
    if (isConnected) {
      setIsWalletNotConnectedOnSignVisible(false);
      await signMessage(hash, handleSign);
    } else {
      setIsWalletNotConnectedOnSignVisible(true);
    }
  };

  const handleSign = (signature: string, key?: string) => {
    setSignature(signature);
    if (key) {
      setKey(key);
    }
    setIsSignatureKeyVisible(true);
  };

  const handleDownload = () => {
    if (signature && key) {
      const data = { signature, key };
      const jsonData = JSON.stringify(data);
      const blob = new Blob([jsonData], { type: "application/json" });
      saveAs(blob, "sigantureKey.json");
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
        sx={{ my: { xs: 3, md: 2 } }}
      >
        Sign
      </Typography>
      <FormControl fullWidth>
        <FileUpload
          data={hash}
          onValueChange={setHash}
        />

        {hash && (
          <Button
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
            onClick={onSignClick}
          >
            Sign
          </Button>
        )}
      </FormControl>

      {isWalletNotConnectedOnSignVisible && (
        <Alert severity="error">
          In order to sign a document a wallet must be connected. Please,
          connect a wallet.
        </Alert>
      )}

      {isSignatureKeyVisible && (
        <>
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

          <Button
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
            onClick={() => handleDownload()}
          >
            Download
          </Button>
        </>
      )}
    </Paper>
  );
}

export default Sign;
