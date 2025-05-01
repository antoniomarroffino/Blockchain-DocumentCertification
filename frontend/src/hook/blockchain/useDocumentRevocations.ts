import {useQuery} from "@tanstack/react-query";
import {documentCertificationContractNoTX} from "../../../config/config";

export interface Revocation {
    revoker: string;
    timestamp: number;
    reason: string;
}

export const useDocumentRevocations = (docHash?: string) => {
    return useQuery<Revocation[], Error>({
        queryKey: ["revocations", docHash],
        queryFn: async () => {
            if (!documentCertificationContractNoTX || !docHash)
                throw new Error("Missing contract or hash");

            const raw = await documentCertificationContractNoTX.getRevocations(docHash);

            return raw.map(r => ({
                revoker: r.revoker,
                reason: r.reason,
                timestamp: Number(r.timestamp),
            }));
        },
        enabled: !!docHash,
        staleTime: 1000 * 60 * 5,
    });
};
