'use client'

import './App.css'
import {Route, Routes} from "react-router-dom";
import DocumentUploaderPage from "./pages/document-uploader/DocumentUploaderPage.tsx";
import AllDocuments from "./pages/AllDocuments.tsx";
import MyDocuments from "./pages/MyDocuments.tsx";
import {MetamaskProvider} from "./provider/MetamaskProvider.tsx";
import Sidebar from "./components/common/Sidebar.tsx";
import Footer from "./components/common/Footer.tsx";
import Header from "./components/common/Header.tsx";
import {Toaster} from "react-hot-toast";
import Dashboard from "./pages/Dashboard.tsx";
import Profile from "./pages/Profile.tsx";


function App() {
    return (
        <MetamaskProvider>
            <div className="min-h-screen flex flex-col bg-neutral-900">
                <Header />
                <div className="drawer lg:drawer-open">
                    <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col">
                        <main className="flex-1 p-4 md:p-8 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/uploadDocument" element={<DocumentUploaderPage />} />
                                <Route path="/myDocuments" element={<MyDocuments />} />
                                <Route path="/allDocuments" element={<AllDocuments />} />
                                <Route path="/profile" element={<Profile />} />
                            </Routes>
                        </main>
                    </div>
                    <div className="drawer-side z-50">
                        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
                        <Sidebar />
                    </div>
                </div>
                <Footer />
            </div>
            <Toaster position="bottom-right" />
        </MetamaskProvider>
    );
}

export default App;
