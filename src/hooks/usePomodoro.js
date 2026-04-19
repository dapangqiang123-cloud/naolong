import { useState, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'

export function usePomodoro() {
  const { pomodoroDuration } = useApp()
  const totalSeconds = pomodoroDuration * 60

  const [timeLeft, setTimeLeft] = useState(totalSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  // 时长变化时重置
  useEffect(() => {
    setIsRunning(false)
    setTimeLeft(pomodoroDuration * 60)
  }, [pomodoroDuration])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            setIsRunning(false)
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
    reset: () => { setIsRunning(false); setTimeLeft(pomodoroDuration * 60) },
    isFinished: timeLeft === 0,
  }
}