export function HeroSkeleton() {
  return (
    <div className="min-h-[72svh] bg-elevated">
      <div className="mx-auto flex min-h-[72svh] max-w-6xl items-end px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="w-full max-w-2xl space-y-4">
          <div className="h-3 w-28 bg-paper/10" />
          <div className="h-12 w-4/5 bg-paper/10 sm:h-16" />
          <div className="h-3 w-24 bg-paper/10" />
          <div className="h-16 w-full bg-paper/10" />
        </div>
      </div>
    </div>
  )
}

export function MediaRowSkeleton({ title }: { title: string }) {
  return (
    <section className="space-y-3" aria-busy="true" aria-label={`Memuat ${title}`}>
      <h2 className="px-4 font-display text-xl font-medium text-paper sm:px-6">{title}</h2>
      <ul className="flex gap-3 overflow-hidden px-4 sm:gap-4 sm:px-6">
        {Array.from({ length: 7 }, (_, index) => (
          <li key={index} className="w-36 shrink-0 sm:w-40">
            <div className="aspect-2/3 rounded-sm bg-elevated" />
            <div className="mt-2 h-3 w-4/5 bg-paper/10" />
            <div className="mt-2 h-3 w-1/2 bg-paper/10" />
          </li>
        ))}
      </ul>
    </section>
  )
}

export function PeopleRowSkeleton({ title }: { title: string }) {
  return (
    <section className="space-y-5" aria-busy="true" aria-label={`Memuat ${title}`}>
      <h2 className="px-4 font-display text-xl font-medium text-paper sm:px-6">{title}</h2>
      <ul className="flex gap-6 overflow-hidden px-4 sm:gap-8 sm:px-6">
        {Array.from({ length: 8 }, (_, index) => (
          <li key={index} className="w-24 shrink-0 sm:w-28">
            <div className="mx-auto size-24 animate-pulse rounded-full bg-elevated sm:size-28" />
            <div className="mx-auto mt-3 h-3 w-16 animate-pulse bg-paper/10" />
          </li>
        ))}
      </ul>
    </section>
  )
}
