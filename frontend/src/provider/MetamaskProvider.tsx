'use client'
import {MetamaskContext} from "../context/MetamaskContext.tsx";
import React, {useCallback, useEffect, useState} from "react";
import {BigNumberish, ethers, JsonRpcSigner} from "ethers";
import {MetaMaskInpageProvider} from "@metamask/providers";


declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider;
    }
}

export const MetamaskProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [balance, setBalance] = useState<string>();
    const [network, setNetwork] = useState<string>();
    const [chainId, setChainId] = useState<BigNumberish>();

    const updateNetworkInfo = useCallback(async (provider: ethers.BrowserProvider) => {
        try {
            const network = await provider.getNetwork();
            setNetwork(network.name);
            setChainId(network.chainId);
        } catch (error) {
            console.error("Error getting network:", error);
        }
    }, []);

    const updateBalance = useCallback(async (address: string) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum!);
            const balance = await provider.getBalance(address);
            setBalance(ethers.formatEther(balance));
        } catch (error) {
            console.error("Error getting balance:", error);
        }
    }, []);

    useEffect(() => {
        if (!window.ethereum || !window.ethereum.isMetaMask) {
            setIsLoading(false);
            return;
        }

        let provider = new ethers.BrowserProvider(window.ethereum);

        const checkConnection = async () => {
            try {
                const accounts = await provider.listAccounts();
                if (accounts.length > 0) {
                    const currentSigner = await provider.getSigner();
                    setSigner(currentSigner);
                    await updateBalance(currentSigner.address);
                    await updateNetworkInfo(provider);
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
                await updateBalance(newSigner.address);
            } else {
                setSigner(undefined);
            }
        };

        const handleChainChanged = async () => {
            try {
                provider = new ethers.BrowserProvider(window.ethereum!);
                await updateNetworkInfo(provider);
                if (signer?.address) {
                    await updateBalance(signer.address);
                }
            } catch (error) {
                console.error("Error handling chain change:", error);
            }
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
    }, [signer?.address, updateBalance, updateNetworkInfo])

    const connectWallet = useCallback(async () => {
        if (window.ethereum?.isMetaMask) {
            try {
                await window.ethereum.request({method: 'eth_requestAccounts'});
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
        balance,
        network,
        chainId,
    }

    return (
        <MetamaskContext.Provider value={value}>
            {children}
        </MetamaskContext.Provider>
    );
}