import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import type { MediaSummary } from '../../lib/tmdb'
import { MediaImage } from './MediaImage'

type HeroBannerProps = {
  items: MediaSummary[]
}

function yearFromDate(date: string) {
  return date.slice(0, 4) || '—'
}

export function HeroBanner({ items }: HeroBannerProps) {
  const slides = items.slice(0, 5)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || slides.length < 2) {
      return
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, 7000)

    return () => window.clearInterval(timer)
  }, [paused, slides.length])

  const item = slides[index]
  if (!item) {
    return null
  }

  return (
    <section
      className="relative isolate min-h-[72svh] overflow-hidden bg-elevated"
      aria-roledescription="carousel"
      aria-label="Sorotan sedang tayang"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false)
        }
      }
    >
      {slides.map((slide, slideIndex) =>
        slide.backdropUrl ? (
          <div
            key={`${slide.mediaType}-${slide.id}`}
            className={cn(
              'absolute inset-0 transition-opacity duration-700 ease-out',
              slideIndex === index ? 'opacity-100' : 'opacity-0',
            )}
            aria-hidden={slideIndex !== index}
          >
            <MediaImage
              src={slide.backdropUrl}
              alt=""
              loading={slideIndex === 0 ? 'eager' : 'lazy'}
              className="absolute inset-0"
            />
          </div>
        ) : null,
      )}
      <div className="absolute inset-0 bg-linear-to-t from-app via-app/70 to-app/20" />
      <div className="relative mx-auto flex min-h-[72svh] max-w-6xl items-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16">
        <div className="max-w-2xl space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-accent">Sedang tayang</p>
          <h1 className="font-display text-4xl font-medium leading-[1.12] tracking-tight sm:text-6xl">
            {item.title}
          </h1>
          <p className="text-sm text-muted">
            {yearFromDate(item.date)}
            <span className="mx-1.5 text-accent">·</span>
            {item.voteAverage.toFixed(1)} Pts
          </p>
          {item.overview ? (
            <p className="max-w-xl text-sm leading-relaxed text-paper/80 sm:text-base">{item.overview}</p>
          ) : null}
          <Link
            to={`/${item.mediaType}/${item.id}`}
            className="inline-block text-sm text-accent underline-offset-4 hover:underline"
          >
            Lihat detail {item.title}
          </Link>
          {slides.length > 1 ? (
            <div className="flex gap-1 pt-4" role="tablist" aria-label="Pilih sorotan">
              {slides.map((slide, slideIndex) => (
                <button
                  key={`${slide.mediaType}-${slide.id}-dot`}
                  type="button"
                  role="tab"
                  aria-selected={slideIndex === index}
                  aria-label={`Tampilkan ${slide.title}`}
                  onClick={() => setIndex(slideIndex)}
                  className="flex size-6 items-center justify-center"
                >
                  <span
                    className={cn(
                      'size-1.5 rounded-full transition-colors duration-300',
                      slideIndex === index ? 'bg-accent' : 'bg-paper/25',
                    )}
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
