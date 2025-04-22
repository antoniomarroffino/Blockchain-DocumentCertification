import {useQuery} from "@tanstack/react-query";
import {documentApi} from "../../../config/config.ts";

export const useGetFileContentByDocumentId = (id: number) => {
    return useQuery<Blob, Error>({
        queryKey: ["document", id, "content"],
        queryFn: async () =>
            documentApi.documentsIdContentGet(
                {id},
                { responseType: "blob" }
            ).then((response) => response.data)
    });
}