import {useMutation, useQueryClient} from "@tanstack/react-query";
import {DocumentDTO} from "@dti-isin/backend-api-client"
import {calculateDocumentHash} from "../../utils/hashGenerator.ts";
import {JsonRpcSigner} from "ethers";
import {DocumentCertification__factory} from "../../typechain-types";
import {contractAddress} from "../../../config/config.ts";

export const useDocumentCertification = () => {
    const queryClient = useQueryClient();

    return useMutation<string | undefined, Error, {document: DocumentDTO, documentContent: Blob, signer: JsonRpcSigner}>({
        mutationFn: async ({ document, documentContent, signer })=> {
            if(!signer){
                console.log("signer not found");
                return;
            }
            const docHash = await calculateDocumentHash({document, documentContent});
            console.log(docHash);
            const documentCertificationContractForTX = DocumentCertification__factory.connect(contractAddress, signer);
            const tx = await documentCertificationContractForTX.certifyDocument(docHash);
            await tx.wait();

            return docHash;
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