import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaFileUpload,
    FaFolder,
    FaCertificate,
    FaHistory,
    FaCog,
    FaChevronRight,
    FaCubes
} from "react-icons/fa";

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            path: '/uploadDocument',
            icon: <FaFileUpload />,
            label: 'Upload Document',
        },
        {
            path: '/myDocuments',
            icon: <FaFolder />,
            label: 'My Documents',
        },
        {
            path: '/allDocuments',
            icon: <FaCertificate />,
            label: 'Certify Document',
        },
        {
            path: '/history',
            icon: <FaHistory />,
            label: 'Certification History',
        },
        {
            path: '/settings',
            icon: <FaCog />,
            label: 'Settings',
        },
    ];

    return (
        <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            className="fixed left-0 top-0 w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-white h-screen flex flex-col overflow-y-auto"
        >
            {/* Logo Section */}
            <div className="p-6 border-b border-slate-700/50">
                <motion.div
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="p-2 bg-primary/20 rounded-xl">
                        <FaCubes className="text-2xl text-primary" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                            KROSTchain
                        </h1>
                        <p className="text-xs text-slate-400">Document Certification</p>
                    </div>
                </motion.div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <motion.div
                            key={item.path}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <button
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                    ${isActive
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
                            >
                                <span className={`text-lg ${isActive ? 'text-white' : 'text-slate-400'}`}>
                                    {item.icon}
                                </span>
                                <span className="flex-1 text-left">{item.label}</span>
                                {isActive && (
                                    <FaChevronRight className="text-sm opacity-50" />
                                )}
                            </button>
                        </motion.div>
                    );
                })}
            </nav>

            {/* Stats Section */}
            <div className="p-4 border-t border-slate-700/50">
                <div className="bg-slate-800/50 rounded-xl p-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400">Documents</span>
                        <span className="text-primary font-bold">124</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400">Certified</span>
                        <span className="text-secondary font-bold">98%</span>
                    </div>
                </div>
            </div>

            {/* User Profile */}
            <div className="p-4 border-t border-slate-700/50">
                <motion.div
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/50 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="avatar">
                        <div className="w-10 h-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-slate-800">
                            <img
                                src="https://api.dicebear.com/6.x/avataaars/svg?seed=Felix"
                                alt="User"
                                className="rounded-full"
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-slate-400">Administrator</p>
                    </div>
                    <button className="btn btn-ghost btn-circle btn-xs">
                        <FaCog className="text-slate-400" />
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Sidebar;