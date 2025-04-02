import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Document} from "@dti-isin/backend-api-client"
import {documentCertificationContract} from "../../../config/config.ts";
import {calculateDocumentHash} from "../../utils/hashGenerator.ts";

export const useDocumentCertification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (document: Document)=> {
            if(!documentCertificationContract)
                throw new Error("Document Certification contract not initialized!");
            const docHash = await calculateDocumentHash(document);
            const tx = await documentCertificationContract.certifyDocument(docHash);
            await tx.wait();
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['documents'] });
        }
    })
}