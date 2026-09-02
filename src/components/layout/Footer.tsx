export function Footer() {
  return (
    <footer className="border-t border-paper/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center"
        >
          <img src="/tmdb.svg" alt="The Movie Database" className="h-8 w-auto" />
        </a>
        <div className="max-w-xl space-y-2 text-xs leading-relaxed text-muted">
          <p>
            This website uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise
            approved by TMDB.
          </p>
          <p>
            Created by{' '}
            <a
              href="https://github.com/Naandalist"
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper underline-offset-4 hover:text-accent hover:underline"
            >
              Listiananda Apriliawan
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
