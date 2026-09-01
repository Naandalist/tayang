import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export function AppLayout() {
  return (
    <div className="min-h-svh bg-app font-sans text-paper">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <Outlet />
      </main>
    </div>
  )
}
