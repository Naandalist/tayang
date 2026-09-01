import { Link, useParams } from 'react-router-dom'
import { useTitleDetail } from '../features/detail/useTitleDetail'
import type { MediaType } from '../lib/tmdb'

type DetailPageProps = {
  mediaType: MediaType
}

function parseId(value: string | undefined) {
  const id = Number(value)
  return Number.isFinite(id) ? id : undefined
}

export function DetailPage({ mediaType }: DetailPageProps) {
  const { id } = useParams()
  const titleId = parseId(id)
  const detail = useTitleDetail(mediaType, titleId)

  if (detail.isPending) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-busy="true">
        <div className="h-3 w-24 bg-paper/10" />
        <div className="mt-4 h-12 w-2/3 bg-paper/10" />
        <div className="mt-8 grid gap-8 sm:grid-cols-[200px_1fr]">
          <div className="aspect-2/3 bg-elevated" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-paper/10" />
            <div className="h-4 w-5/6 bg-paper/10" />
            <div className="h-4 w-2/3 bg-paper/10" />
          </div>
        </div>
      </div>
    )
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

  return (
    <article>
      <div className="relative isolate min-h-[42svh] overflow-hidden bg-elevated">
        {title.backdropUrl ? (
          <img src={title.backdropUrl} alt="" className="absolute inset-0 size-full object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-t from-app via-app/75 to-app/25" />
      </div>

      <div className="mx-auto -mt-40 max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid items-end gap-8 sm:grid-cols-[200px_1fr]">
          <div className="aspect-2/3 overflow-hidden rounded-sm bg-elevated shadow-2xl">
            {title.posterUrl ? (
              <img src={title.posterUrl} alt={title.title} className="size-full object-cover" />
            ) : null}
          </div>
          <div className="space-y-3 pb-2">
            <p className="text-xs uppercase tracking-[0.28em] text-accent">
              {title.mediaType === 'movie' ? 'Film' : 'Serial'}
            </p>
            <h1 className="font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
              {title.title}
            </h1>
            {title.tagline ? (
              <p className="font-display text-base text-muted italic">{title.tagline}</p>
            ) : null}
            <p className="text-sm text-muted">
              {title.meta}
              <span className="mx-1.5 text-accent">·</span>
              {title.voteAverage.toFixed(1)}
            </p>
            {title.genres.length > 0 ? (
              <p className="text-sm text-paper/80">{title.genres.join(' · ')}</p>
            ) : null}
          </div>
        </div>

        {title.overview ? (
          <p className="mt-10 max-w-3xl text-base leading-relaxed text-paper/85">{title.overview}</p>
        ) : null}
      </div>
    </article>
  )
}
