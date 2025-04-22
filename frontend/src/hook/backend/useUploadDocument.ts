import {useMutation, useQueryClient} from "@tanstack/react-query";
import {documentApi} from "../../../config/config.ts";
import {DocumentDTO} from "@dti-isin/backend-api-client";
import {calculateDocumentHash} from "../../utils/hashGenerator.ts";

export interface UploadPayload {
    title: string;
    ownerWallet: string;
    file: File;
}

export const useUploadDocument = () => {
    const queryClient = useQueryClient();

    return useMutation<DocumentDTO, Error, UploadPayload>({
        mutationFn: async ({title, ownerWallet, file}) => {
            const hash = await calculateDocumentHash({title, ownerWallet, documentContent: file});
            return documentApi.documentsPost({
                title,
                ownerWallet,
                hash,
                file
            }).then(response => response.data)
        },
        onSuccess: (uploadedDocument) => {
            queryClient.invalidateQueries({queryKey: ["documents"]});
            queryClient.invalidateQueries({queryKey: ["documents", uploadedDocument.ownerWallet]});
        }
    })
}