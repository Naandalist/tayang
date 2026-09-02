import { useEffect } from 'react'

type FollowCursorProps = {
  color?: string
  zIndex?: number
}

class CursorDot {
  x = 0
  y = 0
  lastX = 0
  lastY = 0
  size = 10
  lag = 10

  moveTowards(x: number, y: number, context: CanvasRenderingContext2D, color: string) {
    this.x += (x - this.x) / this.lag
    this.y += (y - this.y) / this.lag

    context.fillStyle = color
    context.beginPath()
    context.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2)
    context.fill()
    context.closePath()

    this.lastX = this.x
    this.lastY = this.y
  }
}

export function FollowCursor({
  color = 'rgb(196 165 116 / 0.55)',
  zIndex = 30,
}: FollowCursorProps) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarsePointer = window.matchMedia('(pointer: coarse)')

    if (reduceMotion.matches || coarsePointer.matches) {
      return
    }

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    canvas.setAttribute('aria-hidden', 'true')
    canvas.style.position = 'fixed'
    canvas.style.inset = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = String(zIndex)
    document.body.append(canvas)

    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const onMove = (event: MouseEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
    }

    const dot = new CursorDot()
    let frame = 0

    const tick = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      dot.moveTowards(pointer.x, pointer.y, context, color)
      frame = window.requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', resize)
    frame = window.requestAnimationFrame(tick)

    const tearDown = () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      canvas.remove()
    }

    const onPreferenceChange = () => {
      if (reduceMotion.matches || coarsePointer.matches) {
        tearDown()
      }
    }

    reduceMotion.addEventListener('change', onPreferenceChange)
    coarsePointer.addEventListener('change', onPreferenceChange)

    return () => {
      reduceMotion.removeEventListener('change', onPreferenceChange)
      coarsePointer.removeEventListener('change', onPreferenceChange)
      tearDown()
    }
  }, [color, zIndex])

  return null
}
