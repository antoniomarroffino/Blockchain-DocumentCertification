import {renderHook} from "@testing-library/react";
import {useMetamask} from "../useMetamask";
import type {Mock} from "vitest";
import {describe, expect, it, vi} from "vitest";
import {useContext} from "react";
import {MetamaskContext} from "../../../context/MetamaskContext";

vi.mock("react", () => ({
    ...vi.importActual("react"),
    useContext: vi.fn(),
    createContext: vi.fn(),
}));

describe("useMetamask", () => {
    const mockContextValue = {
        connectWithMetamask: vi.fn(),
        signer: undefined,
        isLoading: false,
        isConnected: true,
        balance: "1.0",
        network: "localhost",
        chainId: 1337,
    };

    it("should throw error when context is undefined", () => {
        (useContext as Mock).mockReturnValue(undefined);

        const consoleError = vi
            .spyOn(console, "error")
            .mockImplementation(() => {
            });

        expect(() => renderHook(() => useMetamask())).toThrowError(
            "useMetamask must be used within a MetamaskProvider"
        );

        consoleError.mockRestore();
    });

    it("should return context when available", () => {
        (useContext as Mock).mockReturnValue(mockContextValue);

        const {result} = renderHook(() => useMetamask());

        expect(result.current).toMatchObject(mockContextValue);
        expect(useContext).toHaveBeenCalledWith(MetamaskContext);
    });

    it("should maintain referential equality between renders", () => {
        (useContext as Mock).mockReturnValue(mockContextValue);

        const {result, rerender} = renderHook(() => useMetamask());
        const firstResult = result.current;

        rerender();

        expect(result.current).toBe(firstResult);
    });
});
