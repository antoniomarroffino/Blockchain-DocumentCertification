import {useQuery} from "@tanstack/react-query";
import {DocumentDTO} from "@dti-isin/backend-api-client";
import {documentCertificationContractNoTX} from "../../../config/config.ts";

export const useDocumentCertifiersMap = (documents?: DocumentDTO[]) => {
    return useQuery<Record<number, string>, Error>({
        queryKey: ["certifiers-map"],
        queryFn: async () => {
            if (!documents || !documentCertificationContractNoTX)
                throw new Error("Missing documents or contract not available");

            const resultMap: Record<number, string> = {};

            await Promise.all(
                documents.map(async (doc) => {
                    const certifier = await documentCertificationContractNoTX.getCertifierOf(doc.hash!);
                    if (certifier && certifier !== "0x0000000000000000000000000000000000000000") {
                        resultMap[doc.id!] = certifier;
                    }
                })
            );

            return resultMap;
        },
        enabled: !!documents && documents.length > 0,
        staleTime: 1000 * 60 * 10,
        cacheTime: 1000 * 60 * 30,
    });
};

