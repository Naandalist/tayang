import { HeroSkeleton, MediaRowSkeleton } from '../components/media/CatalogSkeletons'
import { HeroBanner } from '../components/media/HeroBanner'
import { MediaRow } from '../components/media/MediaRow'
import { useMovieList } from '../features/home/useMovieList'

export function HomePage() {
  const nowPlaying = useMovieList('now_playing')
  const popular = useMovieList('popular')
  const topRated = useMovieList('top_rated')
  const upcoming = useMovieList('upcoming')

  const featured = nowPlaying.data?.[0]
  const error =
    nowPlaying.error ?? popular.error ?? topRated.error ?? upcoming.error

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
        {popular.isPending ? (
          <MediaRowSkeleton title="Pilihan penonton" />
        ) : (
          <MediaRow title="Pilihan penonton" items={popular.data ?? []} />
        )}
        {topRated.isPending ? (
          <MediaRowSkeleton title="Nilai tertinggi" />
        ) : (
          <MediaRow title="Nilai tertinggi" items={topRated.data ?? []} />
        )}
        {upcoming.isPending ? (
          <MediaRowSkeleton title="Akan datang" />
        ) : (
          <MediaRow title="Akan datang" items={upcoming.data ?? []} />
        )}
      </div>
    </div>
  )
}
