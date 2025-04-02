import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Document} from "@dti-isin/backend-api-client"
import {documentCertificationContractForTX} from "../../../config/config.ts";
import {calculateDocumentHash} from "../../utils/hashGenerator.ts";

export const useDocumentCertification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (document: Document)=> {
            if(!documentCertificationContractForTX)
                throw new Error("Document Certification contract not initialized!");
            const docHash = await calculateDocumentHash(document);
            console.log(docHash);
            const tx = await documentCertificationContractForTX.certifyDocument(docHash);
            await tx.wait();
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['documents'] });
        }
    })
}