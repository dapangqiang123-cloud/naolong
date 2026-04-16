import { useState, useEffect, useRef } from 'react'

export function useAntiburn(timeout = 5000) {
  const [isDimmed, setIsDimmed] = useState(false)
  const timerRef = useRef(null)

  const resetTimer = () => {
    setIsDimmed(false)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setIsDimmed(true), timeout)
  }

  useEffect(() => {
    resetTimer()
    return () => clearTimeout(timerRef.current)
  }, [])

  return { isDimmed, resetTimer }
}
