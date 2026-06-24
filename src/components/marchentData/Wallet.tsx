"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function Wallet() {
  const { address, isConnected } = useAccount();

  return (
    <div className="space-y-4 h-screen w-full flex justify-center items-center">
      <ConnectButton />

      {isConnected && (
        <div>
          <p>Wallet Connected</p>
          <p>Address: {address}</p>
        </div>
      )}
    </div>
  );
}
