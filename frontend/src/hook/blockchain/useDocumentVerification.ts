import {useQuery} from "@tanstack/react-query";
import {documentCertificationContractNoTX} from "../../../config/config.ts";


export const useDocumentVerification = (docHash: string) => {
    return useQuery<boolean, Error>({
        queryKey: ['certification', docHash],
        queryFn: async () => {
            if(!documentCertificationContractNoTX || !docHash)
                throw new Error("Document Certification contract not initialized!");
            console.log("Hash dentro all'hook: " + docHash);
            return documentCertificationContractNoTX.isDocumentCertified(docHash);
        },
        enabled: !!docHash,
        staleTime: 1000 * 60 * 5,
    })
}