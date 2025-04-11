import {JsonRpcSigner} from "ethers";
import {createContext} from "react";

type MetamaskContextType = {
    connectWithMetamask: () => Promise<void>,
    signer: JsonRpcSigner | undefined,
}

export const MetamaskContext = createContext<MetamaskContextType | undefined>(undefined);