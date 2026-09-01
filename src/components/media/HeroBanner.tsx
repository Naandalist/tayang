import { Link } from 'react-router-dom'
import type { MediaSummary } from '../../lib/tmdb'

type HeroBannerProps = {
  item: MediaSummary
}

function yearFromDate(date: string) {
  return date.slice(0, 4) || '—'
}

export function HeroBanner({ item }: HeroBannerProps) {
  return (
    <section className="relative isolate min-h-[72svh] overflow-hidden bg-elevated">
      {item.backdropUrl ? (
        <img
          src={item.backdropUrl}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
      ) : null}
      <div className="absolute inset-0 bg-linear-to-t from-app via-app/70 to-app/20" />
      <div className="relative mx-auto flex min-h-[72svh] max-w-6xl items-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16">
        <div className="max-w-2xl space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-accent">Sedang tayang</p>
          <h1 className="font-display text-4xl font-medium leading-[1.12] tracking-tight sm:text-6xl">
            {item.title}
          </h1>
          <p className="text-sm text-muted">
            {yearFromDate(item.date)}
            <span className="mx-1.5 text-accent">·</span>
            {item.voteAverage.toFixed(1)}
          </p>
          {item.overview ? (
            <p className="max-w-xl text-sm leading-relaxed text-paper/80 sm:text-base">
              {item.overview}
            </p>
          ) : null}
          <Link
            to={`/${item.mediaType}/${item.id}`}
            className="inline-block text-sm text-accent underline-offset-4 hover:underline"
          >
            Lihat detail
          </Link>
        </div>
      </div>
    </section>
  )
}
