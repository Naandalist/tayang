import { Link, useParams } from 'react-router-dom'
import { MediaImage } from '../components/media/MediaImage'
import { MediaRow } from '../components/media/MediaRow'
import { usePersonDetail } from '../features/person/usePersonDetail'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatYear } from '../lib/formatYear'

function parseId(value: string | undefined) {
  const id = Number(value)
  return Number.isFinite(id) ? id : undefined
}

function PersonSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-busy="true" aria-label="Memuat profil">
      <div className="grid gap-8 sm:grid-cols-[200px_minmax(0,1fr)]">
        <div className="aspect-2/3 animate-pulse rounded-sm bg-elevated" />
        <div className="space-y-4 pt-2">
          <div className="h-3 w-24 animate-pulse bg-paper/10" />
          <div className="h-12 w-2/3 animate-pulse bg-paper/10" />
          <div className="h-4 w-40 animate-pulse bg-paper/10" />
          <div className="h-24 w-full animate-pulse bg-paper/10" />
        </div>
      </div>
    </div>
  )
}

export function PersonPage() {
  const { id } = useParams()
  const personId = parseId(id)
  const person = usePersonDetail(personId)
  useDocumentTitle(person.data ? `${person.data.name} · Tayang` : 'Tayang')

  if (person.isPending) {
    return <PersonSkeleton />
  }

  if (person.isError || !person.data) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-4xl font-medium">Profil tidak ditemukan</h1>
        <p className="mt-3 text-muted">Data TMDB untuk orang ini gagal dimuat.</p>
        <Link to="/" className="mt-4 inline-block text-sm text-accent underline-offset-4 hover:underline">
          Kembali ke beranda
        </Link>
      </section>
    )
  }

  const profile = person.data
  const years = [formatYear(profile.birthday), formatYear(profile.deathday)]
    .filter((value) => value !== '-')
    .join(' - ')

  return (
    <article className="pb-16">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid items-start gap-8 sm:grid-cols-[200px_minmax(0,1fr)]">
          <div className="aspect-2/3 overflow-hidden rounded-sm bg-elevated">
            {profile.photoUrl ? (
              <MediaImage src={profile.photoUrl} alt={profile.name} loading="eager" />
            ) : (
              <div className="flex size-full items-end p-4 text-muted">No photo</div>
            )}
          </div>

          <div className="min-w-0 space-y-3">
            <p className="text-xs uppercase tracking-[0.28em] text-accent">{profile.department}</p>
            <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">{profile.name}</h1>
            <p className="text-sm text-muted">
              {[years || null, profile.placeOfBirth].filter(Boolean).join(' · ') || profile.department}
            </p>
            {profile.biography ? (
              <p className="max-w-3xl text-base leading-relaxed text-paper/85">{profile.biography}</p>
            ) : (
              <p className="text-sm text-muted">Belum ada biografi.</p>
            )}
          </div>
        </div>
      </section>

      <MediaRow title="Dikenal lewat" items={profile.credits} />
    </article>
  )
}
