import { useRef, useState } from "react"
import useMousePosition from "../hooks/useMousePosition"
import { useWindowEvent } from "@mantine/hooks"

const DraggableItem = ({ initialPosition, id, url }: { initialPosition: { x: number, y: number }, id: number, url: string }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 })
  const mousePosition = useMousePosition()

  const lastDraggingPosition = useRef(initialPosition)

  if (isDragging && typeof mousePosition.y == 'number' && typeof mousePosition.x == 'number') {
    lastDraggingPosition.current.y = mousePosition.y
    lastDraggingPosition.current.x = mousePosition.x
  }

  useWindowEvent('mouseup', () => {
    setIsDragging(false)
  })

  return (
    <div
      className={`w-[200px] h-[200px] bg-red-600 fixed cursor-pointer rounded-lg bg-cover bg-center select-none ${isDragging ? 'pointer-events-none z-10' : ''}`}
      onMouseDown={e => {
        const { pageX, pageY } = e

        const target = e.target as HTMLDivElement

        const { offsetLeft, offsetTop } = target

        setCursorOffset({ x: pageX - offsetLeft, y: pageY - offsetTop })
        setIsDragging(true)
      }}
      style={{
        top: `${lastDraggingPosition.current.y - cursorOffset.y}px`,
        left: `${lastDraggingPosition.current.x - cursorOffset.x}px`,
        backgroundImage: `url("data:image/png;base64,${url}")`
      }}
      data-type='feed-item'
      data-id={id}
    />
  )
}

export default DraggableItem