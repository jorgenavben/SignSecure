import { TextField } from "@mui/material";
import React, { useState } from "react";
import { MuiFileInput } from "mui-file-input";
import { sha256 } from "multiformats/hashes/sha2";
import { CID } from "multiformats/cid";

/**
 * Props for the FileUploader component.
 */
interface FileUploaderProps {
  data: string;
  onValueChange: (hash: string) => void;
}

/**
 * A component for uploading files and calculating their SHA-256 hash.
 */
function FileUpload({ data, onValueChange }: FileUploaderProps) {
  const SHA_256_CODE = 0x12;

  // State for storing the selected file.
  const [file, setFile] = useState<File | null>(null);

  /**
   * Handles the change event when a new file is selected.
   * @param {File | null} newFile - The newly selected file.
   */
  const handleFileChange = (newFile: File | null) => {
    if (newFile) {
      setFile(newFile);
      calculateHash(newFile);
    }
  };

  /**
   * Calculates the SHA2-256 hash of the selected file.
   * @param {File | null} newFile - The file to calculate the hash for.
   */
  const calculateHash = async (newFile: File | null) => {
    if (newFile) {
      const reader = new FileReader();
      reader.onload = async () => {
        const buffer = reader.result as ArrayBuffer;
        const data = new Uint8Array(buffer);
        const hash = await sha256.digest(data);
        const cid = CID.create(1, SHA_256_CODE, hash);
        onValueChange(cid.toString());
      };
      reader.readAsArrayBuffer(newFile);
    }
  };

  return (
    <div>
      {/* File input component */}
      <MuiFileInput
        placeholder="Insert a file"
        value={file}
        onChange={handleFileChange}
        hideSizeText
      />

      {data && (
        // Text field to display the calculated hash
        <TextField
          fullWidth
          id="hash"
          label="Hash sha2-256"
          multiline
          variant="outlined"
          sx={{ my: 1 }}
          value={data}
        />
      )}
    </div>
  );
}

export default FileUpload;
