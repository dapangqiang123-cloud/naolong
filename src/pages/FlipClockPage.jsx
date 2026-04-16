import { useApp, VIEWS } from '../context/AppContext'
import FlipDigit from '../components/ui/FlipDigit'
import { useFlipClock } from '../hooks/useFlipClock'

export default function FlipClockPage() {
  const { setCurrentView } = useApp()
  const { h0, h1, m0, m1, s0, s1, ampm } = useFlipClock()
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col"
         style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1f1f1f_0%,transparent_100%)]" />
      </div>
      <header className="relative z-10 flex justify-between items-center px-6 h-16 w-full"
              style={{ background: 'var(--bg-primary)' }}>
        <span className="material-symbols-outlined cursor-pointer" style={{ color: 'var(--accent)' }}>menu</span>
        <nav className="flex gap-8">
          <button onClick={() => setCurrentView(VIEWS.POMODORO)}
                  className="font-['Space_Grotesk'] font-bold tracking-tight transition-colors"
                  style={{ color: 'var(--text-secondary)' }}>番茄钟</button>
          <button className="font-['Space_Grotesk'] font-bold tracking-tight pb-1 border-b-2"
                  style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>时钟</button>
          <button onClick={() => setCurrentView(VIEWS.SLEEP_SETUP)}
                  className="font-['Space_Grotesk'] font-bold tracking-tight transition-colors"
                  style={{ color: 'var(--text-secondary)' }}>快眠</button>
        </nav>
        <span className="material-symbols-outlined cursor-pointer" style={{ color: 'var(--accent)' }}>more_vert</span>
      </header>
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
        <div className="absolute top-12 left-12 opacity-10 pointer-events-none select-none">
          <p className="font-['Space_Grotesk'] text-8xl font-bold tracking-tighter">FOCUS</p>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex gap-2">
            <FlipDigit value={h0} />
            <FlipDigit value={h1} />
          </div>
          <div className="flex flex-col gap-4 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ background: 'var(--accent)' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: 'var(--accent)' }} />
          </div>
          <div className="flex gap-2">
            <FlipDigit value={m0} />
            <FlipDigit value={m1} />
          </div>
          <div className="flex flex-col gap-4 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--border)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--border)' }} />
          </div>
          <div className="flex gap-2">
            <FlipDigit value={s0} className="w-16 h-24 md:w-20 md:h-32" digitClass="text-5xl md:text-6xl" />
            <FlipDigit value={s1} className="w-16 h-24 md:w-20 md:h-32" digitClass="text-5xl md:text-6xl" />
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
