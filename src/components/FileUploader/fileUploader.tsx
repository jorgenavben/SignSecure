import React, { ChangeEvent, useState } from "react";

interface FileUploaderProps {
  onValueChange: (hash: string) => void;
}

function FileUploader({ onValueChange }: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const calculateHash = async () => {
    if (selectedFile) {
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
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
      />
      <button onClick={calculateHash}>Calculate Hash</button>
    </div>
  );
}

export default FileUploader;
