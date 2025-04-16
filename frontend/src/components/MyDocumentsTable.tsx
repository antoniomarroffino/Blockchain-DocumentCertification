import {JsonRpcSigner} from "ethers";
import {useGetAllDocumentsGivenAddressWallet} from "../hook/backend/useGetAllDocumentsGivenAddressWallet.ts";
import MyDocumentRow from "./common/MyDocumentRow.tsx";

interface MyDocumentsTableProps {
    signer: JsonRpcSigner;
}

const MyDocumentsTable = ({signer} : MyDocumentsTableProps) => {
    const {data: documents, isLoading, isError} = useGetAllDocumentsGivenAddressWallet(signer!.address);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="alert alert-error shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Errore nel caricamento dei documenti</span>
                </div>
            </div>
        );
    }


    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                <tr>
                    <th>Document</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {documents?.map((doc) => (
                    <MyDocumentRow document={doc}/>
                ))}
                </tbody>
            </table>
        </div>

    );
}

export default MyDocumentsTable;