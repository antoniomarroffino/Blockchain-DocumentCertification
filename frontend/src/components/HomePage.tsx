import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    FaSearch,
    FaBell,
    FaShieldAlt,
    FaFileAlt,
    FaChartLine,
    FaCubes,
    FaLock,
    FaClock,
    FaRocket,
    FaCheckCircle,
    FaUserShield,
    FaDatabase
} from 'react-icons/fa';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const stats = [
        {
            icon: <FaShieldAlt className="text-2xl text-green-600" />,
            title: "Security",
            value: "100% Verified",
            bgColor: "bg-green-50"
        },
        {
            icon: <FaFileAlt className="text-2xl text-green-500" />,
            title: "Today's Documents",
            value: "24 Certified",
            bgColor: "bg-green-50/50"
        },
        {
            icon: <FaChartLine className="text-2xl text-yellow-500" />,
            title: "Performance",
            value: "99.9% Uptime",
            bgColor: "bg-yellow-50"
        }
    ];

    const features = [
        {
            icon: <FaLock />,
            title: "Blockchain Security",
            description: "Every document is secured with advanced blockchain technology",
            color: "text-green-600"
        },
        {
            icon: <FaClock />,
            title: "Instant Verification",
            description: "Verify document authenticity in seconds",
            color: "text-green-500"
        },
        {
            icon: <FaCheckCircle />,
            title: "Tamper-Proof",
            description: "Immutable records that cannot be altered",
            color: "text-yellow-500"
        },
        {
            icon: <FaUserShield />,
            title: "Privacy First",
            description: "Your documents remain private and secure",
            color: "text-green-600"
        },
        {
            icon: <FaDatabase />,
            title: "Permanent Storage",
            description: "Documents are stored permanently on the blockchain",
            color: "text-green-500"
        },
        {
            icon: <FaCubes />,
            title: "Smart Contracts",
            description: "Automated verification processes",
            color: "text-yellow-500"
        }
    ];

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Navbar */}
                <motion.nav
                    initial={{y: -20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    className="bg-white/80 backdrop-blur-xl border-b border-green-100 p-4 sticky top-0 z-50"
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
                                <FaCubes className="text-3xl text-green-600"/>
                                <div>
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-yellow-500
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
                                <p className="text-lg font-bold text-green-600">1,234</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-slate-500">Average Time</p>
                                <p className="text-lg font-bold text-yellow-500">2.5s</p>
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
                                onClick={() => navigate('/uploadDocument')}
                                className="btn bg-green-600 hover:bg-green-700 text-white btn-sm normal-case border-0"
                            >
                                <FaFileAlt className="mr-2"/> New Document
                            </motion.button>
                        </div>
                    </div>
                </motion.nav>
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative bg-gradient-to-r from-green-600 via-green-500 to-yellow-500 text-white py-20"
                >
                    <div className="absolute inset-0 bg-grid-white/10"></div>
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ x: -50 }}
                                animate={{ x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                    Secure Document Certification on Blockchain
                                </h1>
                                <p className="text-lg opacity-90 mb-8">
                                    Certify your documents with the power of blockchain technology.
                                    Immutable, secure, and instantly verifiable.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/uploadDocument')}
                                    className="btn btn-lg bg-white text-green-600 hover:bg-green-50 border-0"
                                >
                                    <FaRocket className="mr-2" />
                                    Start Certifying
                                </motion.button>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="hidden md:block"
                            >
                                <div className="relative h-96">
                                    <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-xl">
                                        {/* Qui potresti aggiungere un'illustrazione o un'animazione */}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="py-12 px-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className={`${stat.bgColor} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-white/50 rounded-xl">
                                            {stat.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-slate-600">{stat.title}</h3>
                                            <p className="text-xl font-bold text-green-800">{stat.value}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                                >
                                    <div className={`p-3 bg-green-50 rounded-xl w-fit mb-4 ${feature.color}`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-green-800">{feature.title}</h3>
                                    <p className="text-slate-600">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-16 text-center bg-gradient-to-r from-green-600 via-green-500 to-yellow-500 p-12 rounded-3xl text-white relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-grid-white/10"></div>
                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold mb-4">
                                    Ready to Secure Your Documents?
                                </h2>
                                <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                                    Join thousands of users who trust our blockchain-based certification system
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/uploadDocument')}
                                    className="btn btn-lg bg-white text-green-600 hover:bg-green-50 border-0"
                                >
                                    <FaFileAlt className="mr-2" />
                                    Start Certification
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;