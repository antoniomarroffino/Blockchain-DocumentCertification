import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeAll } from "vitest";

vi.mock("../../assets/supsi-logo.png", () => "supsi-logo.png");

import Footer from "../Footer";

describe("Footer component", () => {
  beforeAll(() => {
    const RealDate = Date;
    // @ts-ignore
    global.Date = class extends RealDate {
      constructor(...args: any[]) {
        if (args.length === 0) {
          super("2025-01-01T00:00:00Z");
        } else {
          super(...args);
        }
      }
    };
  });

  it("renders SUPSI logo with correct src and alt", () => {
    render(<Footer />);
    const logo = screen.getByAltText("SUPSI Logo") as HTMLImageElement;
    expect(logo).toBeInTheDocument();
    expect(logo.src).toContain("supsi-logo.png");
  });

  it("displays current year and branding text", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(`© ${year} CertifyChain`))
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Made with ❤️ and ☕ in Lugano/)
    ).toBeInTheDocument();
  });

  it("renders developer cards with names and roles", () => {
    render(<Footer />);
    expect(screen.getByText("Antonio Marroffino")).toBeInTheDocument();
    expect(screen.getByText("Luca Fantò")).toBeInTheDocument();

    const roles = screen.getAllByText("Full Stack Developer");
    expect(roles).toHaveLength(2);
  });

  it("renders correct number of social links and verifies hrefs", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(6);
    const hrefs = links.map((link) => link.getAttribute("href"));
    expect(hrefs).toEqual(
      expect.arrayContaining([
        "https://instagram.com/anto.marro",
        "https://github.com/antoniomarroffino",
        "https://www.linkedin.com/in/antoniomarroffino",
        "https://instagram.com/luca_fanto_",
        "https://github.com/lucafanto",
        "https://www.linkedin.com/in/luca-fant%C3%B2-14197232a/",
      ])
    );
  });
});
