import React from "react";
import {renderHook, waitFor} from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {beforeEach, describe, expect, it, vi} from "vitest";
import {useDocumentVerification} from "../useDocumentVerification";

let mockDocumentCertificationContractNoTX: any;

vi.mock("../../../../config/config", () => ({
    get documentCertificationContractNoTX() {
        return mockDocumentCertificationContractNoTX;
    },
}));

describe("useDocumentVerification", () => {
    let queryClient: QueryClient;
    const wrapper: React.FC<{ children: React.ReactNode }> = ({children}) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                    staleTime: 0,
                },
            },
        });
        mockDocumentCertificationContractNoTX = {
            isDocumentCertified: vi.fn().mockName("isDocumentCertified"),
        };
        vi.clearAllMocks();
    });

    it("should verify document certification successfully", async () => {
        const docHash = "valid-hash";
        mockDocumentCertificationContractNoTX.isDocumentCertified.mockResolvedValue(
            true
        );

        const {result} = renderHook(() => useDocumentVerification(docHash), {
            wrapper,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(
            mockDocumentCertificationContractNoTX.isDocumentCertified
        ).toHaveBeenCalledWith(docHash);
        expect(result.current.data).toBe(true);
    });

    it("should return error if contract is not initialized", async () => {
        mockDocumentCertificationContractNoTX = null;
        const docHash = "valid-hash";

        const {result} = renderHook(() => useDocumentVerification(docHash), {
            wrapper,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe(
            "Document Certification contract not initialized!"
        );
    });

    it("should handle contract method errors", async () => {
        const docHash = "valid-hash";
        const errorMessage = "Contract execution error";
        mockDocumentCertificationContractNoTX.isDocumentCertified.mockRejectedValue(
            new Error(errorMessage)
        );

        const {result} = renderHook(() => useDocumentVerification(docHash), {
            wrapper,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe(errorMessage);
    });

    it("should not execute query with empty docHash", async () => {
        renderHook(() => useDocumentVerification(""), {
            wrapper,
        });

        expect(
            mockDocumentCertificationContractNoTX.isDocumentCertified
        ).not.toHaveBeenCalled();
    });

    it("should return false for uncertified document", async () => {
        const docHash = "uncertified-hash";
        mockDocumentCertificationContractNoTX.isDocumentCertified.mockResolvedValue(
            false
        );

        const {result} = renderHook(() => useDocumentVerification(docHash), {
            wrapper,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toBe(false);
    });
});
