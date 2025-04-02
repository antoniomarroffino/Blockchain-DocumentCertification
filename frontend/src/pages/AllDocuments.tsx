import { DocumentTextIcon } from '@heroicons/react/24/outline';
import {useGetAllDocuments} from "../hook/backend/useGetAllDocuments.ts";

const AllDocuments = () => {
    const { data: documents, isLoading, isError } = useGetAllDocuments();

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
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Errore nel caricamento dei documenti</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-8">Tutti i Documenti</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents?.map((doc) => (
                    <div key={doc.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                        <div className="card-body">
                            <div className="flex items-start mb-4">
                                <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-4" />
                                <div>
                                    <h2 className="card-title">{doc.title}</h2>
                                    <p className="text-sm text-gray-500">{new Date(doc.uploadTimestamp!).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllDocuments;