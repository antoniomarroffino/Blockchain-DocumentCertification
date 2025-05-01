'use client'

import {useNavigate} from 'react-router-dom';
import {useMetamask} from "../../hook/metamask/useMetamask.ts";
import {motion} from 'framer-motion';

import WalletNotConnected from "../../components/common/WalletNotConnected.tsx";
import MyDocumentsTable from "./MyDocumentsTable.tsx";
import {PlusIcon} from "@heroicons/react/16/solid";
import {useState} from "react";
import DocumentSearchBar from "../my-certified-documents/DocumentSearchBar.tsx";

const MyDocumentsPage = () => {
    const {signer, isConnected} = useMetamask();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    if (!isConnected) {
        return <WalletNotConnected/>;
    }

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="card bg-neutral-800 border border-neutral-700 shadow-xl"
        >
            <div className="card-body p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="card-title text-2xl text-white">My Documents</h2>
                    <motion.button
                        whileHover={{scale: 1.05}}
                        className="btn bg-yellow-400 text-neutral-900 font-bold rounded-full gap-2 hover:bg-yellow-300 transition"
                        onClick={() => navigate('/uploadDocument')}
                    >
                        <PlusIcon className="w-4 h-4"/>
                        New Document
                    </motion.button>
                </div>

                <div className="mb-6">
                    <DocumentSearchBar searchTerm={searchTerm} onChange={setSearchTerm}/>
                </div>

                <MyDocumentsTable signer={signer!} searchTerm={searchTerm}/>
            </div>
        </motion.div>
    );
};

export default MyDocumentsPage;
