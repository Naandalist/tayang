import { Link } from 'react-router-dom'
import { MediaCard } from '../components/media/MediaCard'
import { useWatchlist } from '../features/watchlist/WatchlistProvider'

export function WatchlistPage() {
  const { items, toggle } = useWatchlist()

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs uppercase tracking-[0.28em] text-accent">Koleksi</p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight">Watchlist</h1>

      {items.length === 0 ? (
        <p className="mt-6 max-w-lg text-muted">
          Belum ada judul tersimpan. Buka halaman detail, lalu pilih simpan ke watchlist.{' '}
          <Link to="/" className="text-accent underline-offset-4 hover:underline">
            Kembali ke beranda
          </Link>
        </p>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-6">
          {items.map((item) => (
            <li key={`${item.mediaType}-${item.id}`}>
              <MediaCard item={item} className="w-full sm:w-full" />
              <button
                type="button"
                onClick={() => toggle(item)}
                className="mt-2 text-xs text-muted underline-offset-4 hover:text-paper hover:underline"
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
