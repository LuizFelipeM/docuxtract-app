import { useEffect, useRef } from "react"

export function useOnMountRequest(request: () => void | Promise<void>): void {
  const shouldRunEffect = useRef(true)

  const handleResult = async (): Promise<void> => await Promise.resolve(request());

  useEffect(() => {
    if (shouldRunEffect.current)
      handleResult()

    return () => {
      try {
        shouldRunEffect.current = false
      } catch (error) {
        console.error(error)
      }
    }
  }, [])
}