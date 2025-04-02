import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Document} from "@dti-isin/backend-api-client"
import {documentApi} from "../../config/config.ts";

export const useUploadDocument = () => {
    const queryClient = useQueryClient();

    return useMutation<Document, Error, Document>({
        mutationFn: async (newDocument: Document) => documentApi.documentsPost({document: newDocument})
            .then(response => response.data),
        onSuccess: (uploadedDocument) => {
            queryClient.invalidateQueries({queryKey: ["documents"]});
            queryClient.invalidateQueries({queryKey: ["documents", uploadedDocument.ownerWallet]});
        }
    })
}