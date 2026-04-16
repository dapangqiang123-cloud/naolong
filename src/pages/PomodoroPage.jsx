import { useApp, VIEWS } from '../context/AppContext'
import FlipDigit from '../components/ui/FlipDigit'
import { usePomodoro } from '../hooks/usePomodoro'

export default function PomodoroPage() {
  const { setCurrentView } = useApp()
  const { m0, m1, s0, s1, isRunning, start, pause, reset, isFinished } = usePomodoro()

  return (
    <div className="relative min-h-screen bg-[#131313] text-[#e2e2e2] overflow-hidden flex flex-col">

      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1f1f1f_0%,transparent_100%)]" />
      </div>

      {/* 顶部导航 */}
      <header className="relative z-10 bg-[#131313] flex justify-between items-center px-6 h-16 w-full">
        <span className="material-symbols-outlined text-[#bdcd9a] cursor-pointer">menu</span>
        <nav className="flex gap-8">
          <button className="font-['Space_Grotesk'] font-bold tracking-tight text-[#bdcd9a] border-b-2 border-[#bdcd9a] pb-1">
            番茄钟
          </button>
          <button onClick={() => setCurrentView(VIEWS.CLOCK)}
            className="font-['Space_Grotesk'] font-bold tracking-tight text-[#c6c8ba] hover:text-white transition-colors">
            时钟
          </button>
          <button onClick={() => setCurrentView(VIEWS.SLEEP_SETUP)}
            className="font-['Space_Grotesk'] font-bold tracking-tight text-[#c6c8ba] hover:text-white transition-colors">
            快眠
          </button>
        </nav>
        <span className="material-symbols-outlined text-[#bdcd9a] cursor-pointer">more_vert</span>
      </header>

      {/* 主体 */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">

        {/* 背景大字 */}
        <div className="absolute top-12 left-12 opacity-10 pointer-events-none select-none">
          <p className="font-['Space_Grotesk'] text-8xl font-bold tracking-tighter">
            {isRunning ? 'FOCUS' : isFinished ? 'DONE' : 'READY'}
          </p>
        </div>

        {/* 番茄钟数字 */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* 分钟 */}
          <div className="flex gap-2">
            <FlipDigit value={m0} />
            <FlipDigit value={m1} />
          </div>

          {/* 分隔点 */}
          <div className="flex flex-col gap-4 mb-1">
            <div className={`w-3 h-3 rounded-full transition-colors ${isRunning ? 'bg-[#bdcd9a]' : 'bg-[#45483e]'}`} />
            <div className={`w-3 h-3 rounded-full transition-colors ${isRunning ? 'bg-[#bdcd9a]' : 'bg-[#45483e]'}`} />
          </div>

          {/* 秒钟 */}
          <div className="flex gap-2">
            <FlipDigit value={s0} />
            <FlipDigit value={s1} />
          </div>
        </div>

        {/* 状态标签 */}
        <div className="mt-12 text-center">
          <p className="font-['Space_Grotesk'] text-[#c6c8ba] uppercase tracking-[0.2em] text-xs mb-2">
            {isFinished ? '🍅 完成！' : 'Pomodoro Session'}
          </p>
          <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-white">
            {isFinished ? '休息一下吧' : isRunning ? 'Deep Work Phase' : '准备开始'}
          </h2>
        </div>

        {/* 操作按钮 */}
        <div className="absolute bottom-28 w-full px-12 flex flex-col items-center gap-10">

          {/* 主按钮：开始/暂停 */}
          <button
            onClick={isRunning ? pause : start}
            className="w-full max-w-xs h-16 rounded-full bg-gradient-to-br from-[#bdcd9a] to-[#889668] text-[#222d0a] font-['Space_Grotesk'] font-bold text-xl active:scale-95 transition-transform shadow-[0_0_32px_0_rgba(189,205,154,0.12)]"
          >
            {isRunning ? '暂停' : isFinished ? '再来一轮' : '开始专注'}
          </button>

          {/* 次要按钮 */}
          <div className="flex items-center gap-16">
            <button onClick={reset} className="flex flex-col items-center gap-2 group">
              <span className="material-symbols-outlined text-[#c6c8ba] group-hover:text-white transition-colors"
                    style={{fontSize:'28px'}}>refresh</span>
              <span className="font-['Space_Grotesk'] text-[10px] text-[#c6c8ba] uppercase tracking-widest">重置</span>
            </button>
            <button onClick={() => setCurrentView(VIEWS.SETTINGS)} className="flex flex-col items-center gap-2 group">
              <span className="material-symbols-outlined text-[#c6c8ba] group-hover:text-white transition-colors"
                    style={{fontSize:'28px'}}>settings</span>
              <span className="font-['Space_Grotesk'] text-[10px] text-[#c6c8ba] uppercase tracking-widest">设置</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
