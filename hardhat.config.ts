import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "bsc",
  networks: {
    bsc: {
      chainId: parseInt(process.env.BNB_CHAIN_ID || ''),
      url: process.env.BNB_RPC_URL,
      accounts: [process.env.PRIVATE_KEY || ''],
    },
    metis: {
      chainId: parseInt(process.env.METIS_CHAIN_ID || ''),
      url: process.env.METIS_RPC_URL,
      accounts: [process.env.PRIVATE_KEY || ''],
    },
  },
};

export default config;
