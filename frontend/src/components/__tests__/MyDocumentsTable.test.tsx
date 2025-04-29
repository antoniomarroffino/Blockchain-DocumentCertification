import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, Mock } from "vitest";
import type { DocumentDTO } from "@dti-isin/backend-api-client";
import type { JsonRpcSigner } from "ethers";

vi.mock("../../hook/backend/useGetAllDocumentsGivenAddressWallet", () => ({
  useGetAllDocumentsGivenAddressWallet: vi.fn(),
}));
vi.mock("../common/MyDocumentRow", () => ({
  __esModule: true,
  default: vi.fn(({ document }: { document: DocumentDTO }) => (
    <div data-testid="row">{document.title}</div>
  )),
}));

import MyDocumentsTable from "../../pages/my-documents/MyDocumentsTable.tsx";
import { useGetAllDocumentsGivenAddressWallet } from "../../hook/backend/useGetAllDocumentsGivenAddressWallet";

describe("MyDocumentsTable", () => {
  const fakeSigner = { address: "0xABC" } as JsonRpcSigner;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    (useGetAllDocumentsGivenAddressWallet as Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<MyDocumentsTable signer={fakeSigner} />);

    const loadingText = screen.getByText("Loading documents...");
    expect(loadingText).toHaveTextContent("Loading documents...");
  });

  it("renders error state", () => {
    (useGetAllDocumentsGivenAddressWallet as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(<MyDocumentsTable signer={fakeSigner} />);

    const errorTitle = screen.getByText("Error on loading!");
    expect(errorTitle).toHaveTextContent("Error on loading!");
    const errorDetail = screen.getByText("Retry later");
    expect(errorDetail).toHaveTextContent("Retry later");
  });

  it("renders list of documents when data is available", () => {
    const docs: DocumentDTO[] = [
      { id: "1", title: "Doc One" },
      { id: "2", title: "Doc Two" },
    ] as unknown as DocumentDTO[];
    (useGetAllDocumentsGivenAddressWallet as Mock).mockReturnValue({
      data: docs,
      isLoading: false,
      isError: false,
    });

    render(<MyDocumentsTable signer={fakeSigner} />);

    const rows = screen.getAllByTestId("row");
    expect(rows).toHaveLength(docs.length);
    expect(rows[0]).toHaveTextContent("Doc One");
    expect(rows[1]).toHaveTextContent("Doc Two");
    expect(useGetAllDocumentsGivenAddressWallet).toHaveBeenCalledWith(
      fakeSigner.address
    );
  });
});
