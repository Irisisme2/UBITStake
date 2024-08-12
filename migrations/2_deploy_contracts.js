const MyToken = artifacts.require("MyToken");

module.exports = async function(deployer) {
  const initialSupply = web3.utils.toWei('1000000', 'ether'); // 1 milion tokenów
  await deployer.deploy(MyToken, initialSupply);
};
