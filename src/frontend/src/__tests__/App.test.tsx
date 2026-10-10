import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import App from "@/App";
import { PRODUCTS } from "@/data/products";

describe("Rumah Mode landing page", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders header, hero banner, catalog, features and footer without a blank screen", () => {
    render(<App />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Temukan Gaya Anda" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Belanja Tenang, Gaya Terjaga" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("shows the promo banner with a discount badge and a working catalog CTA", () => {
    render(<App />);

    const hero = screen
      .getByRole("heading", { level: 1 })
      .closest("section") as HTMLElement;
    expect(hero).not.toBeNull();
    expect(within(hero).getByText("Diskon 50%")).toBeInTheDocument();

    const cta = within(hero).getByRole("link", { name: /Belanja Sekarang/ });
    expect(cta).toHaveAttribute("href", "#produk");
  });

  it("renders at least 8 products with name and Rupiah price", () => {
    render(<App />);

    const catalog = screen
      .getByRole("heading", { name: "Temukan Gaya Anda" })
      .closest("section") as HTMLElement;
    const items = within(catalog).getAllByRole("article");
    expect(items.length).toBeGreaterThanOrEqual(8);

    const first = items[0];
    expect(within(first).getByRole("heading", { level: 3 })).toHaveTextContent(
      PRODUCTS[0].name,
    );
    expect(within(first).getByText(/Rp\s?189\.000/)).toBeInTheDocument();
  });

  it("filters products in real time as the user types", async () => {
    const user = userEvent.setup();
    render(<App />);

    const catalog = screen
      .getByRole("heading", { name: "Temukan Gaya Anda" })
      .closest("section") as HTMLElement;
    expect(within(catalog).getAllByRole("article")).toHaveLength(
      PRODUCTS.length,
    );

    await user.type(screen.getByLabelText("Cari Produk"), "gaun");

    const items = within(catalog).getAllByRole("article");
    expect(items).toHaveLength(1);
    expect(
      within(items[0]).getByRole("heading", { level: 3 }),
    ).toHaveTextContent("Gaun Midi Wanita Terracotta");
  });

  it("shows an empty state and restores the catalog when no product matches", async () => {
    const user = userEvent.setup();
    render(<App />);

    const catalog = screen
      .getByRole("heading", { name: "Temukan Gaya Anda" })
      .closest("section") as HTMLElement;
    await user.type(screen.getByLabelText("Cari Produk"), "zzz-tidak-ada");

    expect(within(catalog).queryAllByRole("article")).toHaveLength(0);
    expect(
      within(catalog).getByText("Produk tidak ditemukan"),
    ).toBeInTheDocument();

    await user.click(
      within(catalog).getByRole("button", { name: "Tampilkan Semua Produk" }),
    );
    expect(within(catalog).getAllByRole("article")).toHaveLength(
      PRODUCTS.length,
    );
  });

  it("filters by category and sorts by price", async () => {
    const user = userEvent.setup();
    render(<App />);

    const catalog = screen
      .getByRole("heading", { name: "Temukan Gaya Anda" })
      .closest("section") as HTMLElement;

    await user.click(within(catalog).getByRole("tab", { name: "Anak" }));
    const anak = within(catalog).getAllByRole("article");
    expect(anak).toHaveLength(
      PRODUCTS.filter((p) => p.category === "anak").length,
    );

    await user.click(within(catalog).getByRole("tab", { name: "Semua" }));
    await user.selectOptions(
      within(catalog).getByLabelText("Urutkan produk"),
      "termurah",
    );

    const names = within(catalog)
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    const expected = [...PRODUCTS]
      .sort((a, b) => a.price - b.price)
      .map((p) => p.name);
    expect(names).toEqual(expected);
  });

  it("persists category and sort selections across a reload", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    const catalog = screen
      .getByRole("heading", { name: "Temukan Gaya Anda" })
      .closest("section") as HTMLElement;
    await user.click(within(catalog).getByRole("tab", { name: "Wanita" }));
    await user.selectOptions(
      within(catalog).getByLabelText("Urutkan produk"),
      "termahal",
    );

    unmount();
    render(<App />);

    const reloaded = screen
      .getByRole("heading", { name: "Temukan Gaya Anda" })
      .closest("section") as HTMLElement;
    expect(
      within(reloaded).getByRole("tab", { name: "Wanita" }),
    ).toHaveAttribute("aria-selected", "true");
    expect(within(reloaded).getByLabelText("Urutkan produk")).toHaveValue(
      "termahal",
    );

    const names = within(reloaded)
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    const expected = PRODUCTS.filter((p) => p.category === "wanita")
      .sort((a, b) => b.price - a.price)
      .map((p) => p.name);
    expect(names).toEqual(expected);
  });

  it("opens WhatsApp with the product name and price from the Beli button", () => {
    render(<App />);

    const catalog = screen
      .getByRole("heading", { name: "Temukan Gaya Anda" })
      .closest("section") as HTMLElement;
    const first = within(catalog).getAllByRole("article")[0];
    const buy = within(first).getByRole("link", { name: /Beli/ });

    const href = buy.getAttribute("href") ?? "";
    expect(href).toContain("https://wa.me/");
    expect(decodeURIComponent(href)).toContain(PRODUCTS[0].name);
    expect(decodeURIComponent(href)).toContain("Rp");
  });

  it("exposes a floating WhatsApp contact button", () => {
    render(<App />);

    const floating = screen.getByRole("link", {
      name: "Hubungi toko melalui WhatsApp",
    });
    expect(floating).toHaveAttribute(
      "href",
      expect.stringContaining("https://wa.me/"),
    );
  });

  it("opens the product detail modal with a WhatsApp purchase link", async () => {
    const user = userEvent.setup();
    render(<App />);

    const catalog = screen
      .getByRole("heading", { name: "Temukan Gaya Anda" })
      .closest("section") as HTMLElement;
    const first = within(catalog).getAllByRole("article")[0];
    await user.click(
      within(first).getByRole("button", {
        name: `Lihat detail ${PRODUCTS[0].name}`,
      }),
    );

    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).getByRole("heading", { name: PRODUCTS[0].name }),
    ).toBeInTheDocument();
    const buy = within(dialog).getByRole("link", {
      name: /Beli Sekarang via WhatsApp/,
    });
    expect(decodeURIComponent(buy.getAttribute("href") ?? "")).toContain(
      PRODUCTS[0].name,
    );
  });

  it("toggles the mobile navigation menu", async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggle = screen.getByRole("button", { name: "Buka menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(
      screen.getByRole("navigation", { name: "Navigasi seluler" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tutup menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });
});
