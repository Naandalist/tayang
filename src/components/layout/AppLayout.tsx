import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export function AppLayout() {
  return (
    <div className="min-h-svh bg-app font-sans text-paper">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
