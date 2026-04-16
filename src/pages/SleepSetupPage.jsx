import { useState, useEffect } from 'react'
import { useApp, VIEWS } from '../context/AppContext'

export default function SleepSetupPage() {
  const { setCurrentView, setWakeUpTime } = useApp()

  const [wakeHour, setWakeHour] = useState(7)
  const [wakeMinute, setWakeMinute] = useState(0)
  const [sleepDuration, setSleepDuration] = useState('')

  // 计算预计睡眠时长
  useEffect(() => {
    const now = new Date()
    const wake = new Date()
    wake.setHours(wakeHour, wakeMinute, 0, 0)
    if (wake <= now) wake.setDate(wake.getDate() + 1)
    const diff = (wake - now) / 1000 / 60
    const h = Math.floor(diff / 60)
    const m = Math.floor(diff % 60)
    setSleepDuration(`${h} 小时 ${m} 分钟`)
  }, [wakeHour, wakeMinute])

  const handleStart = () => {
    setWakeUpTime({ hour: wakeHour, minute: wakeMinute })
    setCurrentView(VIEWS.SLEEP_ACTIVE)
  }

  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = [0, 15, 30, 45]

  return (
    <div className="relative min-h-screen bg-[#131313] text-[#e2e2e2] flex flex-col">
      {/* 背景光晕 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{background:'radial-gradient(circle at 50% 50%, rgba(63,79,8,0.08) 0%, rgba(14,14,14,0) 70%)'}} />
      </div>

      {/* 顶部 */}
      <header className="relative z-10 flex justify-between items-center px-8 h-24">
        <div>
          <h1 className="font-['Space_Grotesk'] font-bold text-3xl tracking-tight">快眠向导</h1>
        </div>
        <div className="flex gap-4 items-center">
          <button onClick={() => setCurrentView(VIEWS.CLOCK)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-[#c6c8ba]">close</span>
          </button>
        </div>
      </header>

      {/* 主体 */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-32">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-3xl rounded-2xl border border-white/10 p-8 shadow-[0_0_80px_rgba(0,0,0,0.5)]">

          {/* 标题 */}
          <div className="flex justify-between items-center mb-8">
            <span className="font-['Space_Grotesk'] text-xs tracking-[0.3em] font-medium text-[#909286] uppercase">设定唤醒时间</span>
            <span className="material-symbols-outlined text-[#c6c8ba] text-xl cursor-pointer">tune</span>
          </div>

          {/* 时间选择器 */}
          <div className="flex gap-8 items-center justify-center mb-8">
            {/* 小时 */}
            <div className="flex flex-col items-center gap-2">
              <button onClick={() => setWakeHour(h => (h + 1) % 24)}
                className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-[#c6c8ba]">expand_less</span>
              </button>
              <div className="font-['Manrope'] font-extralight text-[5rem] leading-none tracking-tighter text-[#e5e2e1]">
                {String(wakeHour).padStart(2, '0')}
              </div>
              <button onClick={() => setWakeHour(h => (h - 1 + 24) % 24)}
                className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-[#c6c8ba]">expand_more</span>
              </button>
            </div>

            {/* 分隔 */}
            <div className="font-['Manrope'] font-extralight text-[4rem] text-[#45483e] mb-2">:</div>

            {/* 分钟 */}
            <div className="flex flex-col items-center gap-2">
              <button onClick={() => setWakeMinute(m => (minutes.indexOf(m) + 1) % minutes.length === 0 ? 0 : minutes[(minutes.indexOf(m) + 1) % minutes.length])}
                className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-[#c6c8ba]">expand_less</span>
              </button>
              <div className="font-['Manrope'] font-extralight text-[5rem] leading-none tracking-tighter text-[#e5e2e1]">
                {String(wakeMinute).padStart(2, '0')}
              </div>
              <button onClick={() => setWakeMinute(m => { const idx = minutes.indexOf(m); return minutes[(idx - 1 + minutes.length) % minutes.length] })}
                className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-[#c6c8ba]">expand_more</span>
              </button>
            </div>
          </div>

          {/* 预计睡眠时长 */}
          <div className="text-center mb-10">
            <p className="text-[#909282] font-['Manrope'] text-sm tracking-wide">
              预计睡眠：<span className="text-[#e5e2e1]">{sleepDuration}</span>
            </p>
          </div>

          {/* 环境音选择 */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { icon: 'water_drop', label: '环境音', value: '雨声' },
              { icon: 'air', label: '白噪音', value: '微风' },
            ].map(item => (
              <div key={item.label}
                className="bg-white/5 rounded-xl p-4 flex flex-col gap-2 border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-[#bbcf7c] text-lg">{item.icon}</span>
                <div>
                  <p className="text-[10px] text-[#909282] uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-[#e5e2e1] text-sm font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 开始按钮 */}
          <button onClick={handleStart}
            className="w-full h-14 rounded-full bg-gradient-to-br from-[#bdcd9a] to-[#889668] text-[#222d0a] font-['Space_Grotesk'] font-bold uppercase tracking-widest text-sm active:scale-95 transition-transform shadow-[0_0_32px_0_rgba(189,205,154,0.12)]">
            进入睡眠模式
          </button>
        </div>
      </main>
    </div>
  )
}
