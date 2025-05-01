import React from 'react';
import {renderHook, waitFor} from '@testing-library/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {beforeEach, describe, expect, it, Mock, vi} from 'vitest';
import {useDocumentCertification} from '../useDocumentCertification';
import {DocumentCertification__factory} from '../../../typechain-types';
import {JsonRpcSigner} from 'ethers';

vi.mock('../../../typechain-types', () => ({
    DocumentCertification__factory: {
        connect: vi.fn(),
    },
}));

describe('useDocumentCertification', () => {
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
        vi.clearAllMocks();
    });

    it('should certify a document successfully', async () => {
        const fakeSigner = {address: '0x123'} as JsonRpcSigner;
        const fakeDocument = {hash: '0xtesthash'};

        const waitMock = vi.fn().mockResolvedValue(undefined);
        const certifyDocumentMock = vi.fn().mockResolvedValue({wait: waitMock});
        (DocumentCertification__factory.connect as Mock).mockReturnValue({
            certifyDocument: certifyDocumentMock,
        });

        const {result} = renderHook(() => useDocumentCertification(), {wrapper});

        result.current.mutate({document: fakeDocument, signer: fakeSigner});

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(DocumentCertification__factory.connect).toHaveBeenCalled();
        expect(certifyDocumentMock).toHaveBeenCalledWith(fakeDocument.hash);
        expect(waitMock).toHaveBeenCalled();
        expect(result.current.data).toBe(fakeDocument.hash);
    });

    it('should not attempt certification if signer or document hash is missing', async () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {
        });

        const fakeSigner = undefined;
        const fakeDocument = {hash: undefined};

        const {result} = renderHook(() => useDocumentCertification(), {wrapper});

        result.current.mutate({document: fakeDocument, signer: fakeSigner as unknown as JsonRpcSigner});

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true); // Anche se non fa nulla, react-query lo considera successo
        });

        expect(consoleSpy).toHaveBeenCalledWith("signer or document hash undefined");

        consoleSpy.mockRestore();
    });

    it('should handle error during certification', async () => {
        const fakeSigner = {address: '0x456'} as JsonRpcSigner;
        const fakeDocument = {hash: '0xerrorhash'};

        const certifyDocumentMock = vi.fn().mockRejectedValue(new Error('Certification failed'));
        (DocumentCertification__factory.connect as Mock).mockReturnValue({
            certifyDocument: certifyDocumentMock,
        });

        const {result} = renderHook(() => useDocumentCertification(), {wrapper});

        result.current.mutate({document: fakeDocument, signer: fakeSigner});

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(result.current.error?.message).toBe('Certification failed');
    });
});
