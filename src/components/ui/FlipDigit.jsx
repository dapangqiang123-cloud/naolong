import { useEffect, useRef, useState } from 'react'
export default function FlipDigit({ value, className = 'w-24 h-36 md:w-32 md:h-48', digitClass = 'text-7xl md:text-9xl' }) {
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
    <div className={`relative bg-[#2a2a2a] rounded-lg overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)] ${className}`} style={{perspective:'600px'}}>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-['Space_Grotesk'] font-bold text-[#c6c6c6] select-none leading-none ${digitClass}`}>{current}</span>
      </div>
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#131313] -translate-y-1/2 z-20 pointer-events-none" />
      {flipping && (<>
        <div className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden z-30 bg-[#2a2a2a]"
             style={{transformOrigin:'bottom center',animation:'flipTopLeaf 0.26s ease-in forwards'}}>
          <div className="w-full h-full flex items-end justify-center overflow-hidden">
            <span className={`font-['Space_Grotesk'] font-bold text-[#c6c6c6] select-none leading-none ${digitClass}`} style={{marginBottom:'-50%'}}>{prev}</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden z-30 bg-[#2a2a2a]"
             style={{transformOrigin:'top center',animation:'flipBottomLeaf 0.26s ease-out 0.25s forwards',transform:'rotateX(90deg)'}}>
          <div className="w-full h-full flex items-start justify-center overflow-hidden">
            <span className={`font-['Space_Grotesk'] font-bold text-[#c6c6c6] select-none leading-none ${digitClass}`} style={{marginTop:'-50%'}}>{current}</span>
          </div>
        </div>
      </>)}
    </div>
  )
}
