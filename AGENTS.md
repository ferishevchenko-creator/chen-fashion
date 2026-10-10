# Project Guidance

## User Preferences

- Bahasa Indonesia untuk seluruh antarmuka
- Banner promosi di bagian atas halaman
- Produk menampilkan gambar dan harga dalam format Rupiah
- Kolom pencarian produk di atas katalog
- Tombol 'Beli Sekarang' membuka WhatsApp dengan pesan produk

## Verified Commands

- **typecheck**: `pnpm typecheck`
- **fix**: `pnpm fix`
- **build**: `pnpm build`

## Learnings

- Tailwind emits no CSS for a color absent from theme.extend.colors, so bg-<token> silently renders transparent even when the CSS variable exists in index.css.
- Motoko string literals do not support backslash line-continuation; build long Markdown/Text values with # concatenation of adjacent string literals instead.
- Generated image filenames include a .dim_WxH suffix — reference the exact returned filename in source.
- biome organizeImports requires import groups sorted; running pnpm fix after writing all files resolves it in one pass.
- The full frontend check sequence (pnpm typecheck && pnpm fix && pnpm build) passes cleanly on this app.
