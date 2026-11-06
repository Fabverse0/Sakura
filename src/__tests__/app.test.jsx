import { render, screen } from "@testing-library/react";
import { StrictMode } from "react";
import { describe, expect, it } from "vitest";
import App from "../App.jsx";
import { ToastProvider } from "../components/Toast.jsx";

describe("App", () => {
  it("renders every room in StrictMode", () => {
    render(
      <StrictMode>
        <ToastProvider>
          <App />
        </ToastProvider>
      </StrictMode>,
    );
    expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(/Satu lanskap/);
    for (const name of [
      /Perhatikan detailnya/,
      /Lensa pandang/,
      /Temukan detail/,
      /Tiga sajak pendek/,
      /Rute pandang/,
      /Empat musim/,
      /Palet lukisan/,
      /Jeda 30 detik/,
      /Jurnal pandang/,
      /Kanvas sumi/,
    ]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeTruthy();
    }
  });
});
