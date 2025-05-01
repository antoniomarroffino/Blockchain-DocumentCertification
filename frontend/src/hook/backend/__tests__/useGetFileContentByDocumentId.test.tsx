import React from 'react';
import {renderHook, waitFor} from '@testing-library/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {beforeEach, describe, expect, it, Mock, vi} from 'vitest';
import {useGetFileContentByDocumentId} from '../useGetFileContentByDocumentId';
import {documentApi} from '../../../../config/config';

vi.mock('../../../../config/config', () => ({
    documentApi: {
        documentsIdContentGet: vi.fn(),
    },
}));

describe('useGetFileContentByDocumentId', () => {
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

    it('should fetch and return Blob data on success', async () => {
        const docId = 42;
        const mockContent = 'hello world';
        const mockBlob = {text: async () => mockContent} as Blob;
        (documentApi.documentsIdContentGet as Mock).mockResolvedValue({data: mockBlob});

        const {result} = renderHook(
            () => useGetFileContentByDocumentId(docId),
            {wrapper}
        );

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toBe(mockBlob);

        const text = await result.current.data!.text();
        expect(text).toBe(mockContent);
    });

    it('should set error state when fetch fails', async () => {
        const docId = 99;
        const error = new Error('Download failed');
        (documentApi.documentsIdContentGet as Mock).mockRejectedValue(error);

        const {result} = renderHook(
            () => useGetFileContentByDocumentId(docId),
            {wrapper}
        );

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(result.current.error).toEqual(error);
    });
});
