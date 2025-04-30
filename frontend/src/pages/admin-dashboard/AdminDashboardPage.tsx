'use client';

import { motion } from "framer-motion";

const AdminDashboardPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card bg-neutral-800 border border-neutral-700 shadow-xl"
        >
            <div className="card-body p-6">
                <h2 className="card-title text-2xl text-white mb-4">Admin Dashboard</h2>

                <p className="text-neutral-400 mb-4">
                    Qui potrai vedere gli indirizzi degli utenti, il loro ruolo, e assegnare o revocare il ruolo di certificatore.
                </p>

                {/* ⚠️ Qui inserirai in seguito:
                    - Tabella degli utenti connessi
                    - Pulsanti per grant/revoke role
                    - Controllo per mostrare questa pagina solo se l'utente è admin
                */}
                <div className="text-yellow-400">
                    🚧 In fase di sviluppo...
                </div>
            </div>
        </motion.div>
    );
};

export default AdminDashboardPage;
