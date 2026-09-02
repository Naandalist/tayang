import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from '../ErrorBoundary'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-app font-sans text-paper">
      <a
        href="#konten-utama"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-app focus:px-3 focus:py-2 focus:text-sm focus:text-accent"
      >
        Loncat ke konten utama
      </a>
      <Navbar />
      <main id="konten-utama" tabIndex={-1} className="flex-1 outline-none">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}
