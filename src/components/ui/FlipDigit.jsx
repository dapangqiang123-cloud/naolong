import { useEffect, useRef, useState } from 'react'

export default function FlipDigit({ value, className = 'w-[22vw] h-[33vw] max-w-[120px] max-h-[180px]', digitClass = 'text-[11vw] max-text-7xl' }) {
  const [current, setCurrent] = useState(value)
  const [prev, setPrev] = useState(value)
  const [flipping, setFlipping] = useState(false)
  const prevRef = useRef(value)

  useEffect(() => {
    if (value === prevRef.current) return
    setPrev(prevRef.current)
    setFlipping(true)
    const t1 = setTimeout(() => setCurrent(value), 250)
    const t2 = setTimeout(() => { setFlipping(false); prevRef.current = value }, 520)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [value])

  return (
    <div className={`relative rounded-lg overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)] ${className}`}
         style={{ perspective: '600px', background: 'var(--bg-card)' }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-['Space_Grotesk'] font-bold select-none leading-none ${digitClass}`}
              style={{ color: 'var(--text-primary)' }}>{current}</span>
      </div>
      <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 z-20 pointer-events-none"
           style={{ background: 'var(--bg-primary)' }} />
      {flipping && (<>
        <div className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden z-30"
             style={{ transformOrigin: 'bottom center', animation: 'flipTopLeaf 0.26s ease-in forwards', background: 'var(--bg-card)' }}>
          <div className="w-full h-full flex items-end justify-center overflow-hidden">
            <span className={`font-['Space_Grotesk'] font-bold select-none leading-none ${digitClass}`}
                  style={{ marginBottom: '-50%', color: 'var(--text-primary)' }}>{prev}</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden z-30"
             style={{ transformOrigin: 'top center', animation: 'flipBottomLeaf 0.26s ease-out 0.25s forwards', transform: 'rotateX(90deg)', background: 'var(--bg-card)' }}>
          <div className="w-full h-full flex items-start justify-center overflow-hidden">
            <span className={`font-['Space_Grotesk'] font-bold select-none leading-none ${digitClass}`}
                  style={{ marginTop: '-50%', color: 'var(--text-primary)' }}>{current}</span>
          </div>
        </div>
      </>)}
    </div>
  )
}