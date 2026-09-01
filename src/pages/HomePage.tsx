import { HeroSkeleton, MediaRowSkeleton } from '../components/media/CatalogSkeletons'
import { HeroBanner } from '../components/media/HeroBanner'
import { MediaRow } from '../components/media/MediaRow'
import { useMovieList } from '../features/home/useMovieList'
import { useTvList } from '../features/home/useTvList'

export function HomePage() {
  const nowPlaying = useMovieList('now_playing')
  const popularMovies = useMovieList('popular')
  const topRatedMovies = useMovieList('top_rated')
  const upcoming = useMovieList('upcoming')
  const popularTv = useTvList('popular')
  const topRatedTv = useTvList('top_rated')

  const featured = nowPlaying.data?.[0]
  const error =
    nowPlaying.error ??
    popularMovies.error ??
    topRatedMovies.error ??
    upcoming.error ??
    popularTv.error ??
    topRatedTv.error

  return (
    <div className="space-y-10 pb-16">
      {nowPlaying.isPending ? <HeroSkeleton /> : null}
      {featured ? <HeroBanner item={featured} /> : null}

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
      </div>
    </div>
  )
}
