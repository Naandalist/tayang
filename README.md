# Tayang

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=fff)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=fff)](https://reactrouter.com)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery&logoColor=fff)](https://tanstack.com/query)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=fff)](https://pnpm.io)
[![TMDB](https://img.shields.io/badge/API-TMDB-01B4E4)](https://www.themoviedb.org)

Editorial movie and TV catalog powered by [TMDB](https://www.themoviedb.org/). Dark, restrained UI — not a Netflix clone.

Repository: [github.com/Naandalist/tayang](https://github.com/Naandalist/tayang)

## Features

- Home hero plus four rows: now playing, popular, top rated, upcoming
- Title pages for movies (`/movie/:id`) and TV shows (`/tv/:id`)
- Mixed search through `/search/multi`
- Watchlist persisted in `localStorage`
- Loading, empty, and error states

## Stack

- React 19 and TypeScript
- Vite 8
- Tailwind CSS v4
- React Router 7
- TanStack Query 5
- pnpm

## Local setup

Node 20+ and pnpm are required.

```bash
pnpm install
cp .env.example .env
```

Set `VITE_TMDB_TOKEN` to a TMDB **API Read Access Token** (the JWT that starts with `eyJ`), not the short v3 API key. Create one in [TMDB API settings](https://www.themoviedb.org/settings/api).

```bash
pnpm dev
```

Production build:

```bash
pnpm build
pnpm preview
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Catalog |
| `/search` | Search titles |
| `/watchlist` | Saved titles |
| `/movie/:id` | Movie detail |
| `/tv/:id` | TV detail |

## Deploy

Vercel works with the default Vite preset. Add `VITE_TMDB_TOKEN` in the project environment variables, then deploy `main`.

Do not commit `.env`.

## TMDB

This product uses the TMDB API but is not endorsed or certified by TMDB. Images and titles belong to their respective owners.
