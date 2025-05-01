import React from 'react';
import {renderHook, waitFor} from '@testing-library/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import type {DocumentDTO} from '@dti-isin/backend-api-client';
import {beforeEach, describe, expect, it, Mock, vi} from 'vitest';
import {useGetAllDocumentsGivenAddressWallet} from '../useGetAllDocumentsGivenAddressWallet.ts';
import {documentApi} from '../../../../config/config.ts';

vi.mock('../../../../config/config.ts', () => ({
    documentApi: {
        documentsMineOwnerWalletGet: vi.fn(),
    },
}));

describe('useGetAllDocumentsGivenAddressWallet', () => {
    let queryClient: QueryClient;
    const wrapper: React.FC<{ children: React.ReactNode }> = ({children}) => (
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
        const ownerWallet = '0x123';
        const mockDocs: DocumentDTO[] = [
            {id: 1, title: 'Doc A'},
            {id: 2, title: 'Doc B'},
        ];
        (documentApi.documentsMineOwnerWalletGet as Mock).mockResolvedValue({data: mockDocs});

        const {result} = renderHook(
            () => useGetAllDocumentsGivenAddressWallet(ownerWallet),
            {wrapper}
        );

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toEqual(mockDocs);
    });

    it('should set error state when fetch fails', async () => {
        const ownerWallet = '0x456';
        const error = new Error('Fetch failed');
        (documentApi.documentsMineOwnerWalletGet as Mock).mockRejectedValue(error);

        const {result} = renderHook(
            () => useGetAllDocumentsGivenAddressWallet(ownerWallet),
            {wrapper}
        );

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(result.current.error).toEqual(error);
    });
});
