import {useQuery} from "@tanstack/react-query";
import {documentCertificationContractNoTX} from "../../../config/config.ts";


export const useDocumentVerification = (docHash: string) => {
    return useQuery<boolean, Error>({
        queryKey: ['certification', docHash],
        queryFn: async () => {
            if(!documentCertificationContractNoTX || !docHash)
                throw new Error("Document Certification contract not initialized!");
            return documentCertificationContractNoTX.isDocumentCertified(docHash);
        },
        enabled: !!docHash,
        staleTime: Infinity,
    })
}