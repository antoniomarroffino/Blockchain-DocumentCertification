import { ethers } from 'hardhat';
import {DocumentCertification__factory, SimpleContract__factory} from "../typechain-types";


const deploy = async () =>{

    const signer = (await ethers.getSigners())[0];

    const newDocumentCertificationDeployTx = await new DocumentCertification__factory(signer).deploy();

    console.log(`Document Certification deployed at ${await newDocumentCertificationDeployTx.getAddress()}`);

}

deploy();