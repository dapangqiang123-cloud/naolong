import FlipDigit from '../components/ui/FlipDigit'
import PageHeader from '../components/layout/PageHeader'
import { useApp, VIEWS } from '../context/AppContext'
import { usePomodoro } from '../hooks/usePomodoro'

export default function PomodoroPage() {
  const { setCurrentView } = useApp()
  const { m0, m1, s0, s1, isRunning, start, pause, reset, isFinished } = usePomodoro()

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col"
         style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1f1f1f_0%,transparent_100%)]" />
      </div>
      <PageHeader currentTab={VIEWS.POMODORO} />
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
        <div className="absolute top-12 left-12 opacity-10 pointer-events-none select-none">
          <p className="font-['Space_Grotesk'] text-8xl font-bold tracking-tighter">
            {isRunning ? 'FOCUS' : isFinished ? 'DONE' : 'READY'}
          </p>
        </div>
        <div className="flex items-center gap-2 md:gap-8">
          <div className="flex gap-1 md:gap-2">
            <FlipDigit value={m0} />
            <FlipDigit value={m1} />
          </div>
          <div className="flex flex-col gap-3 mb-1">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors"
                 style={{ background: isRunning ? 'var(--accent)' : 'var(--border)' }} />
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors"
                 style={{ background: isRunning ? 'var(--accent)' : 'var(--border)' }} />
          </div>
          <div className="flex gap-1 md:gap-2">
            <FlipDigit value={s0} />
            <FlipDigit value={s1} />
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="font-['Space_Grotesk'] uppercase tracking-[0.2em] text-xs mb-2"
             style={{ color: 'var(--text-secondary)' }}>
            {isFinished ? '🍅 完成！' : 'Pomodoro Session'}
          </p>
          <h2 className="font-['Space_Grotesk'] text-2xl font-bold"
              style={{ color: 'var(--text-primary)' }}>
            {isFinished ? '休息一下吧' : isRunning ? 'Deep Work Phase' : '准备开始'}
          </h2>
        </div>
        <div className="absolute bottom-28 w-full px-12 flex flex-col items-center gap-10">
          <button
            onClick={isRunning ? pause : start}
            className="w-full max-w-xs h-16 rounded-full font-['Space_Grotesk'] font-bold text-xl active:scale-95 transition-transform"
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
      </main>
    </div>
  )
}