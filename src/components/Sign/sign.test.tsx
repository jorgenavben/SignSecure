import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Sign from './sign';

describe('Sign component', () => {
  test('should sign the document when a wallet is connected', async () => {
    // Mock the useCardano hook
    jest.mock('@cardano-foundation/cardano-connect-with-wallet', () => ({
      useCardano: () => ({
        signMessage: jest.fn().mockImplementation((hash, callback) => {
          callback('mocked signature', 'mocked key');
        }),
        isConnected: true,
      }),
    }));

    // Render the Sign component
    render(<Sign />);

    // Enter a hash value
    const hashInput = screen.getByLabelText('Hash');
    fireEvent.change(hashInput, { target: { value: 'mocked hash' } });

    // Click the Sign button
    const signButton = screen.getByRole('button', { name: 'Sign' });
    fireEvent.click(signButton);

    // Wait for the signature and key fields to be visible
    await screen.findByLabelText('Signature');
    await screen.findByLabelText('Key');

    // Verify that the signature and key are displayed
    const signatureField = screen.getByLabelText('Signature');
    const keyField = screen.getByLabelText('Key');
    expect(signatureField).toHaveValue('mocked signature');
    expect(keyField).toHaveValue('mocked key');
  });
});
