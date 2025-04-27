'use client'
import {useMetamask} from "../hook/metamask/useMetamask.ts";
import {
    ArrowTopRightOnSquareIcon,
    CurrencyDollarIcon,
    DocumentDuplicateIcon,
    GlobeAltIcon
} from "@heroicons/react/24/outline";
import {toast} from "react-hot-toast";
import {LockClosedIcon} from "@heroicons/react/16/solid";

const Profile = () => {
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
        return (
            <div className="hero min-h-[50vh]">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <LockClosedIcon className="w-12 h-12 text-primary mx-auto mb-4"/>
                        <h2 className="text-2xl font-bold mb-4">Wallet Not Connected</h2>
                        <p className="mb-6">Please connect your wallet to start certifying documents</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Wallet Profile</h1>
                    </div>
                </div>
                {/* Account Info */}
                <div className="md:col-span-2 space-y-6">
                    {/* Address Section */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title mb-4">
                                <DocumentDuplicateIcon className="w-6 h-6 text-primary cursor-pointer"
                                                       onClick={() => copyToClipboard(signer!.address)}/>
                                Wallet Address
                            </h2>
                            <div className="flex items-center justify-between">
                                <span className="font-mono break-all">{signer!.address}</span>
                                <a
                                    href={`https://etherscan.io/address/${signer!.address}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-ghost btn-sm"
                                >
                                    <ArrowTopRightOnSquareIcon className="w-4 h-4"/>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Balance Section */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title mb-4">
                                <CurrencyDollarIcon className="w-6 h-6 text-primary"/>
                                Balance
                            </h2>
                            <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    {balance ? parseFloat(balance).toFixed(4) : '0.0000'}
                  </span>
                                <span className="text-xl">ETH</span>
                            </div>
                        </div>
                    </div>

                    {/* Network Section */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title mb-4">
                                <GlobeAltIcon className="w-6 h-6 text-primary"/>
                                Network Info
                            </h2>
                            <div className="space-y-2">
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
            </div>
        </div>
    );
};

export default Profile;