import React, { ReactNode } from 'react';
import DocumentUploader from './DocumentUploader';
import Sidebar from "./common/Sidebar.tsx";
import Footer from "./common/Footer.tsx";

interface BaseComponentProps {
    children?: ReactNode;
}

const BaseComponent: React.FC<BaseComponentProps> = () => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar Blu Fissa con bordo */}
            <Sidebar />

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
                <DocumentUploader />
                <Footer />
            </div>
        </div>
    );
};

export default BaseComponent;