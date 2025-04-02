import React, { ReactNode } from 'react';
import DocumentUploader from './DocumentUploader';

interface BaseComponentProps {
    children?: ReactNode;
}

const BaseComponent: React.FC<BaseComponentProps> = () => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar Blu Fissa con bordo */}
            <div className="w-64 bg-blue-600 text-white p-4 space-y-2 border-r-4 border-blue-700 shadow-lg relative">
                <div className="text-xl font-bold mb-6 text-center">
                    Certificazioni
                </div>
                <ul className="space-y-2">
                    <li>
                        <a href="#" className="block py-2 px-4 hover:bg-blue-700 rounded-md transition-colors group">
                            <i className="mr-2 fas fa-home group-hover:text-white"></i>
                            <span className="group-hover:text-white">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 px-4 hover:bg-blue-700 rounded-md transition-colors group">
                            <i className="mr-2 fas fa-file-upload group-hover:text-white"></i>
                            <span className="group-hover:text-white">Certifica Documento</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 px-4 hover:bg-blue-700 rounded-md transition-colors group">
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

            {/* Contenuto Principale */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar */}
                <nav className="bg-white shadow-md p-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <button className="btn btn-ghost mr-4 lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                        <h1 className="text-xl font-bold">Certificazione Documenti</h1>
                    </div>

                    {/* Elementi Navbar */}
                    <div className="flex items-center space-x-4">
                        <button className="btn btn-ghost btn-circle hover:bg-gray-100">
                            <i className="fas fa-search"></i>
                        </button>
                        <button className="btn btn-ghost btn-circle hover:bg-gray-100 relative">
                            <i className="fas fa-bell"></i>
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>
                </nav>

                {/* Contenuto */}
                <main className="p-4 bg-gray-100 flex-1 overflow-y-auto">
                    <div className="container mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="card bg-base-100 shadow-xl p-6">
                                <h2 className="text-2xl font-bold mb-4">Certificazione Documenti</h2>
                                <DocumentUploader />
                            </div>

                            <div className="card bg-base-100 shadow-xl p-6">
                                <h2 className="text-2xl font-bold mb-4">Anteprima Documento</h2>
                                {/* Componente di anteprima */}
                                <div className="bg-gray-50 border-2 border-dashed border-gray-300 h-64 flex items-center justify-center">
                                    <p className="text-gray-400">Nessun documento caricato</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white shadow-md p-4 text-center">
                    <p className="text-sm text-gray-600">
                        © 2023 Document Certification Platform. Tutti i diritti riservati.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default BaseComponent;