import { HeroSkeleton, MediaRowSkeleton, PeopleRowSkeleton } from '../components/media/CatalogSkeletons'
import { HeroBanner } from '../components/media/HeroBanner'
import { MediaRow } from '../components/media/MediaRow'
import { PeopleRow } from '../components/media/PeopleRow'
import { useMovieList } from '../features/home/useMovieList'
import { usePopularPeople } from '../features/home/usePopularPeople'
import { useTvList } from '../features/home/useTvList'
import type { MediaSummary } from '../lib/tmdb'

function pickHeroSlides(...lists: Array<MediaSummary[] | undefined>) {
  const merged = lists.flatMap((list) => list ?? [])
  const ranked = [
    ...merged.filter((item) => item.title.toLowerCase().includes('odyssey')),
    ...merged.filter((item) => !item.title.toLowerCase().includes('odyssey')),
  ]

  return ranked.filter(
    (item, index, list) =>
      list.findIndex((entry) => `${entry.mediaType}-${entry.id}` === `${item.mediaType}-${item.id}`) ===
      index,
  ).slice(0, 5)
}

export function HomePage() {
  const nowPlaying = useMovieList('now_playing')
  const popularMovies = useMovieList('popular')
  const topRatedMovies = useMovieList('top_rated')
  const upcoming = useMovieList('upcoming')
  const popularTv = useTvList('popular')
  const topRatedTv = useTvList('top_rated')
  const people = usePopularPeople()

  const slides = pickHeroSlides(nowPlaying.data, upcoming.data, popularMovies.data)
  const error =
    nowPlaying.error ??
    popularMovies.error ??
    topRatedMovies.error ??
    upcoming.error ??
    popularTv.error ??
    topRatedTv.error ??
    people.error

  return (
    <div className="space-y-10 pb-16">
      {nowPlaying.isPending ? <HeroSkeleton /> : null}
      {slides.length > 0 ? <HeroBanner items={slides} /> : null}

      {error ? (
        <p className="px-4 text-sm text-muted sm:px-6">
          Katalog belum bisa dimuat. Periksa VITE_TMDB_TOKEN lalu muat ulang.
        </p>
      ) : null}

      <div className="space-y-10">
        {nowPlaying.isPending ? (
          <MediaRowSkeleton title="Sedang tayang" />
        ) : (
          <MediaRow title="Sedang tayang" items={nowPlaying.data ?? []} />
        )}
        {popularMovies.isPending ? (
          <MediaRowSkeleton title="Film populer" />
        ) : (
          <MediaRow title="Film populer" items={popularMovies.data ?? []} />
        )}
        {topRatedMovies.isPending ? (
          <MediaRowSkeleton title="Film nilai tertinggi" />
        ) : (
          <MediaRow title="Film nilai tertinggi" items={topRatedMovies.data ?? []} />
        )}
        {upcoming.isPending ? (
          <MediaRowSkeleton title="Akan datang" />
        ) : (
          <MediaRow title="Akan datang" items={upcoming.data ?? []} />
        )}
        {popularTv.isPending ? (
          <MediaRowSkeleton title="Serial populer" />
        ) : (
          <MediaRow title="Serial populer" items={popularTv.data ?? []} />
        )}
        {topRatedTv.isPending ? (
          <MediaRowSkeleton title="Serial nilai tertinggi" />
        ) : (
          <MediaRow title="Serial nilai tertinggi" items={topRatedTv.data ?? []} />
        )}
        {people.isPending ? (
          <PeopleRowSkeleton title="Orang populer" />
        ) : (
          <PeopleRow title="Orang populer" people={people.data ?? []} />
        )}
      </div>
    </div>
  )
}
