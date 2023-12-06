import { useRef } from "react"

export const useLatest = <T>(value: T) => {
  const ref = useRef<T>()

  ref.current = value

  return ref
}