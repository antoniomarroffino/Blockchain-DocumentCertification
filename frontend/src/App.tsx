import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Route, Routes} from "react-router-dom";
import DocumentUploader from "./components/DocumentUploader.tsx";
import AllDocuments from "./pages/AllDocuments.tsx";
import MyDocuments from "./pages/MyDocuments.tsx";
import Footer from "./components/common/Footer.tsx";
import HomePage from "./components/HomePage.tsx";
import Sidebar from "./components/common/Sidebar.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            refetchOnMount: true,
        }
    }
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex flex-col flex-1 ml-64">
                    <main className="flex-1">
                        <Routes>
                            <Route path={"/"} element={<HomePage />} />
                            <Route path={"/uploadDocument"} element={<DocumentUploader />} />
                            <Route path={"/myDocuments"} element={<MyDocuments />} />
                            <Route path={"/allDocuments"} element={<AllDocuments />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>

            </div>
        </QueryClientProvider>
    );
}

export default App
