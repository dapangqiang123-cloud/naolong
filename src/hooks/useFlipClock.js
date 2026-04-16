import { useState, useEffect } from 'react'

function getTimeParts() {
  const now = new Date()
  const h = String(now.getHours()).padStart(2, '0')
  const m = String(now.getMinutes()).padStart(2, '0')
  const s = String(now.getSeconds()).padStart(2, '0')
  return {
    h0: h[0], h1: h[1],
    m0: m[0], m1: m[1],
    s0: s[0], s1: s[1],
    ampm: now.getHours() >= 12 ? 'PM' : 'AM',
    timeStr: `${h}:${m}`,
  }
}

export function useFlipClock() {
  const [parts, setParts] = useState(getTimeParts)
  useEffect(() => {
    const delay = 1000 - (Date.now() % 1000)
    let interval
    const timeout = setTimeout(() => {
      setParts(getTimeParts())
      interval = setInterval(() => setParts(getTimeParts()), 1000)
    }, delay)
    return () => { clearTimeout(timeout); clearInterval(interval) }
  }, [])
  return parts
}
