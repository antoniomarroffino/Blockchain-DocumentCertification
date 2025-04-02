import {useQuery} from "@tanstack/react-query";
import {documentCertificationContract} from "../../../config/config.ts";


export const useDocumentVerification = (docHash: string) => {
    return useQuery<boolean, Error>({
        queryKey: ['certification', docHash],
        queryFn: async () => {
            if(!documentCertificationContract || !docHash)
                throw new Error("Document Certification contract not initialized!");
            return documentCertificationContract.isDocumentCertified(docHash);
        },
        enabled: !!docHash,
        staleTime: Infinity,
    })
}