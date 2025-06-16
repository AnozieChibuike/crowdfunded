# ð CrowdFunded

A decentralized and transparent crowdfunding platform powered by blockchain, enabling community-driven funding with enhanced security and verifiability.

---

## ð¯ Short Description

CrowdFunded addresses the traditional challenges of crowdfunding by leveraging blockchain technology to create a trustless, transparent, and globally accessible funding ecosystem. It allows users to launch and contribute to projects with full visibility into all transactions, ensuring accountability and reducing intermediary reliance. The platform's objective is to empower innovators and communities by providing a secure and verifiable on-chain funding mechanism.

---

## â¨ Features Overview

*   **Decentralized Crowdfunding:** Supports the full lifecycle of a crowdfunding campaign, including launching new projects, pledging funds, claiming collected funds by creators, and refunding contributions if campaign goals are not met.
*   **Robust Web3 Integration:** Seamlessly connects user wallets and facilitates secure interactions with smart contracts deployed on the Base blockchain, powered by `@coinbase/onchainkit`, `viem`, and `wagmi`.
*   **Real-time Market Data:** Integrates external APIs to display current Ethereum (ETH) prices against USD, providing contributors with real-time value context for their pledges.
*   **Intuitive Campaign Management:** Offers a user-friendly interface for creators to launch new campaigns, defining funding goals, campaign durations, descriptive titles, and detailed descriptions.
*   **Comprehensive Campaign Discovery:** Users can easily browse a list of all active crowdfunding campaigns or filter to view only the campaigns they have initiated.
*   **On-chain Transparency:** All campaign data, pledges, and transactions are immutably recorded on the blockchain, fostering a high degree of transparency and trust.
*   **Modern User Interface:** Built as a single-page application using React, with a clean, responsive design facilitated by Tailwind CSS.
*   **Enhanced User Experience:** Includes visual loading indicators to provide feedback during network operations and data fetching.

---

## ð ï¸ Installation Instructions

To set up and run the CrowdFunded application locally, follow these steps:

### Requirements

*   Node.js (or Bun.js for equivalent commands)
*   A compatible web3 wallet (e.g., Coinbase Wallet, MetaMask, Trust Wallet)

### Local Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/AnozieChibuike/crowdfunded.git
    cd crowdfunded
    ```

2.  **Install project dependencies:**

    ```bash
    npm install
    # Alternatively, if you use Bun:
    # bun install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory of the project and add your OnchainKit API key. This key is essential for certain wallet and identity functionalities provided by Coinbase OnchainKit.

    ```
    VITE_PUBLIC_ONCHAINKIT_API_KEY=YOUR_CLIENT_API_KEY
    ```
    *Replace `YOUR_CLIENT_API_KEY` with your actual API key.*

4.  **Start the development server:**

    ```bash
    npm run dev
    # Alternatively, if you use Bun:
    # bun run dev
    ```
    The application will typically be accessible in your web browser at `http://localhost:5173` (or a similar port displayed in your terminal).

---

## ð Usage Examples

Once the application is running and your wallet is connected, you can perform the following actions:

1.  **Connect Your Wallet:**
    *   Click the "Connect Wallet" button located in the header of the application.
    *   Follow the prompts from your chosen wallet provider (e.g., Coinbase Wallet) to establish a connection. Your connected wallet address and associated identity (like an ENS name, if available) will be displayed.

2.  **Launch a New Campaign:**
    *   Ensure your web3 wallet is connected to the application.
    *   Navigate to the section for creating a new campaign.
    *   Input the required campaign details:
        *   **Title:** A brief and engaging name for your project (limited to 30 characters).
        *   **Description:** A comprehensive explanation of your campaign's purpose and goals (limited to 250 characters).
        *   **Goal (ETH):** The total amount of Ethereum you aim to raise for your project.
        *   **Duration (Days):** The number of days your campaign will remain active for contributions.
    *   Click the "Launch Campaign" button. Your connected wallet will then prompt you to sign and confirm the transaction on the Base network to deploy your campaign.

3.  **Pledge to an Existing Campaign:**
    *   Browse through the list of active campaigns displayed on the platform.
    *   Select a campaign you wish to support.
    *   Enter the desired amount of ETH you want to contribute to the campaign.
    *   Confirm the transaction through your connected wallet. Your pledge will be recorded on-chain.

4.  **Manage and Interact with Campaigns:**
    *   **Viewing Your Campaigns:** Access a dedicated section that lists all campaigns you have created, allowing you to monitor their progress, pledges received, and remaining time.
    *   **Claiming Funds:** If your launched campaign successfully meets its funding goal and the campaign duration concludes, you will be able to initiate a transaction to claim the pledged funds.
    *   **Refunding Pledges:** For campaigns that do not reach their funding goal within the set duration, contributors will have the option to retrieve their pledged funds through a refund transaction.

---

## ð File Structure Summary

```
.
âââ public/                     # Static assets accessible directly (e.g., application logo)
â   âââ logo.png
âââ src/                        # Core application source code
â   âââ App.jsx                 # Main React component, orchestrating application logic and UI
â   âââ App.css                 # Specific styles for the main App component
â   âââ main.jsx                # React application entry point and root rendering
â   âââ index.css               # Global CSS styles, including Tailwind CSS directives
â   âââ abi.js                  # Frontend-specific ABI (Application Binary Interface) for the smart contract
â   âââ providers.jsx           # React context providers, setting up OnchainKit and Wallet contexts
â   âââ assets/                 # Contains various static assets like logos (e.g., React, Vite)
â   â   âââ react.svg
â   â   âââ vite.svg
â   âââ components/             # Reusable React UI components
â       âââ loader.jsx          # Component for displaying a loading animation
â       âââ loader.css          # Styles for the loading animation component
â       âââ DonationPopup.jsx (implied) # A component likely used for handling donation interactions
âââ contracts/                  # Files related to the smart contract
â   âââ abi.json                # Comprehensive ABI for the deployed smart contract
â   âââ ca.txt                  # Text file containing the deployed smart contract address
âââ .env                        # Environment variable configuration file (e.g., API keys)
âââ .gitignore                  # Specifies intentionally untracked files to ignore by Git
âââ package.json                # Project metadata, dependencies, and scripts
âââ postcss.config.js           # Configuration for PostCSS, used by Tailwind CSS
âââ tailwind.config.js          # Tailwind CSS configuration file
âââ vite.config.js              # Configuration for Vite, the build tool
âââ eslint.config.js            # ESLint configuration for code linting
âââ postbuild.ts                # TypeScript script for post-build operations (e.g., for Surge deployment)
âââ README.md                   # This professional README file
```

---

## ð Important Notes

*   **Smart Contract Deployment:** This application is designed to interact with a specific smart contract already deployed on the **Base** network. The contract address is hardcoded in `src/App.jsx` and also noted in `contracts/ca.txt`.
*   **OnchainKit API Key:** It is crucial to obtain a `VITE_PUBLIC_ONCHAINKIT_API_KEY` from Coinbase OnchainKit and configure it in your local `.env` file for the application's Web3 functionalities to work correctly.
*   **Deployment Strategy:** The project includes a `deploy` script (`bun run deploy`) that leverages **Surge** for static site hosting. The `postbuild.ts` script ensures compatibility with single-page application routing on Surge by copying `index.html` to `200.html`.
*   **Contract ABI Versions:** The project uses two ABI files: `src/abi.js` which likely contains a curated subset of the ABI for common frontend interactions, and `contracts/abi.json` which should contain the full, comprehensive ABI of the deployed smart contract.

** Auto Generated by DEVMATE