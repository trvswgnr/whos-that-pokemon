import React, { useRef, useEffect } from 'react'

export interface DrawProps {
  context: CanvasRenderingContext2D
  frameCount: number
  canvas: HTMLCanvasElement
}

export interface CanvasProps extends React.HTMLAttributes<HTMLCanvasElement> {
  draw: (props: DrawProps) => void
  width?: number
  height?: number
  ref?: React.MutableRefObject<HTMLCanvasElement>
}

export default function Canvas(props: CanvasProps) {
  const { draw, ...rest } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId: number

    const render = () => {
      frameCount++

      if (!context) {
        return
      }

      draw({ context, frameCount, canvas })
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  return <canvas ref={canvasRef} {...rest} />
}
