import {useQuery} from "@tanstack/react-query";
import {Document} from "@dti-isin/backend-api-client"
import {documentApi} from "../../../config/config.ts";

export const useGetAllDocuments = () => {
    return useQuery<Document[], Error>({
        queryKey: ['documents'],
        queryFn: async () => documentApi.documentsGet().then(response => response.data),
        staleTime: 1000 * 60 * 5
    })
}