import {ethers} from 'hardhat';
import {SimpleContract__factory} from "../typechain-types";

const setValue = async (contractAddress: string) => {

    const simpleContract = SimpleContract__factory.connect(contractAddress, ethers.provider);

    const value = await simpleContract.setValue(11);

    console.log(`The value of the contract is ${value}`);
}

setValue('0x5FbDB2315678afecb367f032d93F642f64180aa3');