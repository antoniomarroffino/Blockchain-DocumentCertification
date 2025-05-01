'use client'

import './App.css'
import {Route, Routes} from "react-router-dom";
import DocumentUploaderPage from "./pages/document-uploader/DocumentUploaderPage.tsx";
import AllDocumentsPage from "./pages/all-documents/AllDocumentsPage.tsx";
import MyDocumentsPage from "./pages/my-documents/MyDocumentsPage.tsx";
import {MetamaskProvider} from "./provider/MetamaskProvider.tsx";
import Sidebar from "./components/common/Sidebar.tsx";
import Footer from "./components/common/Footer.tsx";
import Header from "./components/common/Header.tsx";
import {Toaster} from "react-hot-toast";
import DashboardPage from "./pages/dashboard/DashboardPage.tsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";
import MyCertifiedDocumentsPage from "./pages/my-certified-documents/MyCertifiedDocumentsPage.tsx";
import DocumentDetailsPage from "./pages/document-details/DocumentDetailsPage.tsx";
import AdminDashboardPage from "./pages/admin-dashboard/AdminDashboardPage.tsx";
import AdminRouteGuard from "./pages/admin-dashboard/AdminRouteGuard.tsx";
import CertifierGuard from "./pages/all-documents/CertifierGuard.tsx";


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
                                <Route path="/" element={<DashboardPage />} />
                                <Route path="/uploadDocument" element={<DocumentUploaderPage />} />
                                <Route path="/myDocuments" element={<MyDocumentsPage />} />
                                <Route path="/myCertifiedDocuments" element={
                                    <CertifierGuard>
                                        <MyCertifiedDocumentsPage />
                                    </CertifierGuard>} />
                                <Route path="/allDocuments" element={<AllDocumentsPage />} />
                                <Route path="/profile" element={<ProfilePage />} />
                                <Route path="/document-details/:hash" element={<DocumentDetailsPage />} />
                                <Route path="/admin" element={
                                    <AdminRouteGuard>
                                        <AdminDashboardPage />
                                    </AdminRouteGuard>
                                } />
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
