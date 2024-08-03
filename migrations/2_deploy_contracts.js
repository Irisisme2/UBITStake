const UBITToken = artifacts.require("UBITToken");
const StakingContract = artifacts.require("StakingContract");

module.exports = async function(deployer) {
  const initialSupply = web3.utils.toWei('1000000', 'ether'); // 1 million tokens
  await deployer.deploy(UBITToken, initialSupply);
  const ubitTokenInstance = await UBITToken.deployed();
  
  await deployer.deploy(StakingContract, ubitTokenInstance.address);
};
