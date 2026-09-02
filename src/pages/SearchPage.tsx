import { useEffect, useId, useRef, useState } from 'react'
import { MediaCard } from '../components/media/MediaCard'
import { useTitleSearch } from '../features/search/useTitleSearch'
import { useDebouncedValue } from '../hooks/useDebouncedValue'

export function SearchPage() {
  const inputId = useId()
  const hintId = useId()
  const statusId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, 400)
  const search = useTitleSearch(debouncedQuery)
  const results = search.data ?? []
  const hasQuery = query.trim().length >= 2
  const canSearch = debouncedQuery.trim().length >= 2
  const showSkeleton = canSearch && search.isFetching
  const showEmpty = canSearch && search.isSuccess && results.length === 0

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs uppercase tracking-[0.28em] text-accent">Cari</p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight">Cari judul</h1>

      <form role="search" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor={inputId} className="sr-only">
          Cari film atau serial
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Spider-Man, The Bear, Parasite"
          autoComplete="off"
          autoFocus
          aria-describedby={hintId}
          className="mt-8 w-full border-b border-paper/20 bg-transparent py-3 text-lg text-paper outline-none placeholder:text-muted focus:border-accent"
        />
      </form>

      {!hasQuery ? (
        <p id={hintId} className="mt-6 text-sm text-muted">
          Ketik minimal dua huruf.
        </p>
      ) : (
        <p id={hintId} className="sr-only">
          Hasil diperbarui saat mengetik.
        </p>
      )}

      <div id={statusId} role="status" aria-live="polite" className="sr-only">
        {showSkeleton ? 'Memuat hasil pencarian' : null}
        {showEmpty ? `Tidak ada hasil untuk ${debouncedQuery}` : null}
        {!showSkeleton && results.length > 0 ? `${results.length} hasil ditemukan` : null}
      </div>

      {search.isError ? (
        <p className="mt-6 text-sm text-muted" role="alert">
          Pencarian gagal. Coba lagi beberapa saat.
        </p>
      ) : null}

      {showSkeleton ? (
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-6" aria-busy="true">
          {Array.from({ length: 12 }, (_, index) => (
            <li key={index}>
              <div className="aspect-2/3 animate-pulse rounded-sm bg-elevated" />
              <div className="mt-2 h-3 w-4/5 animate-pulse bg-paper/10" />
            </li>
          ))}
        </ul>
      ) : null}

      {showEmpty ? (
        <p className="mt-6 text-sm text-muted">Tidak ada film atau serial untuk “{debouncedQuery}”.</p>
      ) : null}

      {!showSkeleton && results.length > 0 ? (
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-6">
          {results.map((item) => (
            <li key={`${item.mediaType}-${item.id}`}>
              <MediaCard item={item} className="w-full sm:w-full" />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
