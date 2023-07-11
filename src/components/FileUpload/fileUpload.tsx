import { TextField } from "@mui/material";
import React, { useState } from "react";
import { MuiFileInput } from "mui-file-input";
import { sha256 } from "multiformats/hashes/sha2";
import { CID } from "multiformats/cid";

interface FileUploaderProps {
  data: string;
  onValueChange: (hash: string) => void;
}

function FileUpload({ data, onValueChange }: FileUploaderProps) {
  const SHA_256_CODE = 0x12;
  
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
        const hash = await sha256.digest(data);
        const cid = CID.create(1, SHA_256_CODE, hash);
        onValueChange(cid.toString());
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
