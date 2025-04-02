import React from "react";
import {useNavigate} from "react-router-dom";

const Sidebar: React.FC = () => {
    const navigate = useNavigate();

    return (<div className="w-64 bg-blue-600 text-white p-4 space-y-2 border-r-4 border-blue-700 shadow-lg relative">
        <div className="text-xl font-bold mb-6 text-center">
            Certificazioni
        </div>
        <ul className="space-y-2">
            <li>
                <a onClick={() => navigate('/uploadDocument')}
                   className="block py-2 px-4 hover:bg-blue-700 rounded-md transition-colors group">
                    <i className="mr-2 fas fa-file-upload group-hover:text-white"></i>
                    <span className="group-hover:text-white">Carica Documento</span>
                </a>
            </li>
            <li>
                <a onClick={() => navigate('/myDocuments')}
                   className="block py-2 px-4 hover:bg-blue-700 rounded-md transition-colors group">
                    <i className="mr-2 fas fa-home group-hover:text-white"></i>
                    <span className="group-hover:text-white">Miei Documenti</span>
                </a>
            </li>
            <li>
                <a onClick={() => navigate('/allDocuments')}
                   className="block py-2 px-4 hover:bg-blue-700 rounded-md transition-colors group">
                    <i className="mr-2 fas fa-file-upload group-hover:text-white"></i>
                    <span className="group-hover:text-white">Certifica Documento</span>
                </a>
            </li>
            <li>
                <a className="block py-2 px-4 hover:bg-blue-700 rounded-md transition-colors group">
                    <i className="mr-2 fas fa-history group-hover:text-white"></i>
                    <span className="group-hover:text-white">Storico Certificazioni</span>
                </a>
            </li>
            <li>
                <a href="#" className="block py-2 px-4 hover:bg-blue-700 rounded-md transition-colors group">
                    <i className="mr-2 fas fa-cog group-hover:text-white"></i>
                    <span className="group-hover:text-white">Impostazioni</span>
                </a>
            </li>
        </ul>

        {/* Footer Sidebar */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-blue-700 border-t border-blue-800">
            <div className="flex items-center space-x-2">
                <div className="avatar">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                            src="/placeholder-avatar.jpg"
                            alt="User"
                            className="object-cover"
                        />
                    </div>
                </div>
                <div>
                    <p className="text-sm font-semibold">Nome Utente</p>
                    <p className="text-xs opacity-75">Admin</p>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Sidebar;