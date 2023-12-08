import { useWindowEvent } from "@mantine/hooks";
import { RefObject, useEffect, useLayoutEffect, useRef } from "react";
import { useEvent } from "./useEvent";

export const useOnPointerUp = (elementRef: RefObject<Element>, eventHandler: (e: TouchEvent | MouseEvent) => void) => {
  const handler = useEvent(eventHandler)
  const lastMove = useRef({x: 0, y: 0})

  useWindowEvent('touchend', e => {
    const isIntersecting = document.elementFromPoint(lastMove.current.x, lastMove.current.y) == elementRef.current

    if (isIntersecting) {
      eventHandler(e)
    }
  })

  useWindowEvent('touchmove', e => {
    lastMove.current.x = e.touches[0].clientX
    lastMove.current.y = e.touches[0].clientY
  })

  useLayoutEffect(() => {
    if (elementRef.current instanceof HTMLElement) {
      elementRef.current.addEventListener('mouseup', handler)
    }

    return () => {
      if (elementRef.current instanceof HTMLElement) {
        elementRef.current.removeEventListener('mouseup', handler)
      }
    }
  }, [])
}