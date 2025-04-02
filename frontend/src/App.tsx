import './App.css'
import BaseComponent from "./components/BaseComponent.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Route, Routes} from "react-router-dom";
import DocumentUploader from "./components/DocumentUploader.tsx";
import AllDocuments from "./pages/AllDocuments.tsx";
import MyDocuments from "./pages/MyDocuments.tsx";

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
            <Routes>
                <Route path={"/"} element={<BaseComponent />} />
                <Route path={"/uploadDocument"} element={<DocumentUploader />} />
                <Route path={"/myDocuments"} element={<MyDocuments />} />
                <Route path={"/allDocuments"} element={<AllDocuments />} />
            </Routes>
        </QueryClientProvider>
    );
}

export default App
