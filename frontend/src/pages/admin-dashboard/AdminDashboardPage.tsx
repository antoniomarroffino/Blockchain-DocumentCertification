'use client';

import {useState} from "react";
import {motion} from "framer-motion";
import {useCertifierList} from "../../hook/blockchain/useCertifierList";
import {useManageCertifier} from "../../hook/blockchain/useManageCertifier";
import CertifierTable from "./CertifierTable";
import {toast} from "react-hot-toast";
import {ethers,} from "ethers";
import {hasCertifierRole} from "../../types/roles.ts";
import {useMetamask} from "../../hook/metamask/useMetamask.ts";

const AdminDashboardPage = () => {
    const [newAddress, setNewAddress] = useState<string>("");
    const {signer} = useMetamask();

    const {
        certifiers,
        currentAddress,
        refetch: refetchCertifiers,
    } = useCertifierList();

    const {
        grant,
        revoke,
        loading,
    } = useManageCertifier(refetchCertifiers);

    const handleGrant = async () => {
        if (!ethers.isAddress(newAddress)) {
            toast.error("Invalid address");
            return;
        }

        const alreadyHasRole = await hasCertifierRole(signer!, newAddress);
        if (alreadyHasRole) {
            toast.error("Address already has Certifier role");
            return;
        }

        grant(newAddress);
        setNewAddress("");
    };


    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="card bg-neutral-800 border border-neutral-700 shadow-xl"
        >
            <div className="card-body p-6">
                <h2 className="card-title text-2xl text-white mb-4">Admin Dashboard</h2>

                <div className="mb-6">
                    <label className="text-white font-semibold mb-2 block">Add new certifier</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="input input-bordered w-full bg-neutral-700 text-white"
                            placeholder="0x..."
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                        />
                        <button
                            onClick={handleGrant}
                            disabled={loading}
                            className="btn bg-yellow-400 text-neutral-900 hover:bg-yellow-300"
                        >
                            Grant
                        </button>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-3">Active Certifiers</h3>
                <CertifierTable
                    certifiers={certifiers}
                    loading={loading}
                    currentAddress={currentAddress}
                    onRevoke={revoke}
                />
            </div>
        </motion.div>
    );
};

export default AdminDashboardPage;
