import { useCallback, useEffect } from 'react'
import FlipDigit from '../components/ui/FlipDigit'
import PageHeader from '../components/layout/PageHeader'
import { useApp, VIEWS } from '../context/AppContext'
import { usePomodoro } from '../hooks/usePomodoro'

export default function PomodoroPage() {
  const { setCurrentView, zenMode, setZenMode, currentVariant } = useApp()
  const { m0, m1, s0, s1, isRunning, start, pause, reset, isFinished } = usePomodoro()

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
    if (e.target.closest('button')) return
    setZenMode(v => !v)
  }, [setZenMode])

  const isGhost = currentVariant === 'ghost'

  const digitClass = zenMode
    ? 'w-[19vw] h-[42vw] max-w-none max-h-none'
    : 'w-[20vw] h-[30vw] max-w-[100px] max-h-[150px]'
  const digitTextClass = zenMode
    ? 'text-[22vw]'
    : 'text-[11vw] max-text-7xl'

  return (
    <div
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      onClick={handleClick}
    >
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

      {!isGhost && (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1f1f1f_0%,transparent_100%)]" />
        </div>
      )}

      {!zenMode && <PageHeader currentTab={VIEWS.POMODORO} />}

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
        <div className="flex items-center gap-2 w-full justify-center px-2">
          <div className="flex gap-2">
            <FlipDigit value={m0} className={digitClass} digitClass={digitTextClass} variant={currentVariant} />
            <FlipDigit value={m1} className={digitClass} digitClass={digitTextClass} variant={currentVariant} />
          </div>
          <div className={`flex flex-col mb-1 ${zenMode ? 'gap-4' : 'gap-3'}`}>
            <div className={`rounded-full transition-colors ${zenMode ? 'w-3 h-3' : 'w-2 h-2'}`}
                 style={{ background: isRunning ? 'var(--accent)' : 'var(--border)' }} />
            <div className={`rounded-full transition-colors ${zenMode ? 'w-3 h-3' : 'w-2 h-2'}`}
                 style={{ background: isRunning ? 'var(--accent)' : 'var(--border)' }} />
          </div>
          <div className="flex gap-2">
            <FlipDigit value={s0} className={digitClass} digitClass={digitTextClass} variant={currentVariant} />
            <FlipDigit value={s1} className={digitClass} digitClass={digitTextClass} variant={currentVariant} />
          </div>
        </div>

        {!zenMode && (
          <>
            <div className="mt-8 text-center">
              <h2 className="font-['Space_Grotesk'] text-2xl font-bold"
                  style={{ color: 'var(--text-primary)' }}>
                {isFinished ? '休息一下吧' : isRunning ? 'Deep Work Phase' : '准备开始'}
              </h2>
            </div>

            <div className="mt-10 w-full px-12 flex flex-col items-center gap-8">
              <button
                onClick={isRunning ? pause : start}
                className="w-full max-w-xs h-14 rounded-full font-['Space_Grotesk'] font-bold text-xl active:scale-95 transition-transform"
                style={{
                  background: 'linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 70%, black))',
                  color: 'var(--bg-primary)',
                  boxShadow: '0 0 32px 0 var(--accent-soft)',
                }}
              >
                {isRunning ? '暂停' : isFinished ? '再来一轮' : '开始专注'}
              </button>

              <div className="flex items-center gap-16">
                <button onClick={reset} className="flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined"
                        style={{ color: 'var(--text-secondary)', fontSize: '28px' }}>refresh</span>
                  <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest"
                        style={{ color: 'var(--text-secondary)' }}>重置</span>
                </button>
                <button onClick={() => setCurrentView(VIEWS.SETTINGS)} className="flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined"
                        style={{ color: 'var(--text-secondary)', fontSize: '28px' }}>settings</span>
                  <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest"
                        style={{ color: 'var(--text-secondary)' }}>设置</span>
                </button>
              </div>
            </div>
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