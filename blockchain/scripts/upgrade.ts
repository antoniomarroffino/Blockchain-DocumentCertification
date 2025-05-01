import {ethers, upgrades} from "hardhat";
import {DocumentCertification__factory} from "../typechain-types";

require("dotenv").config();

const upgrade = async () => {
    const proxyAddress = process.env.PROXY_ADDRESS!;
    console.log("Upgrading proxy at", proxyAddress);

    const [deployer] = await ethers.getSigners();
    console.log("Upgrading as:", deployer.address);

    const factoryV2 = new DocumentCertification__factory(deployer);
    const upgraded = await upgrades.upgradeProxy(proxyAddress, factoryV2);

    console.log("Upgrade complete, proxy still at:", await upgraded.getAddress());
}

upgrade()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });