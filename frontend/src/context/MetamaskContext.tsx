import {BigNumberish, JsonRpcSigner} from "ethers";
import {createContext} from "react";

type MetamaskContextType = {
    connectWithMetamask: () => Promise<void>;
    signer?: JsonRpcSigner;
    isLoading: boolean;
    isConnected: boolean;
    balance?: string;
    network?: string;
    chainId?: BigNumberish;
};

export const MetamaskContext = createContext<MetamaskContextType | undefined>(undefined);