import { render, screen, fireEvent } from "@testing-library/react";
import FileUpload from "./fileUpload";

describe("FileUpload component", () => {
  test("should calculate and display the hash when a file is selected", async () => {
    const mockHash = "mockHash";

    // Mock the sha256.digest function
    jest.mock("multiformats/hashes/sha2", () => ({
      sha256: {
        digest: jest.fn(() => Promise.resolve(mockHash)),
      },
    }));

    // Mock the CID.create function
    jest.mock("multiformats/cid", () => ({
      CID: {
        create: jest.fn((_, __, hash) => ({
          toString: () => hash,
        })),
      },
    }));

    const onValueChangeMock = jest.fn();

    render(<FileUpload data="" onValueChange={onValueChangeMock} />);

    const fileInput = screen.getByLabelText("Insert a file");
    const testFile = new File(["test file content"], "test.txt", {
      type: "text/plain",
    });

    fireEvent.change(fileInput, { target: { files: [testFile] } });

    // Wait for the hash calculation to complete
    await screen.findByLabelText("Hash sha2-256");

    expect(onValueChangeMock).toHaveBeenCalledWith(mockHash);
    expect(screen.getByDisplayValue(mockHash)).toBeInTheDocument();
  });
});
