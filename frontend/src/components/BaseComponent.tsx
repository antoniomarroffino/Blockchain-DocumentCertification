import React, { ReactNode } from 'react';

interface BaseComponentProps {
    children: ReactNode;
    title?: string;
}

const BaseComponent: React.FC<BaseComponentProps> = ({
                                                         children,
                                                         title = "Document Certification Platform"
                                                     }) => {
    return (
        <div className="min-h-screen bg-base-200">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full navbar bg-base-300">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </label>
                        </div>

                        <div className="flex-1 px-2 mx-2">
                            <span className="text-lg font-bold">{title}</span>
                        </div>
                    </div>

                    {/* Contenuto Principale */}
                    <main className="p-6 bg-base-200">
                        <div className="container mx-auto">
                            {children}
                        </div>
                    </main>
                </div>

                {/* Sidebar */}
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <li><a>Dashboard</a></li>
                        <li><a>Certifica Documento</a></li>
                        <li><a>Storico Certificazioni</a></li>
                        <li><a>Impostazioni</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BaseComponent;