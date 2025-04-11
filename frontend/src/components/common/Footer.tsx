import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import supsiLogo from "../../assets/logo-supsi.png"

const Footer: React.FC = () => {
    const developers = [
        {
            name: "Antonio Marroffino",
            linkedin: "https://www.linkedin.com/in/antonio-marroffino/",
            github: "https://github.com/antoniomarroffino"
        },
        {
            name: "Luca Fantò",
            linkedin: "https://www.linkedin.com/in/luca-fanto/",
            github: "https://github.com/lucafanto"
        }
    ];

    return (
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-t border-slate-200"
        >
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="flex items-center justify-center md:justify-start space-x-4">
                        <img
                            src={supsiLogo}
                            alt="SUPSI Logo"
                            className="h-12 w-auto"
                        />
                        <div className="text-sm text-slate-600">
                            <p>© {new Date().getFullYear()}</p>
                            <p>Document Certification Platform</p>
                        </div>
                    </div>

                    {/* Developers */}
                    <div className="text-center">
                        <h3 className="text-sm font-semibold text-slate-800 mb-4">
                            Developed by
                        </h3>
                        <div className="space-y-3">
                            {developers.map((dev, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center justify-center space-x-3"
                                >
                                    <span className="text-sm text-slate-600">{dev.name}</span>
                                    <div className="flex space-x-2">
                                        <a
                                            href={dev.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-400 hover:text-blue-500 transition-colors"
                                        >
                                            <FaLinkedin className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={dev.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-400 hover:text-slate-700 transition-colors"
                                        >
                                            <FaGithub className="w-4 h-4" />
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Additional Links */}
                    <div className="flex flex-col items-center md:items-end space-y-2">
                        <motion.a
                            href="https://www.supsi.ch"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-slate-600 hover:text-primary transition-colors"
                            whileHover={{ x: -5 }}
                        >
                            Visit SUPSI
                        </motion.a>
                        <motion.a
                            href="#"
                            className="text-sm text-slate-600 hover:text-primary transition-colors"
                            whileHover={{ x: -5 }}
                        >
                            Privacy Policy
                        </motion.a>
                        <motion.a
                            href="#"
                            className="text-sm text-slate-600 hover:text-primary transition-colors"
                            whileHover={{ x: -5 }}
                        >
                            Terms of Service
                        </motion.a>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-200">
                    <p className="text-center text-xs text-slate-500">
                        Built with ❤️ at SUPSI - Blockchain Course
                    </p>
                </div>
            </div>
        </motion.footer>
    );
}

export default Footer;