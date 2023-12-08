import { MouseEvent, TouchEvent, useRef, useState } from "react"
import useMousePosition from "../hooks/useMousePosition"
import { useWindowEvent } from "@mantine/hooks"

const DraggableItem = ({ initialPosition, id, url }: { initialPosition: { x: number, y: number }, id: number, url: string }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 })
  const mousePosition = useMousePosition()

  const lastDraggingPosition = useRef(initialPosition)

  const placeItem = (e: MouseEvent<HTMLDivElement> & TouchEvent<HTMLDivElement>) => {
    if (e.touches) {
      lastDraggingPosition.current.x = e.touches[0].clientX
      lastDraggingPosition.current.y = e.touches[0].clientY
    } else {
      lastDraggingPosition.current.y = e.clientY
      lastDraggingPosition.current.x = e.clientX
    }


    const target = e.target as HTMLDivElement

    const { offsetLeft, offsetTop } = target

    setCursorOffset({ x: lastDraggingPosition.current.x - offsetLeft, y: lastDraggingPosition.current.y - offsetTop })
    setIsDragging(true)
  }

  if (isDragging && typeof mousePosition.y == 'number' && typeof mousePosition.x == 'number') {
    lastDraggingPosition.current.y = mousePosition.y
    lastDraggingPosition.current.x = mousePosition.x
  }

  useWindowEvent('mouseup', () => {
    setIsDragging(false)
  })

  useWindowEvent('touchend', () => {
    setIsDragging(false)
  })  
  
  return (
    <div
      className={`w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] bg-red-600 absolute cursor-pointer rounded-lg bg-cover bg-center select-none ${isDragging ? 'pointer-events-none z-10' : ''}`}
      onMouseDown={placeItem}
      onTouchStart={placeItem}
      style={{
        top: `${lastDraggingPosition.current.y - cursorOffset.y}px`,
        left: `${lastDraggingPosition.current.x - cursorOffset.x}px`,
        backgroundImage: `url("data:image/png;base64,${url}")`,
        touchAction: 'none'
      }}
      data-type='feed-item'
      data-id={id}
    />
  )
}

export default DraggableItem