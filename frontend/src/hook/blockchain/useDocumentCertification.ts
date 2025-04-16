import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Document} from "@dti-isin/backend-api-client"
import {calculateDocumentHash} from "../../utils/hashGenerator.ts";
import {JsonRpcSigner} from "ethers";
import {DocumentCertification__factory} from "../../typechain-types";
import {contractAddress} from "../../../config/config.ts";

export const useDocumentCertification = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, {document: Document, signer: JsonRpcSigner}>({
        mutationFn: async ({ document, signer })=> {
            if(!signer){
                console.log("signer not found");
                return;
            }
            const docHash = await calculateDocumentHash(document);
            const documentCertificationContractForTX = DocumentCertification__factory.connect(contractAddress, signer);
            const tx = await documentCertificationContractForTX.certifyDocument(docHash);
            await tx.wait();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['documents'] });
        }
    })
}