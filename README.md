# Tayang

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=fff)](https://vite.dev)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=fff)](https://reactrouter.com)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery&logoColor=fff)](https://tanstack.com/query)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=fff)](https://pnpm.io)

Editorial movie and TV catalog powered by [TMDB](https://www.themoviedb.org/). Dark, restrained UI — not a Netflix clone.

- Repository: [github.com/Naandalist/tayang](https://github.com/Naandalist/tayang)
- Live demo: add the Vercel URL here after the first production deploy

## Features

- Home hero plus catalog rows for movies, TV shows, and popular people
- Detail pages for movies (`/movie/:id`), TV shows (`/tv/:id`), and people (`/person/:id`)
- Mixed search through `/search/multi`
- Watchlist persisted in `localStorage`
- Loading, empty, and error states

## Stack

- React 19 and TypeScript
- Vite 8
- Tailwind CSS v4
- React Router 7
- TanStack Query 5
- Vitest and Playwright
- pnpm

## Installation and usage

### Requirements

- Node.js 20+
- pnpm
- A TMDB account and **API Read Access Token** (JWT starting with `eyJ`), not the short v3 API key

Create a token in [TMDB API settings](https://www.themoviedb.org/settings/api).

### Install

```bash
pnpm install
cp .env.example .env
```

Open `.env` and set:

```bash
VITE_TMDB_TOKEN=your_tmdb_read_access_token
```

### Run

```bash
pnpm dev
```

The app starts at `http://localhost:5173`.

### Build

```bash
pnpm build
pnpm preview
```

### Test

```bash
pnpm test
pnpm exec playwright install chromium
pnpm test:e2e:smoke
pnpm test:e2e
```

CI runs unit tests and the Playwright smoke spec (home, search, 404). Full e2e stays local.

### Deploy

Vercel works with the default Vite preset. Add `VITE_TMDB_TOKEN` as a project environment variable for Production and Preview, then deploy `main`.

Do not commit `.env`.

## Routes

| Path | Page |
| --- | --- |
| `/` | Catalog |
| `/search` | Search titles |
| `/watchlist` | Saved titles |
| `/movie/:id` | Movie detail |
| `/tv/:id` | TV detail |
| `/person/:id` | Person detail |

## TMDB

This product uses the TMDB API but is not endorsed or certified by TMDB. Images and titles belong to their respective owners.
