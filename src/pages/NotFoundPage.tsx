import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted">That route does not exist yet.</p>
      <Link to="/" className="inline-block text-sm text-white underline underline-offset-4">
        Back to home
      </Link>
    </section>
  )
}
