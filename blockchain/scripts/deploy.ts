import {ethers, upgrades} from "hardhat";
import {DocumentCertification__factory} from "../typechain-types";


const deploy = async () =>{
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Deploying upgradeable proxy...");
    const factory = new DocumentCertification__factory(deployer);

    const proxy = await upgrades.deployProxy(factory, []);
    await proxy.waitForDeployment();


    console.log("Contract deployed at address:", await proxy.getAddress());
}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });