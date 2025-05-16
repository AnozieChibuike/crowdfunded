import React from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base } from "wagmi/chains"; // add baseSepolia for testing

export function Providers(props) {
  return (
    <OnchainKitProvider
      // apiKey={import.meta.env.VITE_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          name: "CrowdFunded", // Displayed in modal header
          logo: "https://bafkreidehnlzmladcyjrj4iphy73kw52d5a4u2ovot7lakv3t3t7edrxs4.ipfs.w3s.link", // Displayed in modal header
          mode: "light", // 'light' | 'dark' | 'auto'
          theme: "base", // 'default' or custom theme
        },
        wallet: {
          display: "modal",
          termsUrl: "https://...",
          privacyUrl: "https://...",
          supportedWallets: {
            trust: true,
          },
        },
      }} 
    >
      {props.children}
    </OnchainKitProvider>
  );
}
