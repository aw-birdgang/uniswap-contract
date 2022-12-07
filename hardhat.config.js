/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");

const {
  INFURA_KEY,
  DEPLOYER_PRIVATE_KEY,
  ETHERSCAN_KEY_GOERLI,
  POLYGON_KEY_MUMBAI
} = process.env

// require("@nomicfoundation/hardhat-toolbox");
// const fs = require("fs");
// const privateKey = fs.readFileSync(".secret").toString();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`]
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`]
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`]
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
      {
        version: "0.4.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
    ],
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_KEY_GOERLI,
      // polygon
      polygon: POLYGON_KEY_MUMBAI,
      // mumbai: POLYGON_KEY_MUMBAI,
      polygonMumbai: POLYGON_KEY_MUMBAI,
      // gpex: POLYGON_KEY_MUMBAI
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  abiExporter: {
    path: "./data/abi",
    clear: true,
    flat: false,
  },
};
