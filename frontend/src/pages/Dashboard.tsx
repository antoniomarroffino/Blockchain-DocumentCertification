'use client'

import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { ChartBarIcon, ClockIcon, DocumentArrowUpIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const features = [
    {
        icon: <ShieldCheckIcon className="w-12 h-12 text-yellow-400" />,
        title: "Military-Grade Security",
        text: "Blockchain-powered immutability protects your documents"
    },
    {
        icon: <ClockIcon className="w-12 h-12 text-green-400" />,
        title: "Instant Verification",
        text: "Verify authenticity of any document in seconds"
    },
    {
        icon: <ChartBarIcon className="w-12 h-12 text-pink-400" />,
        title: "Full History Tracking",
        text: "Complete audit trail for every document"
    },
    {
        icon: <DocumentArrowUpIcon className="w-12 h-12 text-blue-400" />,
        title: "Easy Integration",
        text: "API-first approach for developers"
    }
];

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-8 p-4 md:p-8">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-neutral-900 rounded-xl p-8 text-center shadow-lg"
            >
                <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                    Secure Your Documents with Blockchain
                </h1>
                <p className="text-lg md:text-2xl text-neutral-400 mb-8">
                    Certify, verify and track your important documents securely
                </p>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        to="/uploadDocument"
                        className="inline-flex items-center gap-3 bg-yellow-400 text-neutral-900 font-bold px-6 py-3 rounded-full hover:shadow-yellow-500/40 transition-all duration-300"
                    >
                        <DocumentArrowUpIcon className="w-5 h-5" />
                        Get Started
                    </Link>
                </motion.div>
            </motion.div>

            {/* Features Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="bg-neutral-800 rounded-2xl p-6 text-center shadow-md hover:shadow-yellow-400/20 transition-all duration-300 border border-neutral-700"
                    >
                        <div className="mb-4">{feature.icon}</div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-sm text-neutral-400">
                            {feature.text}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Dashboard;
