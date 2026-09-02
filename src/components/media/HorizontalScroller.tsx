import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

type HorizontalScrollerProps = {
  children: ReactNode
  className?: string
  controlClassName?: string
  label: string
}

export function HorizontalScroller({
  children,
  className,
  controlClassName,
  label,
}: HorizontalScrollerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    const update = () => {
      const max = element.scrollWidth - element.clientWidth
      setCanLeft(element.scrollLeft > 12)
      setCanRight(element.scrollLeft < max - 12)
    }

    update()
    element.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    const observer = new ResizeObserver(update)
    observer.observe(element)

    return () => {
      element.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      observer.disconnect()
    }
  }, [children])

  const scrollByDirection = (direction: -1 | 1) => {
    const element = ref.current
    if (!element) {
      return
    }

    element.scrollBy({ left: direction * element.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={ref}
        className={cn('row-scroll overflow-x-auto', className)}
        tabIndex={0}
        role="region"
        aria-label={label}
      >
        {children}
      </div>

      {canLeft ? (
        <button
          type="button"
          onClick={() => scrollByDirection(-1)}
          aria-label={`Geser ${label} ke kiri`}
          className={cn(
            'absolute top-[6.75rem] left-1 z-10 hidden h-14 w-8 -translate-y-1/2 items-center justify-center rounded-r-md bg-app/70 text-paper/80 backdrop-blur-sm transition-colors hover:bg-app/90 hover:text-paper sm:flex',
            controlClassName,
          )}
        >
          <ChevronLeft className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </button>
      ) : null}

      {canRight ? (
        <button
          type="button"
          onClick={() => scrollByDirection(1)}
          aria-label={`Geser ${label} ke kanan`}
          className={cn(
            'absolute top-[6.75rem] right-1 z-10 hidden h-14 w-8 -translate-y-1/2 items-center justify-center rounded-l-md bg-app/70 text-paper/80 backdrop-blur-sm transition-colors hover:bg-app/90 hover:text-paper sm:flex',
            controlClassName,
          )}
        >
          <ChevronRight className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  )
}
