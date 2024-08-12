async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(1000000); // Przykładowa liczba dla initialSupply
    await myToken.deployed();

    console.log("MyToken deployed to:", myToken.address);

    const StakingContract = await ethers.getContractFactory("StakingContract");
    const stakingContract = await StakingContract.deploy(myToken.address);
    await stakingContract.deployed();

    console.log("StakingContract deployed to:", stakingContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
