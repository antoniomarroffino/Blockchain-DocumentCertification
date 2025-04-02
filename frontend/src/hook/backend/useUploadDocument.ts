import {useMutation, useQueryClient} from "@tanstack/react-query";
import {documentApi} from "../../../config/config.ts";
import { DocumentDTO, Document } from "@dti-isin/backend-api-client";

export const useUploadDocument = () => {
    const queryClient = useQueryClient();

    return useMutation<Document, Error, DocumentDTO>({
        mutationFn: async (documentDTO: DocumentDTO) => documentApi.documentsPost({
            documentDTO
        }).then(response => response.data),
        onSuccess: (uploadedDocument) => {
            queryClient.invalidateQueries({queryKey: ["documents"]});
            queryClient.invalidateQueries({queryKey: ["documents", uploadedDocument.ownerWallet]});
        }
    })
}