import { useApp, VIEWS } from '../context/AppContext'
import { useFlipClock } from '../hooks/useFlipClock'
import { useAntiburn } from '../hooks/useAntiburn'

export default function SleepActivePage() {
  const { setCurrentView, wakeUpTime } = useApp()
  const { timeStr, ampm } = useFlipClock()
  const { isDimmed, resetTimer } = useAntiburn(5000)

  const wakeStr = `${String(wakeUpTime.hour).padStart(2,'0')}:${String(wakeUpTime.minute).padStart(2,'0')}`

  return (
    <div
      onClick={resetTimer}
      onMouseMove={resetTimer}
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center cursor-none"
      style={{ background: 'radial-gradient(circle at center top, #1a2404 0%, #0e0e0e 70%)' }}
    >
      {/* 防烧屏遮罩 */}
      <div className={`absolute inset-0 bg-black z-40 pointer-events-none transition-opacity duration-1000 ${isDimmed ? 'opacity-80' : 'opacity-0'}`} />

      {/* 背景光晕 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3f4f08]/5 to-transparent pointer-events-none" />

      {/* 顶部控制（鼠标靠近才显示） */}
      <div className={`absolute top-12 left-0 w-full px-8 flex justify-between items-center transition-opacity duration-500 z-10 ${isDimmed ? 'opacity-0' : 'opacity-40 hover:opacity-100'}`}>
        <button onClick={() => setCurrentView(VIEWS.SLEEP_SETUP)} className="p-2">
          <span className="material-symbols-outlined text-[#e5e2e1]">close</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#bbcf7c] text-sm"
                style={{fontVariationSettings:"'FILL' 1"}}>bedtime</span>
          <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#e5e2e1]">Sleep Mode</span>
        </div>
        <button className="p-2">
          <span className="material-symbols-outlined text-[#e5e2e1]">more_vert</span>
        </button>
      </div>

      {/* 主时间显示 */}
      <div className={`flex flex-col items-center text-center z-10 transition-opacity duration-1000 ${isDimmed ? 'opacity-20' : 'opacity-100'}`}>
        <h1 className="font-['Manrope'] font-extralight leading-none tracking-tighter text-[#e5e2e1]"
            style={{fontSize:'clamp(80px, 20vw, 180px)'}}>
          {timeStr}
        </h1>
        <span className="font-['Space_Grotesk'] font-light text-2xl tracking-[0.5em] text-[#909286] mt-2 opacity-60">
          {ampm}
        </span>

        {/* 闹钟标签 */}
        <div className="mt-12 px-6 py-2 bg-white/5 backdrop-blur-md rounded-full flex items-center gap-3 border border-white/5">
          <span className="material-symbols-outlined text-[#bbcf7c] text-sm">alarm</span>
          <span className="font-['Space_Grotesk'] text-xs tracking-wider text-[#c6c8ba]">
            唤醒时间 {wakeStr}
          </span>
        </div>
      </div>

      {/* 防烧屏提示 */}
      {isDimmed && (
        <div className="absolute bottom-20 z-50 text-center">
          <p className="font-['Space_Grotesk'] text-[#45483e] text-xs tracking-widest uppercase">
            点击屏幕唤醒
          </p>
        </div>
      )}

      {/* 装饰光球 */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#bbcf7c]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-[#3f4f08]/10 rounded-full blur-[80px] pointer-events-none" />
    </div>
  )
}
