# Tayang

Katalog film dan serial. Data dari [TMDB](https://www.themoviedb.org/), tampilan editorial gelap, bukan clone Netflix.

Repo: [github.com/Naandalist/tayang](https://github.com/Naandalist/tayang)

## Fitur

- Beranda dengan hero dan empat baris: sedang tayang, populer, nilai tertinggi, akan datang
- Halaman detail film (`/movie/:id`) dan serial (`/tv/:id`)
- Pencarian campuran lewat `/search/multi`
- Watchlist tersimpan di `localStorage`
- State loading, kosong, dan error

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- React Router 7
- TanStack Query 5
- pnpm

## Menjalankan lokal

Butuh Node 20+ dan pnpm.

```bash
pnpm install
cp .env.example .env
```

Isi `VITE_TMDB_TOKEN` dengan **API Read Access Token** (JWT yang diawali `eyJ`), bukan API Key v3. Token diambil di [TMDB API settings](https://www.themoviedb.org/settings/api).

```bash
pnpm dev
```

Build produksi:

```bash
pnpm build
pnpm preview
```

## Rute

| Path | Halaman |
| --- | --- |
| `/` | Katalog |
| `/search` | Cari judul |
| `/watchlist` | Judul tersimpan |
| `/movie/:id` | Detail film |
| `/tv/:id` | Detail serial |

## Deploy

Cocok di Vercel. Set environment variable `VITE_TMDB_TOKEN` di project settings, lalu deploy dari branch `main`.

Jangan commit file `.env`.

## TMDB

This product uses the TMDB API but is not endorsed or certified by TMDB. Image and title data belong to their respective owners.
