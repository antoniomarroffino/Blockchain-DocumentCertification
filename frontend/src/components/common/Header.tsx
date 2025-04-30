'use client'

import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useMetamask} from '../../hook/metamask/useMetamask';
import {AnimatePresence, motion} from 'framer-motion';
import {ChevronDownIcon, DocumentDuplicateIcon, IdentificationIcon, WalletIcon,} from '@heroicons/react/24/outline';
import {CheckBadgeIcon} from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import {formatAddress} from "../../utils/formatAddress.ts";

export default function Header() {
    const navigate = useNavigate();
    const {network, isConnected, signer, connectWithMetamask} = useMetamask();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const fullAddress = signer?.address || '';

    const handleConnect = async () => {
        try {
            await connectWithMetamask();
            toast.success('Wallet connected!');
        } catch {
            toast.error('Could not connect wallet');
        }
    };

    const copyAddress = () => {
        navigator.clipboard.writeText(fullAddress);
        toast('Address copied', {icon: '📋'});
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header
            className="bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex items-center justify-between shadow-md">
            <motion.div
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, ease: 'easeOut'}}
                className="flex items-center space-x-3"
            >
                <CheckBadgeIcon className="w-8 h-8 text-yellow-400 animate-pulse"/>
                <h1 className="text-3xl font-extrabold tracking-tight text-white hover:underline hover:decoration-yellow-400 transition-all duration-300">
                    KrostChain
                </h1>
            </motion.div>

            <div className="flex items-center relative" ref={dropdownRef}>
                {isConnected ? (
                    <div className="relative">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            onClick={() => setOpen(o => !o)}
                            className="flex items-center space-x-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 px-4 py-2 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                        >
                            <WalletIcon className="w-6 h-6 text-yellow-400"/>
                            <span className="font-medium text-sm text-white">
                                {formatAddress(fullAddress)}
                            </span>
                            <ChevronDownIcon
                                className={`w-5 h-5 text-yellow-400 transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`}/>
                        </motion.button>

                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    initial={{opacity: 0, y: -10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -10}}
                                    transition={{duration: 0.3}}
                                    className="absolute right-0 mt-2 w-80 bg-neutral-800 rounded-2xl shadow-2xl ring-1 ring-yellow-400 ring-opacity-30 z-30"
                                >
                                    <div className="p-4 space-y-4 text-white">
                                        <div className="flex items-start space-x-3">
                                            <WalletIcon className="w-10 h-10 text-yellow-400"/>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold break-all max-w-full text-white">
                                                    {fullAddress}
                                                </p>

                                                <p className="text-xs text-gray-400 mt-1">Network: {network || '-'}</p>
                                            </div>
                                            <button
                                                onClick={copyAddress}
                                                className="p-1 text-gray-400 hover:text-yellow-400 transition"
                                            >
                                                <DocumentDuplicateIcon className="w-5 h-5"/>
                                            </button>
                                        </div>
                                        <div className="border-t border-neutral-700"/>
                                        <button
                                            onClick={() => {
                                                navigate('/profile');
                                                setOpen(false);
                                            }}
                                            className="w-full flex items-center space-x-2 px-4 py-2 bg-yellow-400 text-neutral-900 rounded-lg hover:bg-yellow-300 transition font-semibold"
                                        >
                                            <IdentificationIcon className="w-5 h-5"/>
                                            <span className="text-sm">View Profile</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <motion.button
                        whileHover={{scale: 1.05}}
                        onClick={handleConnect}
                        className="flex items-center space-x-2 bg-yellow-400 text-neutral-900 px-5 py-2 rounded-full shadow-lg hover:shadow-yellow-500/50 transform active:scale-95 transition-all duration-300"
                    >
                        <WalletIcon className="w-6 h-6"/>
                        <span className="font-semibold">Connect Wallet</span>
                    </motion.button>
                )}
            </div>
        </header>
    );
}
