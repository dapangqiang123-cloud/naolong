import { useCallback, useEffect } from 'react'
import FlipDigit from '../components/ui/FlipDigit'
import PageHeader from '../components/layout/PageHeader'
import { useFlipClock } from '../hooks/useFlipClock'
import { useApp, VIEWS } from '../context/AppContext'

export default function FlipClockPage() {
  const { h0, h1, m0, m1, ampm } = useFlipClock()
  const { zenMode, setZenMode, currentVariant } = useApp()

  useEffect(() => {
    const handler = () => {
      const isLandscape = window.innerWidth > window.innerHeight
      setZenMode(isLandscape)
    }
    handler()
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [setZenMode])

  const handleClick = useCallback((e) => {
    if (e.target.closest('header')) return
    setZenMode(v => !v)
  }, [setZenMode])

  const isGhost = currentVariant === 'ghost'

  const digitClass = zenMode
    ? 'w-[19vw] h-[42vw] max-w-none max-h-none'
    : isGhost
      ? 'w-[22vw] h-[32vw] max-w-[120px] max-h-[160px]'
      : 'w-[20vw] h-[30vw] max-w-[100px] max-h-[150px]'

  const digitTextClass = zenMode
    ? 'text-[22vw]'
    : isGhost
      ? 'text-[18vw] max-text-8xl'
      : 'text-[11vw] max-text-7xl'

  return (
    <div
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      onClick={handleClick}
    >
      {/* Ghost City 模糊背景 */}
      {isGhost && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div style={{
            position: 'absolute', inset: '-50px',
            backgroundImage: 'url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px) brightness(0.35) grayscale(100%)',
            transform: 'scale(1.05)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(17,19,24,0.4), transparent, rgba(17,19,24,0.6))',
          }} />
        </div>
      )}

      {/* 默认背景光晕 */}
      {!isGhost && (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1f1f1f_0%,transparent_100%)]" />
        </div>
      )}

      {!zenMode && <PageHeader currentTab={VIEWS.CLOCK} />}

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">

        {!zenMode && !isGhost && (
          <div className="absolute top-12 left-0 right-0 flex justify-center opacity-10 pointer-events-none select-none">
            <p className="font-['Space_Grotesk'] text-8xl font-bold tracking-tighter">FOCUS</p>
          </div>
        )}

        {/* Ghost City — 大字排版模式 */}
        {isGhost ? (
          <div className="w-full text-center">
            {!zenMode && (
              <p className="font-['Manrope'] text-xs uppercase tracking-[0.5em] mb-6 opacity-40"
                 style={{ color: 'var(--text-secondary)' }}>
                {new Date().toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            )}
            <h2 className="font-['Space_Grotesk'] font-light leading-none tracking-tighter select-none"
                style={{
                  fontSize: 'clamp(5rem, 22vw, 20rem)',
                  color: 'var(--text-primary)',
                  opacity: 0.85,
                  textShadow: '0 0 80px rgba(255,255,255,0.08)',
                }}>
              {h0}{h1}<span style={{ opacity: 0.4 }}>:</span>{m0}{m1}
            </h2>
            {!zenMode && (
              <div className="mt-8 flex items-center justify-center gap-6 opacity-50">
                <div className="w-8 h-px" style={{ background: 'var(--text-secondary)' }} />
                <span className="font-['Manrope'] text-xs tracking-widest uppercase"
                      style={{ color: 'var(--text-secondary)' }}>{ampm}</span>
                <div className="w-8 h-px" style={{ background: 'var(--text-secondary)' }} />
              </div>
            )}
          </div>
        ) : (
          /* 默认/mechanical/minimal — 翻页卡片模式 */
          <>
            <div className="flex items-center gap-3 w-full justify-center px-2">
              <div className="flex gap-2">
                <FlipDigit value={h0} className={digitClass} digitClass={digitTextClass} variant={currentVariant} />
                <FlipDigit value={h1} className={digitClass} digitClass={digitTextClass} variant={currentVariant} />
              </div>
              <div className={`flex flex-col mb-1 ${zenMode ? 'gap-4' : 'gap-3'}`}>
                <div className={`rounded-full ${zenMode ? 'w-3 h-3' : 'w-2 h-2'}`}
                     style={{ background: 'var(--accent)' }} />
                <div className={`rounded-full ${zenMode ? 'w-3 h-3' : 'w-2 h-2'}`}
                     style={{ background: 'var(--accent)' }} />
              </div>
              <div className="flex gap-2">
                <FlipDigit value={m0} className={digitClass} digitClass={digitTextClass} variant={currentVariant} />
                <FlipDigit value={m1} className={digitClass} digitClass={digitTextClass} variant={currentVariant} />
              </div>
            </div>

            {!zenMode && (
              <div className="mt-6 flex items-center gap-3">
                <span className="font-['Space_Grotesk'] text-sm font-bold tracking-[0.3em]"
                      style={{ color: ampm === 'AM' ? 'var(--accent)' : 'var(--border)' }}>AM</span>
                <div className="w-px h-4" style={{ background: 'var(--border)' }} />
                <span className="font-['Space_Grotesk'] text-sm font-bold tracking-[0.3em]"
                      style={{ color: ampm === 'PM' ? 'var(--accent)' : 'var(--border)' }}>PM</span>
              </div>
            )}

            {!zenMode && (
              <div className="mt-12 text-center">
                <p className="font-['Space_Grotesk'] uppercase tracking-[0.2em] text-xs mb-2"
                   style={{ color: 'var(--text-secondary)' }}>Current Session</p>
                <h2 className="font-['Space_Grotesk'] text-2xl font-bold"
                    style={{ color: 'var(--text-primary)' }}>Deep Work Phase</h2>
              </div>
            )}
          </>
        )}

        {zenMode && (
          <div style={{
            position: 'fixed', bottom: '24px', left: 0, right: 0,
            textAlign: 'center', opacity: 0.3,
          }}>
            <p className="font-['Space_Grotesk'] text-xs uppercase tracking-widest"
               style={{ color: 'var(--text-secondary)' }}>点击屏幕退出专注模式</p>
          </div>
        )}
      </main>
    </div>
  )
}