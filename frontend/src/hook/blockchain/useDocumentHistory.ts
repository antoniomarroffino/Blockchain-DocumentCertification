import { useQuery } from "@tanstack/react-query";
import { documentCertificationContractNoTX } from "../../../config/config.ts";

export type Certification = {
    hash: string;
    certifier: string;
    timestamp: bigint;
};

export const useDocumentHistory = (docHash?: string) => {
    return useQuery<Certification[], Error>({
        queryKey: ["document-history", docHash],
        queryFn: async () => {
            if (!documentCertificationContractNoTX || !docHash) {
                throw new Error("Missing contract or hash");
            }

            const [certifiers, timestamps, hashes] =
                await documentCertificationContractNoTX.getDocumentHistoryFlat(docHash);

            return certifiers.map((certifier, index) => ({
                certifier,
                timestamp: timestamps[index],
                hash: hashes[index],
            }));
        },
        enabled: !!docHash,
        staleTime: 1000 * 60 * 5
    });
};
