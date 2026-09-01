export function Footer() {
  return (
    <footer className="border-t border-paper/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center"
        >
          <img src="/tmdb.svg" alt="The Movie Database" className="h-8 w-auto" />
        </a>
        <p className="max-w-xl text-xs leading-relaxed text-muted">
          This website uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise
          approved by TMDB.
        </p>
      </div>
    </footer>
  )
}
