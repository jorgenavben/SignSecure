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

/**
 * Sign component for signing a document with a connected wallet.
 */
function Sign() {
  // State variables
  const [hash, setHash] = useState("");
  const [signature, setSignature] = useState("");
  const [key, setKey] = useState("");

  // Visibility state variables
  const [isSignatureKeyVisible, setIsSignatureKeyVisible] = useState(false);
  const [
    isWalletNotConnectedOnSignVisible,
    setIsWalletNotConnectedOnSignVisible,
  ] = useState(false);

  // Cardano wallet connection hook
  const { signMessage, isConnected } = useCardano();

  /**
   * Handles the sign button click event.
   * Signs the message with the connected wallet if available.
   * Shows an error message if no wallet is connected.
   */
  const onSignClick = async () => {
    if (isConnected) {
      setIsWalletNotConnectedOnSignVisible(false);
      await signMessage(hash, handleSign);
    } else {
      setIsWalletNotConnectedOnSignVisible(true);
    }
  };

  /**
   * Handles the sign message callback.
   * Updates the signature and key state variables.
   * Sets the visibility of the signature and key fields.
   * @param {string} signature - The generated signature.
   * @param {string} key - The generated key (optional).
   */
  const handleSign = (signature: string, key?: string) => {
    setSignature(signature);
    if (key) {
      setKey(key);
    }
    setIsSignatureKeyVisible(true);
  };

  /**
   * Handles the download button click event.
   * Downloads the signature and key as a JSON file.
   */
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
        <FileUpload data={hash} onValueChange={setHash} />

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