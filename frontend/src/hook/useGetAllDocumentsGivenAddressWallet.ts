import {useQuery} from "@tanstack/react-query";
import {Document} from "@dti-isin/backend-api-client"
import {documentApi} from "../../config/config.ts";

export const useGetAllDocumentsGivenAddressWallet = (ownerWallet: string) => {
    return useQuery<Document[], Error>({
        queryKey: ['documents', ownerWallet],
        queryFn: async () => documentApi.documentsMineOwnerWalletGet({ownerWallet}).then(response => response.data),
        staleTime: 1000 * 60 * 5
    });
}