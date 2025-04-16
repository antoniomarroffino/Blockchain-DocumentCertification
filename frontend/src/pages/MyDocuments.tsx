'use client'

import {useNavigate} from 'react-router-dom';
import {useMetamask} from "../hook/useMetamask.ts";
import {LockClosedIcon, PlusIcon} from "@heroicons/react/16/solid";
import MyDocumentsTable from "../components/MyDocumentsTable.tsx";

const MyDocuments = () => {
    const {signer, isConnected} = useMetamask();
    const navigate = useNavigate();

    if (!isConnected) {
        return (
            <div className="hero min-h-[50vh]">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <LockClosedIcon className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-4">Wallet Not Connected</h2>
                        <p className="mb-6">Please connect your wallet to start certifying documents</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="card-title text-2xl">My Documents</h2>
                    <button className="btn btn-primary gap-2" onClick={() => navigate('/uploadDocument')}>
                        <PlusIcon className="w-4 h-4" />
                        New Document
                    </button>
                </div>

                <MyDocumentsTable signer={signer!} />
            </div>
        </div>
    );
};

export default MyDocuments;