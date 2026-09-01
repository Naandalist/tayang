import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'

const links = [
  { to: '/', label: 'Beranda' },
  { to: '/search', label: 'Cari' },
  { to: '/watchlist', label: 'Watchlist' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-paper/10 bg-app/85 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3"
        aria-label="Navigasi utama"
      >
        <NavLink
          to="/"
          className="font-display text-xl font-medium tracking-tight text-paper"
        >
          Tayang
          <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" aria-hidden="true" />
        </NavLink>
        <ul className="flex items-center gap-6 text-sm">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'text-muted transition-colors hover:text-paper',
                    isActive && 'text-paper',
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
