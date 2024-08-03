const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = "various plate lecture ocean odor hat load require episode lens struggle defy";
const rpcUrl = "https://rpc.ubitscan.io/";

module.exports = {
  networks: {
    ubitMainnet: {
      provider: () => new HDWalletProvider(mnemonic, rpcUrl),
      network_id: 90002,      
      gas: 4500000,
      gasPrice: 1500000700,  
      confirmations: 2,        
      timeoutBlocks: 200,     
      skipDryRun: true        
    },
  },
  compilers: {
    solc: {
      version: "0.8.20",   
    },
  },
};
