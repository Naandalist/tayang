import { Component, type ErrorInfo, type ReactNode } from 'react'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  failed: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack)
  }

  render() {
    if (this.state.failed) {
      return (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h1 className="font-display text-4xl font-medium">Ada yang rusak</h1>
          <p className="mt-3 text-muted">Muat ulang halaman untuk mencoba lagi.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 text-sm text-accent underline-offset-4 hover:underline"
          >
            Muat ulang
          </button>
        </section>
      )
    }

    return this.props.children
  }
}
