import {useMutation, useQueryClient} from "@tanstack/react-query";
import {documentApi} from "../../../config/config.ts";
import { DocumentDTO } from "@dti-isin/backend-api-client";

export interface UploadPayload {
    title: string;
    ownerWallet: string;
    file: File;
}

export const useUploadDocument = () => {
    const queryClient = useQueryClient();

    return useMutation<DocumentDTO, Error, UploadPayload>({
        mutationFn: async ({ title, ownerWallet, file }) => documentApi.documentsPost({
            title,
            ownerWallet,
            file
        }).then(response => response.data),
        onSuccess: (uploadedDocument) => {
            queryClient.invalidateQueries({queryKey: ["documents"]});
            queryClient.invalidateQueries({queryKey: ["documents", uploadedDocument.ownerWallet]});
        }
    })
}