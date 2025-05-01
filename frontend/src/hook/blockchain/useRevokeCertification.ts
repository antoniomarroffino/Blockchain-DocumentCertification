import { useMutation, useQueryClient } from "@tanstack/react-query";
import { JsonRpcSigner } from "ethers";
import { DocumentCertification__factory } from "../../typechain-types";
import { contractAddress } from "../../../config/config";

interface Params {
    docHash: string;
    reason: string;
    signer: JsonRpcSigner;
}

export const useRevokeCertification = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, Params>({
        mutationFn: async ({ docHash, reason, signer }) => {
            if (!signer || !docHash || !reason.trim()) {
                throw new Error("Missing signer, hash or reason");
            }

            const contract = DocumentCertification__factory.connect(contractAddress, signer);
            const tx = await contract.revokeCertification(docHash, reason);
            await tx.wait();
        },
        onSuccess: (_, { docHash, signer }) => {
            queryClient.invalidateQueries({ queryKey: ["document-history", docHash] });
            queryClient.invalidateQueries({ queryKey: ["revocations", docHash] });

            if (signer) {
                queryClient.invalidateQueries({
                    queryKey: ["remainingRevocations", docHash, signer.address],
                });
            }
        },
    });
};
