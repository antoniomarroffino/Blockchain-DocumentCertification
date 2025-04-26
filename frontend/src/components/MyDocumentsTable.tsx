import { JsonRpcSigner } from "ethers";
import { useGetAllDocumentsGivenAddressWallet } from "../hook/backend/useGetAllDocumentsGivenAddressWallet.ts";
import MyDocumentRow from "./common/MyDocumentRow.tsx";

interface MyDocumentsTableProps {
    signer: JsonRpcSigner;
}

const MyDocumentsTable = ({ signer }: MyDocumentsTableProps) => {
    const { data: documents, isLoading, isError } = useGetAllDocumentsGivenAddressWallet(signer.address);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <span className="loading loading-infinity loading-lg text-primary"></span>
                <p className="text-gray-500">Loading documents...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="alert alert-error shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="stroke-current shrink-0 h-6 w-6"
                     fill="none"
                     viewBox="0 0 24 24">
                    <path strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                    <h3 className="font-bold">Error on loading!</h3>
                    <div className="text-xs">Retry later</div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="hidden md:block">
                <table className="table">
                    <thead className="bg-base-200">
                    <tr>
                        <th className="w-1/2">Document</th>
                        <th>Date</th>
                        <th>State</th>
                        <th>Acions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {documents?.map((doc) => (
                        <MyDocumentRow key={doc.id} document={doc} />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyDocumentsTable;