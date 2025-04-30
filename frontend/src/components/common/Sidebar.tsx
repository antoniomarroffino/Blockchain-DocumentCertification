'use client'

import { useLocation, useNavigate } from "react-router-dom";
import { useMetamask } from "../../hook/metamask/useMetamask";
import { motion } from "framer-motion";
import {CheckBadgeIcon, HomeIcon, UserCircleIcon} from "@heroicons/react/24/solid";
import { ArrowUpTrayIcon, DocumentIcon, FolderIcon } from "@heroicons/react/16/solid";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isConnected, network } = useMetamask();

    const menuItems = [
        { path: '/', label: 'DashboardPage', icon: <HomeIcon className="w-5 h-5" /> },
        { path: '/uploadDocument', label: 'Upload Document', icon: <ArrowUpTrayIcon className="w-5 h-5" /> },
        { path: '/myDocuments', label: 'My Documents', icon: <FolderIcon className="w-5 h-5" /> },
        { path: '/myCertifiedDocuments', label: 'Certified Docs', icon: <CheckBadgeIcon className="w-5 h-5" /> },
        { path: '/allDocuments', label: 'All Documents', icon: <DocumentIcon className="w-5 h-5" /> },
        { path: '/profile', label: 'ProfilePage', icon: <UserCircleIcon className="w-5 h-5" /> },
    ];

    return (
        <div className="h-[calc(100vh-65px)] w-64 bg-neutral-900 border-r border-neutral-700 flex flex-col justify-between">
            <nav className="px-3 py-4 overflow-y-auto">
                <div className="flex flex-col gap-1.5">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl font-semibold transition-all
                        ${isActive
                                    ? 'bg-gradient-to-r from-yellow-400/20 to-green-400/20 text-yellow-300 shadow-lg'
                                    : 'hover:bg-neutral-800 text-neutral-400 hover:text-yellow-400'}`}
                            >
                                {item.icon}
                                <span className="text-sm">{item.label}</span>
                            </motion.button>
                        );
                    })}
                </div>
            </nav>

            {isConnected && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-5 border-t border-neutral-700 bg-neutral-800/70 text-neutral-300"
                >
                    <div className="text-xs uppercase font-bold tracking-wider mb-2">Network Status</div>
                    <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                        <span>{network}</span>
                    </div>
                </motion.div>
            )}
        </div>


    );
};

export default Sidebar;
