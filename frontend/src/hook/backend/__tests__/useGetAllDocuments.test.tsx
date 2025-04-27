import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { DocumentDTO } from '@dti-isin/backend-api-client';
import {vi, describe, beforeEach, it, expect, Mock} from "vitest"
import {useGetAllDocuments} from "../useGetAllDocuments.ts";
import {documentApi} from "../../../../config/config.ts";

vi.mock('../../../../config/config', () => ({
    documentApi: {
        documentsGet: vi.fn(),
    },
}));

describe('useGetAllDocuments', () => {
    let queryClient: QueryClient;
    const wrapper: React.FC<{children: React.ReactNode}> = ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });
    });

    it('should fetch and return document data on success', async () => {
        const mockDocs: DocumentDTO[] = [
            { id: 1, title: 'Doc 1' },
            { id: 2, title: 'Doc 2' },
        ];
        (documentApi.documentsGet as Mock).mockResolvedValue({ data: mockDocs });

        const { result } = renderHook(() => useGetAllDocuments(), { wrapper });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toEqual(mockDocs);
    });

    it('should set error state when fetch fails', async () => {
        const error = new Error('Network Error');
        (documentApi.documentsGet as Mock).mockRejectedValue(error);

        const { result } = renderHook(() => useGetAllDocuments(), { wrapper });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(result.current.error).toEqual(error);
    });
});
