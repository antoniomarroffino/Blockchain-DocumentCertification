import {useQuery} from "@tanstack/react-query";
import {documentCertificationContractNoTX} from "../../../config/config";

export interface Revocation {
    revoker: string;
    timestamp: bigint;
    reason: string;
}

export const useDocumentRevocations = (docHash?: string) => {
    return useQuery<Revocation[], Error>({
        queryKey: ["revocations", docHash],
        queryFn: async () => {
            if (!documentCertificationContractNoTX || !docHash)
                throw new Error("Missing contract or hash");
            return await documentCertificationContractNoTX.getRevocations(docHash);
        },
        enabled: !!docHash,
        staleTime: 1000 * 60 * 5,
    });
};
