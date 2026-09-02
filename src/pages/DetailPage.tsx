import { Link, useParams } from 'react-router-dom'
import { MediaImage } from '../components/media/MediaImage'
import { MediaRow } from '../components/media/MediaRow'
import { MediaRowSkeleton } from '../components/media/CatalogSkeletons'
import { useSimilarTitles } from '../features/detail/useSimilarTitles'
import { useTitleDetail } from '../features/detail/useTitleDetail'
import { titleToSummary } from '../features/watchlist/toSummary'
import { useWatchlist } from '../features/watchlist/WatchlistProvider'
import type { MediaType } from '../lib/tmdb'

type DetailPageProps = {
  mediaType: MediaType
}

function parseId(value: string | undefined) {
  const id = Number(value)
  return Number.isFinite(id) ? id : undefined
}

function DetailSkeleton() {
  return (
    <div className="relative isolate min-h-[80svh] overflow-hidden bg-elevated" aria-busy="true" aria-label="Memuat detail judul">
      <div className="absolute inset-0 bg-linear-to-t from-app via-elevated to-elevated" />
      <div className="relative mx-auto flex min-h-[80svh] max-w-6xl items-end px-4 pb-10 pt-28 sm:px-6 sm:pb-14">
        <div className="grid w-full items-end gap-6 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
          <div className="hidden aspect-2/3 animate-pulse rounded-sm bg-paper/10 sm:block" />
          <div className="min-w-0 w-full space-y-4">
            <div className="h-3 w-24 animate-pulse bg-paper/10" />
            <div className="h-12 w-full max-w-xl animate-pulse bg-paper/10 sm:h-14" />
            <div className="h-4 w-40 animate-pulse bg-paper/10" />
            <div className="h-4 w-full max-w-lg animate-pulse bg-paper/10" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function DetailPage({ mediaType }: DetailPageProps) {
  const { id } = useParams()
  const titleId = parseId(id)
  const detail = useTitleDetail(mediaType, titleId)
  const similar = useSimilarTitles(mediaType, titleId)
  const watchlist = useWatchlist()

  if (detail.isPending) {
    return <DetailSkeleton />
  }

  if (detail.isError || !detail.data) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-4xl font-medium">Judul tidak ditemukan</h1>
        <p className="mt-3 text-muted">Data TMDB untuk rute ini gagal dimuat.</p>
        <Link to="/" className="mt-4 inline-block text-sm text-accent underline-offset-4 hover:underline">
          Kembali ke beranda
        </Link>
      </section>
    )
  }

  const title = detail.data
  const saved = watchlist.has(title)
  const similarTitle = mediaType === 'movie' ? 'Film serupa' : 'Serial serupa'

  return (
    <article className="pb-16">
      <section className="relative isolate min-h-[80svh] overflow-hidden bg-elevated">
        {title.backdropUrl ? (
          <MediaImage
            src={title.backdropUrl}
            alt=""
            loading="eager"
            className="absolute inset-0 object-top"
          />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-t from-app from-15% via-app/80 to-app/20" />

        <div className="relative mx-auto flex min-h-[80svh] max-w-6xl items-end px-4 pb-10 pt-28 sm:px-6 sm:pb-14">
          <div className="grid w-full items-end gap-6 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
            <div className="hidden aspect-2/3 overflow-hidden rounded-sm bg-elevated sm:block">
              {title.posterUrl ? (
                <MediaImage src={title.posterUrl} alt={title.title} loading="eager" />
              ) : null}
            </div>

            <div className="min-w-0 space-y-3">
              <p className="text-xs uppercase tracking-[0.28em] text-accent">
                {title.mediaType === 'movie' ? 'Film' : 'Serial'}
              </p>
              <h1 className="font-display text-4xl font-medium leading-[1.12] tracking-tight sm:text-5xl">
                {title.title}
              </h1>
              {title.tagline ? (
                <p className="font-display text-base text-muted italic">{title.tagline}</p>
              ) : null}
              <p className="text-sm text-muted">
                {title.meta}
                <span className="mx-1.5 text-accent">·</span>
                {title.voteAverage.toFixed(1)} Pts
              </p>
              {title.genres.length > 0 ? (
                <ul className="flex flex-wrap gap-2 pt-1">
                  {title.genres.map((genre) => (
                    <li
                      key={genre}
                      className="border border-paper/20 px-2 py-1 text-[11px] uppercase tracking-[0.16em] text-paper/80"
                    >
                      {genre}
                    </li>
                  ))}
                </ul>
              ) : null}
              <button
                type="button"
                onClick={() => watchlist.toggle(titleToSummary(title))}
                aria-pressed={saved}
                className="mt-2 text-sm text-accent underline-offset-4 hover:underline"
              >
                {saved ? 'Hapus dari watchlist' : 'Simpan ke watchlist'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {title.overview ? (
        <p className="mx-auto max-w-6xl px-4 pt-8 pb-10 text-base leading-relaxed text-paper/85 sm:px-6">
          {title.overview}
        </p>
      ) : (
        <div className="pt-10" />
      )}

      {similar.isPending ? (
        <MediaRowSkeleton title={similarTitle} />
      ) : (
        <MediaRow title={similarTitle} items={similar.data ?? []} />
      )}
    </article>
  )
}
