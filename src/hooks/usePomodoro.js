import { useState, useEffect, useRef } from 'react'

const POMODORO_SECONDS = 25 * 60 // 25分钟

export function usePomodoro() {
  const [timeLeft, setTimeLeft] = useState(POMODORO_SECONDS)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            setIsRunning(false)
            console.log('🍅 番茄钟结束！')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isRunning])

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const seconds = String(timeLeft % 60).padStart(2, '0')

  return {
    m0: minutes[0], m1: minutes[1],
    s0: seconds[0], s1: seconds[1],
    isRunning,
    start: () => setIsRunning(true),
    pause: () => setIsRunning(false),
    reset: () => { setIsRunning(false); setTimeLeft(POMODORO_SECONDS) },
    isFinished: timeLeft === 0,
  }
}
