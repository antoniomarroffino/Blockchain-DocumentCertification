import { ethers } from 'hardhat';
import {SimpleContract__factory} from "../typechain-types";


const deploy = async () =>{

    const signer = (await ethers.getSigners())[0];

    const newSimpleContractDeployTx = await new SimpleContract__factory(signer).deploy(8);

    console.log(`SimpleContract deployed at ${await newSimpleContractDeployTx.getAddress()}`);

}

deploy();