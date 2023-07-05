import React from "react";
import {
  ConnectWalletButton,
  useCardano,
  NetworkType,
} from "@cardano-foundation/cardano-connect-with-wallet";
import verifySignature from "../../hooks/useVerifySignature";

const Testing = () => {
  const {
    stakeAddress,
    isEnabled,
    isConnecting,
    isConnected,
    signMessage,
    enabledWallet,
    disconnect,
  } = useCardano();

  const handleSignMessage = (signature: string, key?: string) => {
    console.log("Signature:", signature);
    console.log("Key:", key);

    if (key) {
      console.log("Verified:", verifySignature(signature, key));
    }
  };

  const onStakeAddressClick = async (walletName: string) => {
    console.log(await signMessage("TESTING 12345er", handleSignMessage));
  };

  return (
    <ConnectWalletButton
      limitNetwork={NetworkType.TESTNET}
      onStakeAddressClick={(stakeAddress) => onStakeAddressClick(stakeAddress)}
    />
  );
};

export default Testing;
