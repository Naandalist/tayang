import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Tidak ditemukan · Tayang')

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs uppercase tracking-[0.28em] text-accent">404</p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight">Halaman tidak ada</h1>
      <p className="mt-3 text-muted">Rute itu belum dibuat, atau sudah dipindah.</p>
      <Link to="/" className="mt-4 inline-block text-sm text-accent underline-offset-4 hover:underline">
        Kembali ke beranda
      </Link>
    </section>
  )
}
