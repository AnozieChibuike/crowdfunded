# 🚀 CrowdFunded

A decentralized crowdfunding platform built on the blockchain, designed to provide a transparent, secure, and globally accessible way to fund innovative projects. Leveraging Web3 technologies, CrowdFunded ensures that all contributions and project details are immutable and verifiable on-chain, fostering a trustless environment for both creators and backers.

---

## 💡 Features

*   **Decentralized Campaign Management**: Launch, pledge to, claim from, refund, and unpledge from campaigns directly on the blockchain.
*   **Secure Web3 Wallet Integration**: Seamlessly connect and interact with the platform using popular Web3 wallets, powered by Coinbase OnchainKit for identity display (avatar, name, address) and secure transaction handling.
*   **Real-time ETH Price Conversion**: View Ether values converted to USD, providing clarity on donation amounts.
*   **Transparent Transactions**: All financial interactions (pledges, claims, refunds) are recorded on the blockchain, ensuring full transparency and accountability.
*   **User-Friendly Interface**: An intuitive and responsive design built with React and styled using Tailwind CSS, ensuring a smooth experience across devices.
*   **Active Campaign Display**: Easily browse all active crowdfunding campaigns, including details like goals, progress, and creators.
*   **Personalized Campaign Overview**: Connected users can view and manage campaigns they have created.

---

## 🛠️ Tech Stack

*   **Frontend**: React
*   **Web3 Integration**:
    *   `@coinbase/onchainkit`: For wallet connection, identity display, and transaction management.
    *   `viem`: Ethereum JavaScript interface for interacting with smart contracts and chains.
    *   `wagmi`: React Hooks for Ethereum.
*   **Styling**: Tailwind CSS, PostCSS, Autoprefixer
*   **Build Tool**: Vite
*   **Testing**: Jest, MSW (Mock Service Worker) for API mocking
*   **Blockchain**: Primarily targeting the Base network.
*   **Smart Contracts**: Solidity (contracts' ABI provided for frontend interaction)

---

## ⚙️ Installation

To get a local copy of this project up and running, follow these steps:

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (or Yarn/Bun, though `npm` is used in scripts)

### Local Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/AnozieChibuike/crowdfunded.git
    cd crowdfunded
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and add your Coinbase OnchainKit API key:
    ```
    VITE_PUBLIC_ONCHAINKIT_API_KEY=YOUR_CLIENT_API_KEY
    ```
    (Replace `YOUR_CLIENT_API_KEY` with your actual key.)

4.  **Start the development server**:
    ```bash
    npm run dev
    ```
    The application will typically be accessible at `http://localhost:5173`.

---

## 🚀 Usage Examples

Once the application is running and your Web3 wallet is connected, you can:

1.  **Connect Your Wallet**: Click the "Connect Wallet" button in the header to link your Ethereum-compatible wallet. Your address, avatar, and name will be displayed.
2.  **Launch a Campaign**:
    *   Navigate to the campaign creation section (implied by the UI elements for title, description, goal, duration).
    *   Enter a **Title** for your project.
    *   Provide a **Description** outlining your campaign's purpose.
    *   Specify your **Goal** in Ether (ETH).
    *   Set the **Duration** of your campaign in days.
    *   Confirm the transaction through your connected wallet to launch your campaign on the blockchain.
3.  **View Campaigns**: Browse the list of active campaigns on the main page. Each campaign displays its goal, current progress, and remaining time.
4.  **Pledge to a Campaign**:
    *   Select a campaign you wish to support.
    *   Enter the amount of ETH you wish to pledge.
    *   Confirm the transaction via your wallet. Your contribution will be recorded on-chain.
5.  **Manage Your Campaigns**: If you are a campaign creator and connected with the creator's wallet, you can view the status of your launched campaigns and potentially claim pledged funds once the goal is met and the campaign period ends.
6.  **Unpledge/Refund**: Functionality exists (as per ABI) to unpledge or request a refund for pledges under specific conditions of the smart contract.

---

## 📂 File Structure Summary

The project is structured to separate concerns and facilitate maintainability:

```
├── public/                 # Public assets (e.g., logo.png, vite.svg)
├── src/                    # Main application source code
│   ├── assets/             # Images and static files
│   ├── components/         # Reusable React components (e.g., Loader, DonationPopup)
│   ├── mocks/              # Mock Service Worker setup for API testing
│   ├── __tests__/          # Unit and integration tests
│   ├── __mocks__/          # Manual mocks for external libraries (e.g., viem)
│   ├── abi.js              # JavaScript representation of the smart contract ABI
│   ├── App.css             # Main application-level CSS
│   ├── App.jsx             # Core application component, handles main logic and routes
│   ├── index.css           # Global CSS, including Tailwind directives
│   ├── main.jsx            # Entry point for the React application
│   └── providers.jsx       # Context providers for OnchainKit and Wagmi
├── contracts/              # Smart contract related files
│   ├── abi.json            # Another representation of the smart contract ABI
│   └── ca.txt              # Deployed smart contract address
├── .env                    # Environment variables
├── .gitignore              # Specifies intentionally untracked files to ignore
├── eslint.config.js        # ESLint configuration for code quality
├── jest.config.js          # Jest test runner configuration
├── package.json            # Project metadata and dependencies
├── postbuild.ts            # Post-build script (e.g., for static hosting like Surge)
├── postcss.config.js       # PostCSS configuration for CSS processing
├── README.md               # This README file
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite build tool configuration
```

---

## 📝 Important Notes

*   **Target Network**: The application is configured to interact primarily with the **Base** blockchain network. Ensure your connected wallet is set to this network for optimal functionality.
*   **Coinbase OnchainKit API Key**: An API key from Coinbase OnchainKit is required for certain features to function correctly. Make sure to set `VITE_PUBLIC_ONCHAINKIT_API_KEY` in your `.env` file.
*   **Smart Contract Address**: The deployed smart contract address is hardcoded within `src/App.jsx` and can also be found in `contracts/ca.txt`.
*   **Testing**: The project includes a robust testing suite utilizing Jest for unit and integration tests, along with MSW (Mock Service Worker) for mocking external API calls (e.g., CoinGecko for ETH price).
*   **Deployment**: A `postbuild.ts` script is included, designed to assist with static site deployments (specifically for platforms like Surge) by copying `index.html` to `200.html`.