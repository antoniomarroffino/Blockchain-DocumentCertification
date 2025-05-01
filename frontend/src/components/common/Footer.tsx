'use client'

import {FaGithub, FaInstagram, FaLinkedin} from "react-icons/fa";
import supsiLogo from "../../assets/supsi-logo.png";
import {motion} from 'framer-motion';
import React from "react";

const developers = [
    {
        name: "Antonio Marroffino",
        instagram: "https://instagram.com/anto.marro",
        role: "Full Stack Developer",
        github: "https://github.com/antoniomarroffino",
        linkedin: "https://www.linkedin.com/in/antoniomarroffino",
    },
    {
        name: "Luca Fantò",
        instagram: "https://instagram.com/luca_fanto_",
        role: "Full Stack Developer",
        github: "https://github.com/lucafanto",
        linkedin: "https://www.linkedin.com/in/luca-fant%C3%B2-14197232a/",
    },
];

export default function Footer() {
    return (
        <footer className="bg-neutral-900 text-white border-t border-neutral-700 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div
                    className="absolute w-72 h-72 bg-yellow-400/20 rounded-full -top-32 -left-32 mix-blend-soft-light animate-float"></div>
                <div
                    className="absolute w-64 h-64 bg-green-400/20 rounded-full top-1/2 right-0 mix-blend-soft-light animate-float-delayed"></div>
            </div>

            <div className="container mx-auto px-6 py-16 relative">
                <div className="flex flex-col xl:flex-row gap-12 items-start justify-between">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        className="flex flex-col items-start space-y-6 max-w-md"
                    >
                        <div
                            className="p-4 backdrop-blur-md bg-neutral-800/70 rounded-2xl shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 border border-neutral-700">
                            <img
                                src={supsiLogo}
                                alt="SUPSI Logo"
                                className="h-20 opacity-90 hover:opacity-100 transition-opacity"
                            />
                        </div>
                        <p className="text-sm text-neutral-400 font-light">
                            © {new Date().getFullYear()} KrostChain
                            <br/>
                            Made with ❤️ and ☕ in Lugano
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 max-w-4xl">
                        {developers.map((dev, index) => (
                            <motion.div
                                key={dev.name}
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: index * 0.2}}
                                className="group bg-neutral-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-yellow-500/20 transition-all duration-500 border border-neutral-700 relative overflow-hidden"
                            >
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                <div className="relative flex flex-col space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                                                {dev.name}
                                            </h3>
                                            <p className="text-sm text-neutral-400 mt-1">{dev.role}</p>
                                        </div>
                                        <div className="flex space-x-3">
                                            {[
                                                {icon: FaInstagram, href: dev.instagram, color: "#E1306C"},
                                                {icon: FaGithub, href: dev.github, color: "#ffffff"},
                                                {icon: FaLinkedin, href: dev.linkedin, color: "#0A66C2"},
                                            ].map((social) => (
                                                <motion.a
                                                    key={social.href}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{scale: 1.2}}
                                                    className="p-2 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-all duration-300 shadow-sm"
                                                    style={
                                                        {
                                                            "--hover-color": social.color,
                                                        } as React.CSSProperties
                                                    }
                                                >
                                                    <social.icon
                                                        className="w-5 h-5 text-neutral-300 hover:text-[var(--hover-color)] transition-colors duration-300"/>
                                                </motion.a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
