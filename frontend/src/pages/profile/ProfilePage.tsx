'use client'

import { toast } from "react-hot-toast";
import { motion } from 'framer-motion';

import {
    ArrowTopRightOnSquareIcon,
    CurrencyDollarIcon,
    DocumentDuplicateIcon,
    GlobeAltIcon
} from "@heroicons/react/24/outline";
import {useMetamask} from "../../hook/metamask/useMetamask.ts";
import WalletNotConnected from "../../components/common/WalletNotConnected.tsx";

const ProfilePage = () => {
    const {
        signer,
        isConnected,
        balance,
        network,
        chainId,
    } = useMetamask();

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    if (!isConnected) {
        return <WalletNotConnected />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto p-6"
        >
            <div className="max-w-4xl mx-auto space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between"
                >
                    <h1 className="text-3xl font-extrabold text-white">Wallet Profile</h1>
                </motion.div>

                <div className="space-y-6">
                    <div className="card bg-neutral-800 border border-neutral-700 shadow-lg p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                                <DocumentDuplicateIcon
                                    className="w-6 h-6 text-yellow-400 cursor-pointer hover:text-yellow-300 transition"
                                    onClick={() => copyToClipboard(signer!.address)}
                                />
                                Wallet Address
                            </h2>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-mono break-words text-neutral-400">{signer!.address}</span>
                            <a
                                href={`https://etherscan.io/address/${signer!.address}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-ghost btn-sm text-yellow-400 hover:text-yellow-300 transition"
                            >
                                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div className="card bg-neutral-800 border border-neutral-700 shadow-lg p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                                <CurrencyDollarIcon className="w-6 h-6 text-yellow-400" />
                                Balance
                            </h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-extrabold text-white">
                                {balance ? parseFloat(balance).toFixed(4) : '0.0000'}
                            </span>
                            <span className="text-xl text-neutral-400">ETH</span>
                        </div>
                    </div>

                    <div className="card bg-neutral-800 border border-neutral-700 shadow-lg p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                                <GlobeAltIcon className="w-6 h-6 text-yellow-400" />
                                Network Info
                            </h2>
                        </div>
                        <div className="space-y-3 text-neutral-400">
                            <div className="flex justify-between">
                                <span>Network Name:</span>
                                <span className="font-medium capitalize">{network}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Chain ID:</span>
                                <span className="font-mono">{chainId}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfilePage;
