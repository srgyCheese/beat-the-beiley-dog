import { useEffect, useState } from "react"

export default function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<{x: null | number, y: null | number}>({ x: null, y: null })

  useEffect(() => {
    const mouseMoveHandler = (event: MouseEvent | TouchEvent) => {
      if (event instanceof TouchEvent) {
        const { clientX, clientY } = event.touches[0]
        setMousePosition({ x: clientX, y: clientY })

        return
      }

      const { clientX, clientY } = event
      setMousePosition({ x: clientX, y: clientY })
    }

    document.addEventListener("mousemove", mouseMoveHandler)
    document.addEventListener("touchmove", mouseMoveHandler)
    document.addEventListener("touchstart", mouseMoveHandler)

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler)
      document.removeEventListener("touchmove", mouseMoveHandler)
      document.removeEventListener("touchstart", mouseMoveHandler)
    }
  }, [])

  return mousePosition
}