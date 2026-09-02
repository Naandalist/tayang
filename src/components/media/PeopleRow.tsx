import { Link } from 'react-router-dom'
import type { PersonSummary } from '../../lib/tmdb'
import { HorizontalScroller } from './HorizontalScroller'
import { MediaImage } from './MediaImage'

type PeopleRowProps = {
  title: string
  people: PersonSummary[]
}

export function PeopleRow({ title, people }: PeopleRowProps) {
  if (people.length === 0) {
    return null
  }

  return (
    <section className="space-y-5">
      <h2 className="px-4 font-display text-xl font-medium text-paper sm:px-6">{title}</h2>
      <HorizontalScroller
        label={title}
        className="px-4 pt-2 pb-2 sm:px-6"
        controlClassName="top-16"
      >
        <ul className="flex gap-6 sm:gap-8">
          {people.map((person) => (
            <li
              key={person.id}
              className="w-24 shrink-0 text-center transition-transform duration-300 ease-out hover:-translate-y-1.5 sm:w-28"
            >
              <Link to={`/person/${person.id}`} className="group block focus-visible:outline-none">
                <div className="mx-auto size-24 overflow-hidden rounded-full bg-elevated sm:size-28">
                  {person.photoUrl ? (
                    <MediaImage
                      src={person.photoUrl}
                      alt={person.name}
                      className="object-top transition-opacity duration-300 ease-out group-hover:opacity-80"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-xs text-muted">
                      {person.name.slice(0, 1)}
                    </div>
                  )}
                </div>
                <h3 className="mt-3 line-clamp-2 text-sm leading-snug text-paper">{person.name}</h3>
                <p className="mt-1 line-clamp-1 text-[11px] tracking-wide text-muted">{person.department}</p>
              </Link>
            </li>
          ))}
        </ul>
      </HorizontalScroller>
    </section>
  )
}
