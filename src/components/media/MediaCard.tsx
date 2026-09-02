import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import type { MediaSummary } from '../../lib/tmdb'
import { MediaImage } from './MediaImage'

type MediaCardProps = {
  item: MediaSummary
  className?: string
}

function yearFromDate(date: string) {
  return date.slice(0, 4) || '—'
}

export function MediaCard({ item, className }: MediaCardProps) {
  return (
    <article className={cn('w-36 shrink-0 sm:w-40', className)}>
      <Link to={`/${item.mediaType}/${item.id}`} className="block focus-visible:outline-none">
        <div className="aspect-2/3 overflow-hidden rounded-sm bg-elevated">
          {item.posterUrl ? (
            <MediaImage src={item.posterUrl} alt={item.title} />
          ) : (
            <div className="flex size-full items-end p-3 text-sm text-muted">No poster</div>
          )}
        </div>
        <h3 className="mt-2 line-clamp-2 text-sm leading-snug text-paper">{item.title}</h3>
        <p className="mt-0.5 text-xs text-muted">
          {yearFromDate(item.date)}
          <span className="mx-1.5 text-accent">·</span>
          {item.voteAverage.toFixed(1)} Pts
        </p>
      </Link>
    </article>
  )
}
