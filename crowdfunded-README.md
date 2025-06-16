# 🚀 CrowdFunded

A decentralized crowdfunding platform built on the blockchain, designed to provide a transparent, secure, and globally accessible way to fund innovative projects. Leveraging Web3 technologies, CrowdFunded ensures that all contributions and project details are immutable and verifiable on-chain, fostering a trustless environment for both creators and backers.

---

## 🛠️ Tech Stack

This project is built using modern web and blockchain technologies:

*   **Frontend**: React
*   **Web3 Integration**:
    *   `@coinbase/onchainkit`: Comprehensive suite for wallet connection, identity display (avatar, ENS name, address), and simplified transaction management.
    *   `viem`: A lightweight, robust Ethereum JavaScript interface for interacting with smart contracts and blockchain networks.
    *   `wagmi`: React Hooks for Ethereum, providing essential utilities for blockchain interactions.
*   **Styling**: Tailwind CSS, PostCSS, Autoprefixer for efficient and responsive UI development.
*   **Build Tool**: Vite, for a fast and optimized development experience.
*   **Testing**: Jest for unit and integration testing, complemented by MSW (Mock Service Worker) for reliable API mocking.
*   **Blockchain Network**: Primarily targeting the Base network.
*   **Smart Contracts**: Solidity (the contract's Application Binary Interface - ABI is included for frontend interaction).

---

## ✨ Features Overview

CrowdFunded offers a robust set of functionalities for a seamless decentralized crowdfunding experience:

*   **Decentralized Campaign Management**: Users can launch new crowdfunding campaigns, pledge funds to existing ones, and manage campaign lifecycle events such as claiming funds or requesting refunds (under defined smart contract conditions).
*   **Secure Web3 Wallet Integration**: Seamlessly connect and interact with the platform using popular Ethereum-compatible Web3 wallets. The integration provides real-time identity display including user avatars, ENS names, and blockchain addresses.
*   **Real-time ETH Price Conversion**: Provides clarity on donation amounts by displaying Ether (ETH) values converted to USD, fetching live prices from CoinGecko.
*   **Transparent Transactions**: All financial interactions, including pledges, claims, and refunds, are recorded immutably on the blockchain, ensuring full transparency and accountability for all participants.
*   **User-Friendly Interface**: An intuitive and responsive design, built with React and styled using Tailwind CSS, ensuring a smooth and accessible experience across various devices.
*   **Active Campaign Display**: Easily browse and discover all active crowdfunding campaigns, complete with essential details like funding goals, current progress, and remaining time.
*   **Personalized Campaign Overview**: Connected users can view and manage the specific campaigns they have created, tracking their progress and interacting with their own projects.

---

## ⚙️ Installation

To set up and run this project locally, follow these instructions:

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (Node Package Manager) or Bun

### Local Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/AnozieChibuike/crowdfunded.git
    cd crowdfunded
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    # or using Bun
    # bun install
    ```
3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory of the project and add your Coinbase OnchainKit API key:
    ```
    VITE_PUBLIC_ONCHAINKIT_API_KEY=YOUR_CLIENT_API_KEY
    ```
    _Replace `YOUR_CLIENT_API_KEY` with your actual API key._

4.  **Start the development server**:
    ```bash
    npm run dev
    # or using Bun
    # bun run dev
    ```
    The application will typically become accessible in your web browser at `http://localhost:5173`.

---

## 🚀 Usage Examples

Once the application is running and your Web3 wallet is connected, you can interact with the platform as follows:

1.  **Connect Your Wallet**: Click the "Connect Wallet" button located in the header. Choose your preferred Ethereum-compatible wallet to link it to the application. Upon successful connection, your blockchain address, avatar, and ENS name (if available) will be displayed.
2.  **Launch a Campaign**:
    *   Navigate to the campaign creation section (typically a form on the main page or a dedicated "Launch Campaign" section).
    *   Fill in the required details: a concise **Title**, a comprehensive **Description** of your project, your funding **Goal** in Ether (ETH), and the **Duration** of your campaign in days.
    *   Submit the form. Your connected wallet will prompt you to confirm a transaction to deploy your campaign onto the blockchain.
3.  **View Campaigns**: Browse through the main interface to see a list of all active crowdfunding campaigns. Each campaign card will display its title, description, funding goal, current amount pledged, and the time remaining until its deadline.
4.  **Pledge to a Campaign**:
    *   Select a campaign from the list that you wish to support.
    *   Specify the amount of ETH you wish to pledge towards its goal.
    *   Confirm the transaction via your connected wallet. Your contribution will be immutably recorded on-chain, contributing to the campaign's progress.
5.  **Manage Your Campaigns**: If you are a campaign creator and connected with the wallet address that launched the campaign, you can view detailed statistics and the current status of your launched projects. If your campaign meets its goal and the duration ends, you may be able to claim the pledged funds.
6.  **Unpledge / Refund**: The platform supports functionalities, as defined by the underlying smart contract, for backers to unpledge funds or request a refund under specific conditions (e.g., campaign failure to meet its goal, or if the smart contract allows early unpledging).

---

## 📂 File Structure Summary

The project follows a modular structure to ensure maintainability and clear separation of concerns:

```
├── public/                 # Static assets like the project logo and other images.
├── src/                    # Contains the core application source code.
│   ├── assets/             # Images and static files used within components.
│   ├── components/         # Reusable React UI components (e.g., Loader, DonationPopup).
│   ├── mocks/              # Mock Service Worker setup for API testing and handlers.
│   ├── __tests__/          # Unit and integration tests for application logic and APIs.
│   ├── __mocks__/          # Manual mock implementations for external libraries like `viem`.
│   ├── abi.js              # JavaScript representation of the smart contract ABI for client-side interaction.
│   ├── App.css             # Main application-level CSS styles.
│   ├── App.jsx             # The root React component, handling primary application logic, state, and blockchain interactions.
│   ├── index.css           # Global CSS styles, including Tailwind CSS base, components, and utilities directives.
│   ├── main.jsx            # The entry point for the React application, rendering the root component.
│   └── providers.jsx       # Centralized context providers for OnchainKit and Wagmi, configuring Web3 integrations.
├── contracts/              # Smart contract related files.
│   ├── abi.json            # Another representation of the smart contract ABI.
│   └── ca.txt              # Text file storing the deployed smart contract address.
├── .env                    # Environment variables for configuration (e.g., API keys).
├── .gitignore              # Specifies files and directories to be ignored by Git.
├── eslint.config.js        # ESLint configuration for maintaining code quality and consistency.
├── jest.config.js          # Jest test runner configuration.
├── package.json            # Project metadata, scripts, and dependency definitions.
├── postbuild.ts            # A TypeScript script executed after the build, used for deployment-specific tasks (e.g., copying `index.html` for static hosting).
├── postcss.config.js       # PostCSS configuration, primarily for Tailwind CSS and Autoprefixer.
├── README.md               # This project's comprehensive README file.
├── tailwind.config.js      # Tailwind CSS configuration file, defining themes and content paths.
└── vite.config.js          # Vite build tool configuration file.
```

---

## 📝 Important Notes

*   **Target Network**: The application is specifically configured to interact with the **Base** blockchain network. For proper functionality, ensure your connected Web3 wallet is set to the Base network.
*   **Coinbase OnchainKit API Key**: An API key from Coinbase OnchainKit is essential for certain features, particularly for enhanced identity display and wallet functionalities. Please ensure you've configured the `VITE_PUBLIC_ONCHAINKIT_API_KEY` in your `.env` file as described in the Installation section.
*   **Smart Contract Address**: The deployed smart contract address is configured within the application's source code (e.g., `src/App.jsx`) and is also available in `contracts/ca.txt`.
*   **Testing Suite**: The project includes a robust testing suite leveraging Jest for both unit and integration tests. Mock Service Worker (MSW) is utilized to mock external API calls, such as fetching ETH prices, ensuring reliable and isolated test environments.
*   **Deployment**: A `postbuild.ts` script is included in the project, designed to facilitate static site deployments. Specifically, it copies `dist/index.html` to `dist/200.html`, which is a common requirement for platforms like Surge to handle single-page application routing correctly.