import React from 'react';
import {motion} from 'framer-motion';
import DocumentUploader from './DocumentUploader';
import {FaSearch, FaBell, FaShieldAlt, FaFileAlt, FaChartLine, FaCubes} from 'react-icons/fa';

const HomePage: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="flex-1 flex flex-col min-h-screen">
                <motion.nav
                    initial={{y: -20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    className="bg-white/80 backdrop-blur-xl border-b border-slate-200 p-4 sticky top-0 z-50"
                >
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <button className="lg:hidden btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     className="w-6 h-6 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                            <div className="flex items-center space-x-3">
                                <FaCubes className="text-3xl text-primary"/>
                                <div>
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary
                                                 text-transparent bg-clip-text">
                                        Document Certification
                                    </h1>
                                    <p className="text-sm text-slate-500">Powered by KROSTchain</p>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-6">
                            <div className="text-center">
                                <p className="text-sm text-slate-500">Certified Documents</p>
                                <p className="text-lg font-bold text-primary">1,234</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-slate-500">Average Time</p>
                                <p className="text-lg font-bold text-secondary">2.5s</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                className="btn btn-ghost btn-circle"
                            >
                                <FaSearch className="text-slate-600 text-lg"/>
                            </motion.button>
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                className="btn btn-ghost btn-circle relative"
                            >
                                <FaBell className="text-slate-600 text-lg"/>
                                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
                            </motion.button>
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                className="btn btn-primary btn-sm normal-case"
                            >
                                <FaFileAlt className="mr-2"/> New Document
                            </motion.button>
                        </div>
                    </div>
                </motion.nav>

                <div className="flex-1 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.1}}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-primary/10 rounded-xl">
                                    <FaShieldAlt className="text-2xl text-primary"/>
                                </div>
                                <div>
                                    <h3 className="text-sm text-slate-500">Security</h3>
                                    <p className="text-xl font-bold">100% Verified</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.2}}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-secondary/10 rounded-xl">
                                    <FaFileAlt className="text-2xl text-secondary"/>
                                </div>
                                <div>
                                    <h3 className="text-sm text-slate-500">Today's Documents</h3>
                                    <p className="text-xl font-bold">24 Certified</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.3}}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-accent/10 rounded-xl">
                                    <FaChartLine className="text-2xl text-accent"/>
                                </div>
                                <div>
                                    <h3 className="text-sm text-slate-500">Performance</h3>
                                    <p className="text-xl font-bold">99.9% Uptime</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.4}}
                        className="bg-white rounded-3xl p-8 shadow-xl"
                    >
                        <DocumentUploader/>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;