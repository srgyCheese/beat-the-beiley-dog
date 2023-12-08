import { useWindowEvent } from "@mantine/hooks";
import { RefObject, useEffect, useLayoutEffect, useRef } from "react";
import { useEvent } from "./useEvent";

export const useOnPointerEnter = (elementRef: RefObject<Element>, eventHandler: (e: TouchEvent | MouseEvent) => void) => {
  const handler = useEvent(eventHandler)
  const isIntersectingRef = useRef(false)

  useWindowEvent('touchmove', e => {
    const isIntersecting = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) == elementRef.current
    if (isIntersecting && !isIntersectingRef.current) {
      eventHandler(e)
    }
    
    isIntersectingRef.current = isIntersecting
  })

  useLayoutEffect(() => {
    if (elementRef.current instanceof HTMLElement) {
      elementRef.current.addEventListener('mouseenter', handler)
    }

    return () => {
      if (elementRef.current instanceof HTMLElement) {
        elementRef.current.removeEventListener('mouseenter', handler)
      }
    }
  }, [])
}