'use client'
import {MetamaskContext} from "../context/MetamaskContext.tsx";
import React, {useState} from "react";
import {ethers, JsonRpcSigner} from "ethers";
import Window from "../../globals"


export const MetamaskProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);

    const connectWallet = async () => {
        if(window.ethereum?.isMetaMask) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            setSigner(signer);
        }
    }

    const value = {
        connectWithMetamask: connectWallet,
        signer,
    }

    return (
        <MetamaskContext.Provider value={value}>
            {children}
        </MetamaskContext.Provider>
    );
}