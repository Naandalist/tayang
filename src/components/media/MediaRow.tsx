import type { MediaSummary } from '../../lib/tmdb'
import { HorizontalScroller } from './HorizontalScroller'
import { MediaCard } from './MediaCard'

type MediaRowProps = {
  title: string
  items: MediaSummary[]
}

export function MediaRow({ title, items }: MediaRowProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <section className="space-y-3">
      <h2 className="px-4 font-display text-xl font-medium text-paper sm:px-6">{title}</h2>
      <HorizontalScroller label={title} className="px-4 pb-2 sm:px-6">
        <ul className="flex gap-3 sm:gap-4">
          {items.map((item) => (
            <li key={`${item.mediaType}-${item.id}`}>
              <MediaCard item={item} />
            </li>
          ))}
        </ul>
      </HorizontalScroller>
    </section>
  )
}
