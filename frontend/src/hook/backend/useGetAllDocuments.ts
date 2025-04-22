import {useQuery} from "@tanstack/react-query";
import {DocumentDTO} from "@dti-isin/backend-api-client"
import {documentApi} from "../../../config/config.ts";

export const useGetAllDocuments = () => {
    return useQuery<DocumentDTO[], Error>({
        queryKey: ['documents'],
        queryFn: async () => documentApi.documentsGet().then(response => response.data),
        staleTime: 1000 * 60 * 5
    })
}