import { useCallback, useEffect } from 'react'
import FlipDigit from '../components/ui/FlipDigit'
import PageHeader from '../components/layout/PageHeader'
import { useFlipClock } from '../hooks/useFlipClock'
import { useApp, VIEWS } from '../context/AppContext'

export default function FlipClockPage() {
  const { h0, h1, m0, m1, ampm } = useFlipClock()
  const { zenMode, setZenMode } = useApp()

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

  return (
    <div
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      onClick={handleClick}
    >
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1f1f1f_0%,transparent_100%)]" />
      </div>

      {!zenMode && <PageHeader currentTab={VIEWS.CLOCK} />}

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">

        {!zenMode && (
          <div className="absolute top-12 left-0 right-0 flex justify-center opacity-10 pointer-events-none select-none">
            <p className="font-['Space_Grotesk'] text-8xl font-bold tracking-tighter">FOCUS</p>
          </div>
        )}

        <div className="flex items-center gap-3 w-full justify-center px-6">
          <div className="flex gap-2">
            <FlipDigit value={h0} />
            <FlipDigit value={h1} />
          </div>
          <div className="flex flex-col gap-3 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
          </div>
          <div className="flex gap-2">
            <FlipDigit value={m0} />
            <FlipDigit value={m1} />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <span className="font-['Space_Grotesk'] text-sm font-bold tracking-[0.3em]"
                style={{ color: ampm === 'AM' ? 'var(--accent)' : 'var(--border)' }}>AM</span>
          <div className="w-px h-4" style={{ background: 'var(--border)' }} />
          <span className="font-['Space_Grotesk'] text-sm font-bold tracking-[0.3em]"
                style={{ color: ampm === 'PM' ? 'var(--accent)' : 'var(--border)' }}>PM</span>
        </div>

        {!zenMode && (
          <div className="mt-12 text-center">
            <p className="font-['Space_Grotesk'] uppercase tracking-[0.2em] text-xs mb-2"
               style={{ color: 'var(--text-secondary)' }}>Current Session</p>
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold"
                style={{ color: 'var(--text-primary)' }}>Deep Work Phase</h2>
          </div>
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