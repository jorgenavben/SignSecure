import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { MuiFileInput } from "mui-file-input";

interface FileUploaderProps {
  data: string;
  onValueChange: (hash: string) => void;
}

function FileUpload({ data, onValueChange }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (newFile: File | null) => {
    if (newFile) {
      setFile(newFile);
      calculateHash(newFile);
    }
  };

  const calculateHash = async (newFile: File | null) => {
    if (newFile) {
      const reader = new FileReader();
      reader.onload = async () => {
        const buffer = reader.result as ArrayBuffer;
        const data = new Uint8Array(buffer);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("");
        onValueChange(hashHex);
      };
      reader.readAsArrayBuffer(newFile);
    }
  };

  return (
    <div>
      <MuiFileInput
        placeholder="Insert a file"
        value={file}
        onChange={handleFileChange}
        hideSizeText
      />

      {data && (
        <TextField
          fullWidth
          id="hash"
          label="Hash"
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
