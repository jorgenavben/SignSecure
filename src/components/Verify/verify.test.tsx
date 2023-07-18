import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Verify from "./verify";

// Mock the multiformats package
jest.mock("multiformats/hashes/sha2", () => ({
    sha256: jest.fn((data: any) => {
      // Provide a custom implementation for sha256 based on your test case requirements
      // Return a mock result that matches your scenario
      return {
        digest: () => "mockDigest",
      };
    }),
  }));

// Mock the cardano-verify-datasignature module
jest.mock("@cardano-foundation/cardano-verify-datasignature", () => ({
  __esModule: true,
  default: jest.fn((signature: string, key: string, message?: string) => {
    // Provide a custom implementation for verifySignature
    // based on your test case requirements
    return true; // or false based on your scenario
  }),
}));

describe("Verify component", () => {
  test("renders Verify component", () => {
    render(<Verify />);
    
    // Verify that the Verify component is rendered
    const verifyElement = screen.getByText("Verify");
    expect(verifyElement).toBeInTheDocument();
  });

  test("displays success message when verification is successful", () => {
    render(<Verify />);
    
    // Fill in the input fields
    const signatureInput = screen.getByLabelText("Signature");
    const keyInput = screen.getByLabelText("Key");
    fireEvent.change(signatureInput, { target: { value: "validSignature" } });
    fireEvent.change(keyInput, { target: { value: "validKey" } });

    // Click the Verify button
    const verifyButton = screen.getByText("Verify");
    fireEvent.click(verifyButton);

    // Verify that the success message is displayed
    const successMessage = screen.getByText("Sucessfully verified");
    expect(successMessage).toBeInTheDocument();
  });

  test("displays error message when verification is unsuccessful", () => {
    render(<Verify />);
    
    // Fill in the input fields
    const signatureInput = screen.getByLabelText("Signature");
    const keyInput = screen.getByLabelText("Key");
    fireEvent.change(signatureInput, { target: { value: "invalidSignature" } });
    fireEvent.change(keyInput, { target: { value: "invalidKey" } });

    // Click the Verify button
    const verifyButton = screen.getByText("Verify");
    fireEvent.click(verifyButton);

    // Verify that the error message is displayed
    const errorMessage = screen.getByText("It was not possible to verify the information");
    expect(errorMessage).toBeInTheDocument();
  });
});
