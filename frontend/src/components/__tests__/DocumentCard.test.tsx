import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, Mock } from "vitest";
import type { DocumentDTO } from "@dti-isin/backend-api-client";
import type { JsonRpcSigner } from "ethers";

vi.mock("../../hook/blockchain/useDocumentCertification", () => ({
  useDocumentCertification: vi.fn(),
}));
vi.mock("../../hook/metamask/useMetamask", () => ({
  useMetamask: vi.fn(),
}));
vi.mock("react-hot-toast", () => ({
  toast: {
    promise: vi.fn((p: Promise<any>) => p),
  },
}));
vi.mock("../CertificationBadge", () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid="badge" />),
}));

import DocumentCard from "../common/DocumentCard.tsx";
import { useMetamask } from "../../hook/metamask/useMetamask";
import { useDocumentCertification } from "../../hook/blockchain/useDocumentCertification";
import { toast } from "react-hot-toast";

describe("DocumentCard", () => {
  const fakeDocument: DocumentDTO = {
    id: "1",
    title: "Test Doc",
    hash: "0xhash",
    uploadTimestamp: new Date("2025-04-01T12:00:00Z").toISOString(),
  } as unknown as DocumentDTO;
  const fakeSigner = { address: "0xABC" } as JsonRpcSigner;
  const mockCertify = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useMetamask as Mock).mockReturnValue({ signer: fakeSigner });
    (useDocumentCertification as Mock).mockReturnValue({
      mutateAsync: mockCertify,
      isPending: false,
    });
  });

  it("renders title and formatted date", () => {
    render(<DocumentCard document={fakeDocument} />);
    expect(screen.getByText("Test Doc")).toBeInTheDocument();
    const formattedDate = new Date(
      fakeDocument.uploadTimestamp!
    ).toLocaleDateString();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it("calls certifyDocument and toast.promise on button click", async () => {
    mockCertify.mockResolvedValue(fakeDocument.hash);
    render(<DocumentCard document={fakeDocument} />);

    const button = screen.getByRole("button", { name: /Certify Now/i });
    fireEvent.click(button);

    expect(useDocumentCertification).toHaveBeenCalled();
    expect(toast.promise).toHaveBeenCalled();
    expect(mockCertify).toHaveBeenCalledWith({
      document: fakeDocument,
      signer: fakeSigner,
    });
  });

  it("disables button and shows overlay when pending", () => {
    (useDocumentCertification as Mock).mockReturnValue({
      mutateAsync: mockCertify,
      isPending: true,
    });
    render(<DocumentCard document={fakeDocument} />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(screen.getByTestId("badge")).toBeInTheDocument();
    expect(document.querySelector(".loading-infinity")).toBeInTheDocument();
  });
});
