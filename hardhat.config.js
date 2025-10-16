require("@nomicfoundation/hardhat-toolbox");
require("dotenv/config");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "cancun",
    },
  },
  networks: {
    // Local Hardhat network (supports Mock FHE)
    hardhat: {
      chainId: 31337,
      accounts: {
        count: 10,
        accountsBalance: "10000000000000000000000", // 10000 ETH
      },
    },
    // Local development network
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    // Sepolia testnet - Use MetaMask for deployment
    // To deploy: npx hardhat run scripts/deploy.js --network sepolia
    // Make sure MetaMask is connected and has sufficient ETH
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      chainId: 11155111,
      // Note: Do not configure accounts here
      // Use MetaMask for all transactions
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "",
  },
};
