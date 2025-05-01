import {render, screen} from "@testing-library/react";
import {beforeEach, describe, expect, it, Mock, vi} from "vitest";
import '@testing-library/jest-dom';
import CertificationBadge from "../../pages/my-documents/CertificationBadge.tsx";
import {useDocumentVerification} from "../../hook/blockchain/useDocumentVerification";


vi.mock("../../hook/blockchain/useDocumentVerification", () => ({
    useDocumentVerification: vi.fn(),
}));

describe("CertificationBadge", () => {
    const mockUseVerification = useDocumentVerification as unknown as Mock;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders loading badge when verifying", () => {
        mockUseVerification.mockReturnValue({data: undefined, isLoading: true});

        render(<CertificationBadge docHash="0xabc"/>);
        const badge = screen.getByText(/Verify.../i);
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass("opacity-50");
    });

    it("renders not certified state when verification false", () => {
        mockUseVerification.mockReturnValue({data: false, isLoading: false});

        render(<CertificationBadge docHash="0xabc"/>);
        const badge = screen.getByText(/Not certified/i);
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass("badge-warning");
        expect(badge).toHaveClass("animate-text-pulse");
    });

    it("renders certified state and calls setIsCertified when true", () => {
        const setCertified = vi.fn();
        mockUseVerification.mockReturnValue({data: true, isLoading: false});

        render(
            <CertificationBadge docHash="0xabc" setIsCertified={setCertified}/>
        );
        const badge = screen.getByText(/Certified/i);
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass("badge-success");
        expect(setCertified).toHaveBeenCalledWith(true);
    });

    it("does not call setIsCertified when not provided", () => {
        mockUseVerification.mockReturnValue({data: true, isLoading: false});

        render(<CertificationBadge docHash="0xabc"/>);
        expect(screen.getByText(/Certified/i)).toBeInTheDocument();
    });
});
