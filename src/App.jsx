import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import "@coinbase/onchainkit/styles.css";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownFundLink,
  WalletDropdownLink,
  WalletDropdownDisconnect,
  useWalletContext,
  WalletProvider,
} from "@coinbase/onchainkit/wallet";
import Loader from "./components/loader";

import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
  useAddress,
} from "@coinbase/onchainkit/identity";
import { Providers } from "./providers";
import Logo from "./assets/logo.png";
import { createPublicClient, encodeFunctionData, http } from "viem";
import { useEffect, useState } from "react";
import { ABI } from "./abi";

import { liskSepolia } from "viem/chains"; // or your network

import {
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from "@coinbase/onchainkit/transaction";

const CA = "0x66b2a49Afb8C3c196388172fdE8c8041EA1144e7";

const title_max = 30;
const desc_max = 250;

const client = createPublicClient({
  chain: liskSepolia, // or your chain (e.g., mainnet, polygon, etc)
  transport: http(),
});

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalEth, setGoalEth] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { address } = useWalletContext();
  const [myCampaigns, setMyCampaigns] = useState([])

  async function getCampaign(id) {
    setLoading(true);
    try {
      const campaign = await client.readContract({
        abi: ABI,
        address: CA,
        functionName: "getCampaign",
        args: [id],
      });

      console.log("Campaign:", campaign);
      return campaign;
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  async function getAllCampaigns(creator) {
    setLoading(true);
    try {
      console.log(client);
      const campaigns = await client.readContract({
        abi: ABI,
        address: CA,
        functionName: "getAllCampaigns",
        args: [String(creator)],
      });
      console.log(campaigns)
      setMyCampaigns(campaigns)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (address) {
      getAllCampaigns(address);
    }
  }, [address]);

  useEffect(() => {
    if (!title || !description || !goalEth || !durationDays) setDisabled(true);
    else setDisabled(false);
  }, [title, description, goalEth, durationDays]);

  const goalWei = goalEth
    ? BigInt(Math.floor(Number(goalEth) * 1e18))
    : BigInt(0); // ETH to wei
  const durationSeconds = durationDays
    ? BigInt(Number(durationDays) * 86400)
    : BigInt(0); // Days to seconds

  console.log();

  const data = encodeFunctionData({
    abi: ABI,
    functionName: "launch",
    args: [
      goalWei,
      durationSeconds,
      title,
      description, // duration must be BigInt (if uint256)
    ],
  });

  

  return (
    <>
   
      {loading && <Loader />}
      <DonationPopup setLoading={setLoading} getCampaign={getCampaign} ABI={ABI} />
      <header className="z-[3] fixed top-0 right-0 left-0  flex items-center shadow-black border-b justify-between p-4 bg-white text-white">
        <img src={Logo} className="w-28" />

        <Wallet className="">
          <ConnectWallet>
            <Avatar className="h-6 w-6" />
            <Name />
          </ConnectWallet>
          <WalletDropdown>
            <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
              <Avatar />
              <Name />
              <Address />
              <EthBalance />
            </Identity>
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet>
      </header>
      <div className="w-full p-4 mt-24">
        <div className="flex flex-col gap-4">
          <section className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold text-black">Launch a Campaign</h2>
            <div className="flex flex-col gap-2 mt-2">
              <p>Title:</p>
              <input
                type="text"
                maxLength={30}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`Campaign Title (${title_max} characters max)`}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p>Description:</p>
              <textarea
                maxLength={250}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={`Campaign Description (${desc_max} characters max)`}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <p>Goal in ETH:</p>
              <input
                type="number"
                min="0"
                value={goalEth}
                onChange={(e) => setGoalEth(e.target.value)}
                placeholder="Goal (in ETH)"
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm">
                use this free eth to usd converter{" "}
                <a
                  href="https://www.coinbase.com/converter/eth/usd"
                  className="underline text-blue-600"
                  target="_blank"
                >
                  link
                </a>
              </span>
              <p className="mt-2">Duration in days:</p>
              <input
                type="number"
                min="0"
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                placeholder="Duration (in days)"
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Transaction
                chainId={4202}
                calls={[
                  {
                    to: CA,
                    data: data,
                    value: "0",
                  },
                ]}

                // className="disabled:bg-pink-400 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
              >
                <TransactionButton
                  disabled={disabled}
                  text={"Launch Campaign 🚀"}
                />
                <TransactionSponsor />
                <TransactionStatus>
                  <TransactionStatusLabel />
                  <TransactionStatusAction />
                </TransactionStatus>
              </Transaction>
            </div>
          </section>

          <section className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold text-black">My Crowdfunding</h2>
            {myCampaigns.length === 0 ? (
              <p className="text-black">No campaigns yet.</p>
            ) : (
              myCampaigns.map((campaign, index) => { 
                const call_data = encodeFunctionData({
                  abi: ABI,
                  functionName: 'claim',
                  args: [campaign.id], // <- depends on each item
                });
                const btnText = campaign.claimed ? "Claimed " : "Claim 🪙"
                return(
                <div
                  key={index}
                  className="border  p-4 rounded shadow flex flex-col gap-2"
                >
                  <h3 className="text-md font-bold text-black">
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {campaign.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-700">
                      Pledged: {Number(campaign.pledged) / 1e18} ETH
                    </p>
                    <p className="text-sm text-gray-700">
                      Goal: {Number(campaign.goal) / 1e18} ETH
                    </p>
                  </div>
                  <div className=" bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${  Number(campaign.pledged) >= 100 ? 100 :
                          (Number(campaign.pledged) / Number(campaign.goal)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Ends at:{" "}
                    {new Date(Number(campaign.endAt) * 1000).toLocaleString()}
                  </p>
                  <a
                    href={`https://crowdfunded.surge.sh?campaign=${campaign.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    Share your crowdfund link
                  </a>
                  <Transaction
                chainId={4202}
                calls={[
                  {
                    to: CA,
                    data: call_data,
                    value: "0",
                  },
                ]}

                // className="disabled:bg-pink-400 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
              >
                <TransactionButton
                  text={btnText}
                  
                  disabled={campaign.claimed || Number(campaign.pledged) < Number(campaign.goal)}
                />
                <TransactionSponsor />
                <TransactionStatus>
                  <TransactionStatusLabel />
                  <TransactionStatusAction />
                </TransactionStatus>
              </Transaction>
                </div>
              ) })
            )}
          </section>

          <section className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold text-black">Discover Campaigns</h2>
            <p className="text-black">No campaigns to discover yet.</p>
          </section>
        </div>
      </div>
      <footer>
        <div className="p-4 bg-gray-100 text-center text-sm text-gray-600">
          <p>Hosted on Lisk Sepolia Testnet</p>
          <p>Contract Address: {CA}</p>
        </div>
      </footer>
    </>
  );
}

// import { useSearchParams } from "react-router-dom"; // assuming react-router
// import { formatEther } from "viem"; // for formatting ETH

function DonationPopup({setLoading, getCampaign, ABI}) {
  const params = new URLSearchParams(window.location.search);
  const campaignId = params.get("campaign");
  const [amountEth, setAmountEth] = useState("");

  useEffect(()=> {
    console.log(String(Math.floor(Number(amountEth) * 1e18)))
  }, [amountEth])
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    if (campaignId) {
      async function fetchCampaign() {
        setLoading(true);
        try {
          const campaignData = await getCampaign(campaignId);
          setCampaign(campaignData);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
      fetchCampaign();
    }
  }, [campaignId]);

  if (!campaignId || !campaign) return null;

  const call_data = encodeFunctionData({
    abi: ABI,
    functionName: "pledge",
    args: [campaignId],
  });

  const btnText = campaign.claimed ? "Campaign has been Claimed" : "Pledge"

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[1]  flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-black">Donate</h2>
        <a href="/" className="text-blue-600 text-sm">close</a>
        </div>
        <h3 className="text-md font-bold text-gray-700 mt-2">
          {campaign.title}
        </h3>
        <p className="text-sm text-gray-600">
          {campaign.description.slice(0, 100)}...
        </p>
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-700">
            Pledged: {Number(campaign.pledged) / 1e18} ETH
          </p>
          <p className="text-sm text-gray-700">
            Goal: {Number(campaign.goal) / 1e18} ETH
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{
              width: `${  Number(campaign.pledged) >= 100 ? 100 :
                (Number(campaign.pledged) / Number(campaign.goal)) *
                100
              }%`,
            }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Ends at:{" "}
          {new Date(Number(campaign.endAt) * 1000).toLocaleString()}
        </p>
        <input
          type="number"
          min="0"
          value={amountEth}
          onChange={(e) => setAmountEth(e.target.value)}
          placeholder="Amount (in ETH)"
          className="border p-2 rounded w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Transaction
          chainId={4202}
          calls={[
            {
              to: CA,
              data: call_data,
              value: BigInt(Math.floor(Number(amountEth) * 1e18)),
            },
          ]}
        >
          <TransactionButton
          disabled={!amountEth || campaign.claimed}
            text={btnText}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          />
          <TransactionSponsor />
          <TransactionStatus>
            <TransactionStatusLabel />
            <TransactionStatusAction />
          </TransactionStatus>
        </Transaction>
      </div>
    </div>
  );
}

export default App;
