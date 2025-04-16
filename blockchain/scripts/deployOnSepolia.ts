import { ethers } from 'hardhat';
import {DocumentCertification__factory} from "../typechain-types";


const deploy = async () =>{
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Deploying DocumentCertification contract...");
    const contract = await new DocumentCertification__factory(deployer).deploy();

    console.log("Contract deployed at address:", await contract.getAddress());
}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });