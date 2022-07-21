import React, { memo, FC, useState, useEffect } from 'react'
import { useCanvas } from './core/utils'
import Runner from './core'

import './game.scss'

export const Game: FC<unknown> = memo(() => {
  const [canvasRef] = useCanvas()
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (canvasRef !== null) {
      new Runner(canvasRef.current as HTMLCanvasElement, (value: number) => {
        setScore(value)
      })
    }
  }, [])

  return (
    <>
      <div className="game">
        <canvas ref={canvasRef}></canvas>
      </div>
      {console.log(score)}
    </>
  )
})

