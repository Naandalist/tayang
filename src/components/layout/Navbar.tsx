import { Clapperboard } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'

const links = [
  { to: '/', label: 'Home' },
  { to: '/search', label: 'Search' },
  { to: '/watchlist', label: 'Watchlist' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-app/90 backdrop-blur">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4"
        aria-label="Primary"
      >
        <NavLink to="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <Clapperboard className="size-5 text-accent" aria-hidden="true" />
          Tayang
        </NavLink>
        <ul className="flex items-center gap-1 text-sm">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-muted transition-colors hover:text-white',
                    isActive && 'bg-white/10 text-white',
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
