import {useContext} from "react";
import {MetamaskContext} from "../context/MetamaskContext.tsx";

export const useMetamask = () => {
    const context = useContext(MetamaskContext);
    if (context === undefined) {
        throw new Error("useMetamask must be used within a MetamaskProvider");
    }
    return context;
};