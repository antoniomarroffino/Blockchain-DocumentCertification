import { useQuery } from "@tanstack/react-query";
import { documentApi } from "../../../config/config.ts";

export const useGetFileContentByDocumentId = (id: number) => {
    return useQuery<Blob, Error>({
        queryKey: ["document", id, "content"],
        enabled: id !== -1,
        queryFn: async () => {
            const response = await documentApi.documentsIdContentGet(
                { id },
                { responseType: "blob" }
            );
            const contentType = response.headers?.['content-type'] ?? 'application/octet-stream';
            return new Blob([response.data], { type: contentType });
        }
    });
};
