import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {beforeEach, describe, expect, it, Mock, vi} from 'vitest';
import { useDocumentCertification } from '../useDocumentCertification';
import { DocumentCertification__factory } from '../../../typechain-types';
import { JsonRpcSigner } from 'ethers';
import { DocumentDTO } from '@dti-isin/backend-api-client';

vi.mock('../../../typechain-types', () => ({
    DocumentCertification__factory: {
        connect: vi.fn(),
    },
}));

describe('useDocumentCertification', () => {
    let queryClient: QueryClient;
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false },
            },
        });
        vi.clearAllMocks();
    });

    it('should certify a document successfully', async () => {
        const fakeSigner = { address: '0x123' } as JsonRpcSigner;
        const fakeDocument = { hash: '0xtesthash', id: 1 } as DocumentDTO;

        const waitMock = vi.fn().mockResolvedValue(undefined);
        const certifyDocumentsMock = vi.fn().mockResolvedValue({ wait: waitMock });
        (DocumentCertification__factory.connect as Mock).mockReturnValue({
            certifyDocuments: certifyDocumentsMock,
        });

        const { result } = renderHook(() => useDocumentCertification(), { wrapper });
        result.current.mutate({ document: fakeDocument, signer: fakeSigner });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(DocumentCertification__factory.connect).toHaveBeenCalledWith(expect.any(String), fakeSigner);
        expect(certifyDocumentsMock).toHaveBeenCalledWith([fakeDocument.hash]);
        expect(waitMock).toHaveBeenCalled();
        expect(result.current.data).toBe(fakeDocument.hash);
    });

    it('should not attempt certification if signer or document hash is missing', async () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        const fakeSigner = undefined;
        const fakeDocument = { hash: undefined } as DocumentDTO;

        const { result } = renderHook(() => useDocumentCertification(), { wrapper });
        result.current.mutate({ document: fakeDocument, signer: fakeSigner! as JsonRpcSigner });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(consoleSpy).toHaveBeenCalledWith('signer or document hash undefined');
        consoleSpy.mockRestore();
    });

    it('should handle error during certification', async () => {
        const fakeSigner = { address: '0x456' } as JsonRpcSigner;
        const fakeDocument = { hash: '0xerrorhash', id: 2 } as DocumentDTO;

        const certifyDocumentsMock = vi.fn().mockRejectedValue(new Error('Certification failed'));
        (DocumentCertification__factory.connect as Mock).mockReturnValue({
            certifyDocuments: certifyDocumentsMock,
        });

        const { result } = renderHook(() => useDocumentCertification(), { wrapper });
        result.current.mutate({ document: fakeDocument, signer: fakeSigner });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(result.current.error?.message).toBe('Certification failed');
    });
});
