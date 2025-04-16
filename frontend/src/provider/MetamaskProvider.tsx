'use client'
import {MetamaskContext} from "../context/MetamaskContext.tsx";
import React, {useCallback, useEffect, useState} from "react";
import {ethers, JsonRpcSigner} from "ethers";
import {MetaMaskInpageProvider} from "@metamask/providers";


declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider;
    }
}

export const MetamaskProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!window.ethereum || !window.ethereum.isMetaMask) {
            setIsLoading(false);
            return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);

        const checkConnection = async () => {
            try {
                const accounts = await provider.listAccounts();
                if (accounts.length > 0) {
                    const currentSigner = await provider.getSigner();
                    setSigner(currentSigner);
                }
            } catch (error) {
                console.error("Error checking connection:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const handleAccountsChanged = async (accounts: string[]) => {
            if (accounts.length > 0) {
                const newSigner = await provider.getSigner();
                setSigner(newSigner);
            } else {
                setSigner(undefined);
            }
        };

        const handleChainChanged = () => {
            window.location.reload();
        };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);

        checkConnection();

        return () => {
            window.ethereum!.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum!.removeListener('chainChanged', handleChainChanged);
        };
    }, [])

    const connectWallet = useCallback(async () => {
        if (window.ethereum?.isMetaMask) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (error) {
                console.error("Accesso negato dall'utente:", error);
            }
        }
    }, []);

    const value = {
        connectWithMetamask: connectWallet,
        signer,
        isLoading,
        isConnected: !!signer,
    }

    return (
        <MetamaskContext.Provider value={value}>
            {children}
        </MetamaskContext.Provider>
    );
}