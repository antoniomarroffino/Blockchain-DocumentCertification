'use client'

import './App.css'
import {Route, Routes} from "react-router-dom";
import DocumentUploader from "./pages/DocumentUploader.tsx";
import AllDocuments from "./pages/AllDocuments.tsx";
import MyDocuments from "./pages/MyDocuments.tsx";
import {MetamaskProvider} from "./provider/MetamaskProvider.tsx";
import Sidebar from "./components/common/Sidebar.tsx";
import Footer from "./components/common/Footer.tsx";
import Header from "./components/common/Header.tsx";
import {Toaster} from "react-hot-toast";
import Dashboard from "./pages/Dashboard.tsx";


function App() {
    return (
        <MetamaskProvider>
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex flex-1">
                    <Sidebar />
                    <main className="flex-1 p-8 bg-base-200">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/uploadDocument" element={<DocumentUploader />} />
                            <Route path="/myDocuments" element={<MyDocuments />} />
                            <Route path="/allDocuments" element={<AllDocuments />} />
                        </Routes>
                    </main>
                </div>
                <Footer />
            </div>
            <Toaster position="bottom-right" />
        </MetamaskProvider>
    );
}

export default App
