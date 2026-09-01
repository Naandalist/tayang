export function HomePage() {
  return (
    <section className="max-w-2xl space-y-5">
      <p className="text-xs uppercase tracking-[0.28em] text-accent">Katalog</p>
      <h1 className="font-display text-4xl font-medium leading-[1.15] tracking-tight text-paper sm:text-6xl">
        Film dan serial yang sedang tayang.
      </h1>
      <p className="max-w-lg text-base leading-relaxed text-muted">
        Katalog editorial dari TMDB. Baris judul dan detail menyusul setelah
        lapisan data terpasang.
      </p>
    </section>
  )
}
