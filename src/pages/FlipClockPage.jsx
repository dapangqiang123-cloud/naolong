import FlipDigit from '../components/ui/FlipDigit'
import PageHeader from '../components/layout/PageHeader'
import { useFlipClock } from '../hooks/useFlipClock'
import { VIEWS } from '../context/AppContext'

export default function FlipClockPage() {
  const { h0, h1, m0, m1, s0, s1, ampm } = useFlipClock()
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col"
         style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1f1f1f_0%,transparent_100%)]" />
      </div>
      <PageHeader currentTab={VIEWS.CLOCK} />
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
        <div className="absolute top-12 left-12 opacity-10 pointer-events-none select-none">
          <p className="font-['Space_Grotesk'] text-8xl font-bold tracking-tighter">FOCUS</p>
        </div>
        <div className="flex items-center gap-2 md:gap-6">
          <div className="flex gap-1 md:gap-2">
            <FlipDigit value={h0} />
            <FlipDigit value={h1} />
          </div>
          <div className="flex flex-col gap-3 mb-1">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full" style={{ background: 'var(--accent)' }} />
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full" style={{ background: 'var(--accent)' }} />
          </div>
          <div className="flex gap-1 md:gap-2">
            <FlipDigit value={m0} />
            <FlipDigit value={m1} />
          </div>
          <div className="flex flex-col gap-3 mb-1">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--border)' }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--border)' }} />
          </div>
          <div className="flex gap-1 md:gap-2">
            <FlipDigit value={s0} className="w-[14vw] h-[21vw] max-w-[80px] max-h-[120px]" digitClass="text-[7vw] max-text-5xl" />
            <FlipDigit value={s1} className="w-[14vw] h-[21vw] max-w-[80px] max-h-[120px]" digitClass="text-[7vw] max-text-5xl" />
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <span className="font-['Space_Grotesk'] text-sm font-bold tracking-[0.3em] transition-colors"
                style={{ color: ampm === 'AM' ? 'var(--accent)' : 'var(--border)' }}>AM</span>
          <div className="w-px h-4" style={{ background: 'var(--border)' }} />
          <span className="font-['Space_Grotesk'] text-sm font-bold tracking-[0.3em] transition-colors"
                style={{ color: ampm === 'PM' ? 'var(--accent)' : 'var(--border)' }}>PM</span>
        </div>
        <div className="mt-12 text-center">
          <p className="font-['Space_Grotesk'] uppercase tracking-[0.2em] text-xs mb-2"
             style={{ color: 'var(--text-secondary)' }}>Current Session</p>
          <h2 className="font-['Space_Grotesk'] text-2xl font-bold"
              style={{ color: 'var(--text-primary)' }}>Deep Work Phase</h2>
        </div>
      </main>
    </div>
  )
}