import { HardhatUserConfig } from "hardhat/config";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-toolbox";

require('@openzeppelin/hardhat-upgrades');
require("solidity-coverage");
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY!],
      chainId: 11155111,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY!],
      gasPrice: "auto"
    }
  },
  sourcify: {
    enabled: true
  }
};

export default config;
