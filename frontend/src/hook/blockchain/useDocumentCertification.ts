import {useMutation, useQueryClient} from "@tanstack/react-query";
import {DocumentDTO} from "@dti-isin/backend-api-client"
import {JsonRpcSigner} from "ethers";
import {DocumentCertification__factory} from "../../typechain-types";
import {contractAddress} from "../../../config/config.ts";

export const useDocumentCertification = () => {
    const queryClient = useQueryClient();

    return useMutation<string | undefined, Error, {document: DocumentDTO,  signer: JsonRpcSigner}>({
        mutationFn: async ({ document,  signer })=> {
            if(!signer || !document.hash){
                console.log("signer or document hash undefined");
                return;
            }
            const documentCertificationContractForTX = DocumentCertification__factory.connect(contractAddress, signer);
            const tx = await documentCertificationContractForTX.certifyDocument(document.hash);
            await tx.wait();

            return document.hash;
        },
        onSuccess: (docHash, parameters) => {
            queryClient.invalidateQueries({
                queryKey: ['documents']
            });
            queryClient.invalidateQueries({
                queryKey: ['certification', docHash]
            });
            queryClient.invalidateQueries({
                queryKey: ['documents', parameters.signer?.address]
            });
        }
    })
}