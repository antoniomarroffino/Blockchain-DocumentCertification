'use client';

import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

import {
    ArrowTopRightOnSquareIcon,
    CurrencyDollarIcon,
    DocumentDuplicateIcon,
    GlobeAltIcon
} from "@heroicons/react/24/outline";

import { useMetamask } from "../../hook/metamask/useMetamask.ts";
import WalletNotConnected from "../../components/common/WalletNotConnected.tsx";

const ProfilePage = () => {
    const { signer, isConnected, balance, network, chainId } = useMetamask();

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    if (!isConnected) return <WalletNotConnected />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card bg-neutral-800 border border-neutral-700 shadow-xl"
        >
            <div className="card-body p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="card-title text-2xl text-white">My Profile</h2>
                </div>

                <div className="space-y-6">
                    <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <DocumentDuplicateIcon
                                className="w-5 h-5 text-yellow-400 cursor-pointer hover:text-yellow-300 transition"
                                onClick={() => copyToClipboard(signer!.address)}
                            />
                            Wallet Address
                        </h3>
                        <div className="flex items-center justify-between">
                            <span className="font-mono break-all text-neutral-400">
                                {signer!.address}
                            </span>
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

                    <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <CurrencyDollarIcon className="w-5 h-5 text-yellow-400" />
                            Balance
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-extrabold text-white">
                                {balance ? parseFloat(balance).toFixed(4) : '0.0000'}
                            </span>
                            <span className="text-xl text-neutral-400">ETH</span>
                        </div>
                    </div>

                    <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <GlobeAltIcon className="w-5 h-5 text-yellow-400" />
                            Network Info
                        </h3>
                        <div className="space-y-2 text-sm text-neutral-400">
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
