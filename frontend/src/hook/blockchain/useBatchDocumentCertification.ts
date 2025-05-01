import { useMutation, useQueryClient } from "@tanstack/react-query";
import { JsonRpcSigner } from "ethers";
import { DocumentDTO } from "@dti-isin/backend-api-client";
import { DocumentCertification__factory } from "../../typechain-types";
import { contractAddress } from "../../../config/config.ts";

export const useBatchDocumentCertification = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, { documents: DocumentDTO[], signer: JsonRpcSigner }>({
        mutationFn: async ({ documents, signer }) => {
            if (!signer || documents.length === 0) return;

            const contract = DocumentCertification__factory.connect(contractAddress, signer);
            const hashes = documents.map(doc => doc.hash!).filter(Boolean);

            if (hashes.length === 0) return;

            const tx = await contract.certifyDocuments(hashes);
            await tx.wait();
        },
        onSuccess: (_, { documents, signer }) => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
            documents.forEach(doc => {
                if (doc.hash) {
                    queryClient.invalidateQueries({ queryKey: ["certification", doc.hash] });
                    queryClient.invalidateQueries({ queryKey: ["document-history", doc.hash] });
                }
            });
            if (signer) {
                queryClient.invalidateQueries({ queryKey: ["documents", signer.address] });
            }
        }
    });
};
