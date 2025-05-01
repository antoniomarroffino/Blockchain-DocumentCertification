import {useQuery} from "@tanstack/react-query";
import {documentCertificationContractNoTX} from "../../../config/config";

export const useRemainingRevocations = (docHash?: string, address?: string) => {
    return useQuery<number>({
        queryKey: ["remainingRevocations", docHash, address],
        queryFn: async () => {
            if (!docHash || !address || !documentCertificationContractNoTX) return 0;

            const [certs, revokes] = await Promise.all([
                documentCertificationContractNoTX.getDocumentHistoryFlat(docHash),
                documentCertificationContractNoTX.getRevocations(docHash),
            ]);

            const certCount = certs.certifiers.filter(c => c.toLowerCase() === address.toLowerCase()).length;
            const revokeCount = revokes.filter(r => r.revoker.toLowerCase() === address.toLowerCase()).length;

            return certCount - revokeCount;
        },
        enabled: !!docHash && !!address,
        staleTime: 1000 * 60 * 5,
    });
};
