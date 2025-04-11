'use client'

import './App.css'
import BaseComponent from "./components/BaseComponent.tsx";
import {Route, Routes} from "react-router-dom";
import DocumentUploader from "./components/DocumentUploader.tsx";
import AllDocuments from "./pages/AllDocuments.tsx";
import MyDocuments from "./pages/MyDocuments.tsx";
import {useMetamask} from "./hook/useMetamask.ts";


function App() {
    const {signer, connectWithMetamask} = useMetamask();

    return (
        <>
            <div onClick={connectWithMetamask}>
                login with metamask
            </div>
            {signer && (
                <div>
                    <h3>Account Details: {signer.address}</h3>
                </div>
            )}
            <Routes>
                <Route path={"/"} element={<BaseComponent/>}/>
                <Route path={"/uploadDocument"} element={<DocumentUploader/>}/>
                <Route path={"/myDocuments"} element={<MyDocuments/>}/>
                <Route path={"/allDocuments"} element={<AllDocuments/>}/>
            </Routes>
        </>
    );
}

export default App
