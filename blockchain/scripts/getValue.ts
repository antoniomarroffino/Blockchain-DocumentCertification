import {ethers} from 'hardhat';
import {SimpleContract__factory} from "../typechain-types";

const getValue = async (contractAddress: string) => {

    const simpleContract = SimpleContract__factory.connect(contractAddress, ethers.provider);

    const value = await simpleContract.getValue();

    console.log(`The value of the contract is ${value}`);
}

getValue('0x5FbDB2315678afecb367f032d93F642f64180aa3');