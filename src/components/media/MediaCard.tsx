import type { MediaSummary } from '../../lib/tmdb'

type MediaCardProps = {
  item: MediaSummary
}

function yearFromDate(date: string) {
  return date.slice(0, 4) || '—'
}

export function MediaCard({ item }: MediaCardProps) {
  return (
    <article className="w-36 shrink-0 sm:w-40">
      <div className="aspect-2/3 overflow-hidden rounded-sm bg-elevated">
        {item.posterUrl ? (
          <img
            src={item.posterUrl}
            alt={item.title}
            className="size-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex size-full items-end p-3 text-sm text-muted">No poster</div>
        )}
      </div>
      <h3 className="mt-2 line-clamp-2 text-sm leading-snug text-paper">{item.title}</h3>
      <p className="mt-0.5 text-xs text-muted">
        {yearFromDate(item.date)}
        <span className="mx-1.5 text-accent">·</span>
        {item.voteAverage.toFixed(1)}
      </p>
    </article>
  )
}
