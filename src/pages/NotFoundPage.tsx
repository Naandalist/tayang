import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="max-w-xl space-y-4">
      <p className="text-xs uppercase tracking-[0.28em] text-accent">404</p>
      <h1 className="font-display text-4xl font-medium tracking-tight">Halaman tidak ada</h1>
      <p className="text-muted">Rute itu belum dibuat, atau sudah dipindah.</p>
      <Link to="/" className="inline-block text-sm text-accent underline-offset-4 hover:underline">
        Kembali ke beranda
      </Link>
    </section>
  )
}
