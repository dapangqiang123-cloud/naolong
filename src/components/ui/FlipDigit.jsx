import { useEffect, useRef, useState } from 'react'

// variant: 'default' | 'mechanical' | 'minimal' | 'ghost'
export default function FlipDigit({
  value,
  className = 'w-[20vw] h-[30vw] max-w-[100px] max-h-[150px]',
  digitClass = 'text-[11vw] max-text-7xl',
  variant = 'default',
}) {
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

  // ghost: 无卡片，纯数字
  if (variant === 'ghost') {
    return (
      <div className={`relative flex items-center justify-center ${className}`}
           style={{ background: 'transparent' }}>
        <span className={`font-['Space_Grotesk'] font-bold select-none leading-none ${digitClass}`}
              style={{ color: 'var(--text-primary)', opacity: 0.85 }}>
          {current}
        </span>
      </div>
    )
  }

  // minimal: 方角白卡，细字体，无翻页动画阴影
  if (variant === 'minimal') {
    return (
      <div className={`relative overflow-hidden ${className}`}
           style={{
             background: 'var(--bg-card)',
             borderRadius: '6px',
             boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
             border: '1px solid var(--border)',
           }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-['Space_Grotesk'] font-light select-none leading-none ${digitClass}`}
                style={{ color: 'var(--text-primary)' }}>{current}</span>
        </div>
        <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 z-20 pointer-events-none"
             style={{ background: 'var(--border)' }} />
        {flipping && (<>
          <div className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden z-30"
               style={{ transformOrigin: 'bottom center', animation: 'flipTopLeaf 0.26s ease-in forwards', background: 'var(--bg-card)' }}>
            <div className="w-full h-full flex items-end justify-center overflow-hidden">
              <span className={`font-['Space_Grotesk'] font-light select-none leading-none ${digitClass}`}
                    style={{ marginBottom: '-50%', color: 'var(--text-primary)' }}>{prev}</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden z-30"
               style={{ transformOrigin: 'top center', animation: 'flipBottomLeaf 0.26s ease-out 0.25s forwards', transform: 'rotateX(90deg)', background: 'var(--bg-card)' }}>
            <div className="w-full h-full flex items-start justify-center overflow-hidden">
              <span className={`font-['Space_Grotesk'] font-light select-none leading-none ${digitClass}`}
                    style={{ marginTop: '-50%', color: 'var(--text-primary)' }}>{current}</span>
            </div>
          </div>
        </>)}
      </div>
    )
  }

  // mechanical: 立体金属感，强阴影，上下分隔更厚
  if (variant === 'mechanical') {
    return (
      <div className={`relative overflow-hidden ${className}`}
           style={{
             background: 'var(--bg-card)',
             borderRadius: '8px',
             boxShadow: '0 12px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.5)',
             border: '1px solid rgba(255,255,255,0.06)',
           }}>
        {/* 顶部高光 */}
        <div className="absolute top-0 left-0 right-0 h-px z-10"
             style={{ background: 'rgba(255,255,255,0.12)' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-['Space_Grotesk'] font-bold select-none leading-none ${digitClass}`}
                style={{ color: 'var(--text-primary)', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{current}</span>
        </div>
        {/* 中间分隔线更厚 */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-20 pointer-events-none"
             style={{ height: '3px', background: 'var(--bg-primary)', boxShadow: '0 1px 4px rgba(0,0,0,0.8)' }} />
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

  // default: 原有样式
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