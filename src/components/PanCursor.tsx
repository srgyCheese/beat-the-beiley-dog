import { useState } from "react"
import { useWindowEvent } from '@mantine/hooks'
import useMousePosition from "../hooks/useMousePosition"

const PanCursor = () => {
  const { x, y } = useMousePosition()
  const [isMouseDown, setIsMouseDown] = useState(false)

  useWindowEvent('mousedown', () => {
    setIsMouseDown(true)
  })

  useWindowEvent('mouseup', () => {
    setIsMouseDown(false)
  })

  const width = 380
  const height = 240

  if (x == null || y == null) {
    return
  }

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{ left: `${x - 100}px`, top: `${y - height + 60}px` }}
    >
      <div style={{width, height}}>
        <img src="/assets/other/pan.png" alt="pan" className={`h-full w-full object-contain  ${isMouseDown ? 'rotate-0 translate-y-[20px]' : 'rotate-45'}`} />
      </div>
    </div>
  )
}

export default PanCursor
