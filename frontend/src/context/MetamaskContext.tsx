import {JsonRpcSigner} from "ethers";
import {createContext} from "react";

type MetamaskContextType = {
    connectWithMetamask: () => Promise<void>,
    signer: JsonRpcSigner | undefined,
    isLoading: boolean,
    isConnected: boolean,
}

export const MetamaskContext = createContext<MetamaskContextType | undefined>(undefined);