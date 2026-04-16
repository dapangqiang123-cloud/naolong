import { useState, useEffect } from 'react'
import { useApp, VIEWS } from '../context/AppContext'

export default function SleepSetupPage() {
  const { setCurrentView, setWakeUpTime } = useApp()

  const [wakeHour, setWakeHour] = useState(7)
  const [wakeMinute, setWakeMinute] = useState(0)
  const [sleepDuration, setSleepDuration] = useState('')

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

  const minutes = [0, 15, 30, 45]

  return (
    <div className="relative min-h-screen flex flex-col"
         style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0"
             style={{ background: 'radial-gradient(circle at 50% 50%, var(--accent-soft) 0%, transparent 70%)' }} />
      </div>

      <header className="relative z-10 flex justify-between items-center px-8 h-24">
        <h1 className="font-['Space_Grotesk'] font-bold text-3xl tracking-tight">快眠向导</h1>
        <button onClick={() => setCurrentView(VIEWS.CLOCK)}
                className="w-10 h-10 flex items-center justify-center rounded-full transition-colors"
                style={{ background: 'var(--bg-secondary)' }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--text-secondary)' }}>close</span>
        </button>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-32">
        <div className="w-full max-w-md rounded-2xl p-8"
             style={{
               background: 'var(--bg-card)',
               border: '1px solid var(--border)',
               boxShadow: '0 0 80px rgba(0,0,0,0.3)',
             }}>

          <div className="flex justify-between items-center mb-8">
            <span className="font-['Space_Grotesk'] text-xs tracking-[0.3em] font-medium uppercase"
                  style={{ color: 'var(--text-secondary)' }}>设定唤醒时间</span>
            <span className="material-symbols-outlined text-xl cursor-pointer"
                  style={{ color: 'var(--text-secondary)' }}>tune</span>
          </div>

          {/* 时间选择器 */}
          <div className="flex gap-8 items-center justify-center mb-8">
            <div className="flex flex-col items-center gap-2">
              <button onClick={() => setWakeHour(h => (h + 1) % 24)}
                      className="w-12 h-12 flex items-center justify-center rounded-full transition-colors"
                      style={{ background: 'var(--bg-secondary)' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--text-secondary)' }}>expand_less</span>
              </button>
              <div className="font-['Manrope'] font-extralight text-[5rem] leading-none tracking-tighter"
                   style={{ color: 'var(--text-primary)' }}>
                {String(wakeHour).padStart(2, '0')}
              </div>
              <button onClick={() => setWakeHour(h => (h - 1 + 24) % 24)}
                      className="w-12 h-12 flex items-center justify-center rounded-full transition-colors"
                      style={{ background: 'var(--bg-secondary)' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--text-secondary)' }}>expand_more</span>
              </button>
            </div>

            <div className="font-['Manrope'] font-extralight text-[4rem] mb-2"
                 style={{ color: 'var(--border)' }}>:</div>

            <div className="flex flex-col items-center gap-2">
              <button onClick={() => setWakeMinute(m => minutes[(minutes.indexOf(m) + 1) % minutes.length])}
                      className="w-12 h-12 flex items-center justify-center rounded-full transition-colors"
                      style={{ background: 'var(--bg-secondary)' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--text-secondary)' }}>expand_less</span>
              </button>
              <div className="font-['Manrope'] font-extralight text-[5rem] leading-none tracking-tighter"
                   style={{ color: 'var(--text-primary)' }}>
                {String(wakeMinute).padStart(2, '0')}
              </div>
              <button onClick={() => setWakeMinute(m => { const idx = minutes.indexOf(m); return minutes[(idx - 1 + minutes.length) % minutes.length] })}
                      className="w-12 h-12 flex items-center justify-center rounded-full transition-colors"
                      style={{ background: 'var(--bg-secondary)' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--text-secondary)' }}>expand_more</span>
              </button>
            </div>
          </div>

          <div className="text-center mb-10">
            <p className="font-['Manrope'] text-sm tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              预计睡眠：<span style={{ color: 'var(--text-primary)' }}>{sleepDuration}</span>
            </p>
          </div>

          {/* 环境音 */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { icon: 'water_drop', label: '环境音', value: '雨声' },
              { icon: 'air', label: '白噪音', value: '微风' },
            ].map(item => (
              <div key={item.label}
                   className="rounded-xl p-4 flex flex-col gap-2 cursor-pointer transition-all"
                   style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                <span className="material-symbols-outlined text-lg" style={{ color: 'var(--accent)' }}>{item.icon}</span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>{item.label}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={handleStart}
                  className="w-full h-14 rounded-full font-['Space_Grotesk'] font-bold uppercase tracking-widest text-sm active:scale-95 transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 70%, black))',
                    color: 'var(--bg-primary)',
                    boxShadow: '0 0 32px 0 var(--accent-soft)',
                  }}>
            进入睡眠模式
          </button>
        </div>
      </main>
    </div>
  )
}