import { useQuery } from "@tanstack/react-query";
import { documentApi } from "../../../config/config.ts";

export const useGetFileContentByDocumentId = (id: number) => {
    return useQuery<Blob, Error>({
        queryKey: ["document", id, "content"],
        queryFn: async () => {
            const response = await documentApi.documentsIdContentGet(
                { id },
                {
                    responseType: "blob",
                    transformResponse: (data, headers) => {
                        const contentType = headers?.["content-type"] || "application/octet-stream";
                        return new Blob([data], { type: contentType });
                    },
                }
            );

            const contentType = response.headers?.["content-type"] || "application/octet-stream";
            return new Blob([response.data], { type: contentType });
        },
        enabled: id !== undefined && id !== -1,
    });
};
