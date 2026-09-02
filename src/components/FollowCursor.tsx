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

function shouldDisableCursor() {
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  )
}

export function FollowCursor({
  color = 'rgb(196 165 116 / 0.55)',
  zIndex = 30,
}: FollowCursorProps) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarsePointer = window.matchMedia('(pointer: coarse)')

    let canvas: HTMLCanvasElement | null = null
    let frame = 0
    let onMove: ((event: MouseEvent) => void) | null = null
    let resize: (() => void) | null = null

    const stop = () => {
      window.cancelAnimationFrame(frame)
      if (onMove) {
        window.removeEventListener('mousemove', onMove)
      }
      if (resize) {
        window.removeEventListener('resize', resize)
      }
      canvas?.remove()
      canvas = null
      onMove = null
      resize = null
      frame = 0
    }

    const start = () => {
      if (canvas || shouldDisableCursor()) {
        return
      }

      const node = document.createElement('canvas')
      const context = node.getContext('2d')
      if (!context) {
        return
      }

      node.setAttribute('aria-hidden', 'true')
      node.style.position = 'fixed'
      node.style.inset = '0'
      node.style.width = '100%'
      node.style.height = '100%'
      node.style.pointerEvents = 'none'
      node.style.zIndex = String(zIndex)
      document.body.append(node)
      canvas = node

      const dpr = window.devicePixelRatio || 1
      resize = () => {
        node.width = window.innerWidth * dpr
        node.height = window.innerHeight * dpr
        context.setTransform(dpr, 0, 0, dpr, 0, 0)
      }

      const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      onMove = (event: MouseEvent) => {
        pointer.x = event.clientX
        pointer.y = event.clientY
      }

      const dot = new CursorDot()
      const tick = () => {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight)
        dot.moveTowards(pointer.x, pointer.y, context, color)
        frame = window.requestAnimationFrame(tick)
      }

      resize()
      window.addEventListener('mousemove', onMove)
      window.addEventListener('resize', resize)
      frame = window.requestAnimationFrame(tick)
    }

    const sync = () => {
      if (shouldDisableCursor()) {
        stop()
        return
      }

      start()
    }

    sync()
    reduceMotion.addEventListener('change', sync)
    coarsePointer.addEventListener('change', sync)

    return () => {
      reduceMotion.removeEventListener('change', sync)
      coarsePointer.removeEventListener('change', sync)
      stop()
    }
  }, [color, zIndex])

  return null
}
