import {useNavigate} from 'react-router-dom';
import {DocumentTextIcon} from '@heroicons/react/24/outline';
import {useGetAllDocumentsGivenAddressWallet} from "../hook/backend/useGetAllDocumentsGivenAddressWallet.ts";
import {signer} from "../../config/config.ts";

const MyDocuments = () => {
    const {data: documents, isLoading, isError} = useGetAllDocumentsGivenAddressWallet(signer.address);
    const navigate = useNavigate();

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
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">I miei Documenti</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/uploadDocument')}
                >
                    Carica Nuovo
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Documento</th>
                        <th>Data</th>
                    </tr>
                    </thead>
                    <tbody>
                    {documents?.map((doc) => (
                        <tr key={doc.id}>
                            <td>
                                <div className="flex items-center">
                                    <DocumentTextIcon className="h-6 w-6 text-blue-600 mr-4"/>
                                    <span>{doc.title}</span>
                                </div>
                            </td>
                            <td>{new Date(doc.uploadTimestamp!).toLocaleDateString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDocuments;