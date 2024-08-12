require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    ubit: {
      url: "https://rpc.ubitscan.io/",
      accounts: [process.env.PRIVATE_KEY] 
    }
  },
  etherscan: {
  }
};
