import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn'

type MediaImageProps = {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
}

export function MediaImage({ src, alt, className, loading = 'lazy' }: MediaImageProps) {
  const imageRef = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
    if (imageRef.current?.complete && imageRef.current.naturalWidth > 0) {
      setLoaded(true)
    }
  }, [src])

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={cn(
        'size-full object-cover transition-opacity duration-700 ease-out',
        loaded ? 'opacity-100' : 'opacity-0',
        className,
      )}
    />
  )
}
