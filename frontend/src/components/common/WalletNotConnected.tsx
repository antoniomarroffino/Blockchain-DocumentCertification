'use client'

import {motion} from 'framer-motion';
import {LockClosedIcon} from "@heroicons/react/16/solid";

const WalletNotConnected = () => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="hero min-h-[50vh] bg-neutral-900 text-center"
        >
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <LockClosedIcon className="w-12 h-12 text-yellow-400 mx-auto mb-4"/>
                    <h2 className="text-2xl font-bold mb-4 text-white">Wallet Not Connected</h2>
                    <p className="text-neutral-400">Please connect your wallet to start certifying documents</p>
                </div>
            </div>
        </motion.div>
    );
};

export default WalletNotConnected;
