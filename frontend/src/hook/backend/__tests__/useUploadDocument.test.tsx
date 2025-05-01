import React from 'react';
import {act, renderHook, waitFor} from '@testing-library/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {beforeEach, describe, expect, it, Mock, vi} from 'vitest';
import {UploadPayload, useUploadDocument} from '../useUploadDocument';
import {documentApi} from '../../../../config/config';
import {calculateDocumentHash} from '../../../utils/hashGenerator';
import type {DocumentDTO} from '@dti-isin/backend-api-client';

vi.mock('../../../../config/config', () => ({
    documentApi: {
        documentsPost: vi.fn(),
    },
}));
vi.mock('../../../utils/hashGenerator', () => ({
    calculateDocumentHash: vi.fn(),
}));

describe('useUploadDocument', () => {
    let queryClient: QueryClient;
    const wrapper: React.FC<{ children: React.ReactNode }> = ({children}) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: {queries: {retry: false}},
        });
    });

    it('should upload document and invalidate queries on success', async () => {
        const payload: UploadPayload = {
            title: 'Test Doc',
            ownerWallet: '0xabc',
            file: new File(['file content'], 'test.txt', {type: 'text/plain'}),
        };
        const fakeHash = 'fakehash123';
        const uploaded: DocumentDTO = {id: 1, title: payload.title, ownerWallet: payload.ownerWallet} as DocumentDTO;

        (calculateDocumentHash as Mock).mockResolvedValue(fakeHash);
        (documentApi.documentsPost as Mock).mockResolvedValue({data: uploaded});

        const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

        const {result} = renderHook(() => useUploadDocument(), {wrapper});

        await act(async () => {
            await result.current.mutateAsync(payload);
        });

        expect(calculateDocumentHash).toHaveBeenCalledWith({
            title: payload.title,
            ownerWallet: payload.ownerWallet,
            documentContent: payload.file,
        });
        expect(documentApi.documentsPost).toHaveBeenCalledWith({
            title: payload.title,
            ownerWallet: payload.ownerWallet,
            hash: fakeHash,
            file: payload.file,
        });

        expect(invalidateSpy).toHaveBeenCalledWith({queryKey: ['documents']});
        expect(invalidateSpy).toHaveBeenCalledWith({queryKey: ['documents', payload.ownerWallet]});

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual(uploaded);
    });

    it('should set error state when mutation fails', async () => {
        const payload: UploadPayload = {title: 'Fail', ownerWallet: '0xdef', file: new File([], 'empty.txt')};
        const error = new Error('Upload failed');

        (calculateDocumentHash as Mock).mockResolvedValue('hash');
        (documentApi.documentsPost as Mock).mockRejectedValue(error);

        const {result} = renderHook(() => useUploadDocument(), {wrapper});

        await act(async () => {
            try {
                await result.current.mutateAsync(payload);
            } catch { /* empty */
            }
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error).toEqual(error);
    });
});
