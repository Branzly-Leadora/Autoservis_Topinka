import { render, screen } from "@testing-library/react";
import App from "./App";

test("zobrazí hlavní CTA pro objednání termínu", () => {
  render(<App />);
  const cta = screen.getAllByRole("link", { name: /objednat termín/i });
  expect(cta.length).toBeGreaterThan(0);
  expect(cta[0]).toHaveAttribute("href", "tel:+420377385154");
});

test("zobrazí nabídku služeb STK", () => {
  render(<App />);
  expect(screen.getAllByText(/měření emisí/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/evidenční kontrola/i).length).toBeGreaterThan(0);
});

test("zobrazí kontaktní údaje stanice", () => {
  render(<App />);
  expect(screen.getAllByText(/nade mží 1108\/15/i).length).toBeGreaterThan(0);
});
