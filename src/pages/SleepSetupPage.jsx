import { useState, useEffect } from 'react'
import { useApp, VIEWS, TIMER_OPTIONS } from '../context/AppContext'

const SLEEP_SOUNDS = [
  { id: 'rain1', file: '/sounds/sleep/rain1.mp3', label: '春雨', icon: 'water_drop' },
  { id: 'rain2', file: '/sounds/sleep/rain2.mp3', label: '春雷', icon: 'thunderstorm' },
  { id: 'rain3', file: '/sounds/sleep/rain3.mp3', label: '暴雨', icon: 'cloudy_snowing' },
  { id: 'cafe', file: '/sounds/sleep/cafe.mp3', label: '咖啡厅', icon: 'local_cafe' },
  { id: 'fireplace', file: '/sounds/sleep/fireplace.mp3', label: '篝火', icon: 'local_fire_department' },
  { id: 'forest', file: '/sounds/sleep/forest.mp3', label: '森林', icon: 'forest' },
  { id: 'thunderstorm1', file: '/sounds/sleep/thunderstorm1.mp3', label: '雷暴', icon: 'bolt' },
]

const WAKE_SOUNDS = [
  { id: 'rainmusic1', file: '/sounds/wake/rainmusic1.mp3', label: '晨璞', icon: 'wb_sunny' },
  { id: 'rainmusic2', file: '/sounds/wake/rainmusic2.mp3', label: '溪悦', icon: 'water' },
  { id: 'slowmusic', file: '/sounds/wake/slowmusic.mp3', label: '晴雨', icon: 'music_note' },
]

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function SleepSetupPage() {
  const { setCurrentView, setWakeUpTime, playingMap, timerMap, toggleSound, setSoundTimer, clearSoundTimer, stopAllSounds } = useApp()
  const [wakeTime, setWakeTime] = useState('07:00')
  const [sleepDuration, setSleepDuration] = useState('')
  const [activeTab, setActiveTab] = useState('sleep')
  const [expandedTimer, setExpandedTimer] = useState(null)

  useEffect(() => {
    const [h, m] = wakeTime.split(':').map(Number)
    const now = new Date()
    const wake = new Date()
    wake.setHours(h, m, 0, 0)
    if (wake <= now) wake.setDate(wake.getDate() + 1)
    const diff = (wake - now) / 1000 / 60
    const hours = Math.floor(diff / 60)
    const mins = Math.floor(diff % 60)
    setSleepDuration(`${hours} 小时 ${mins} 分钟`)
  }, [wakeTime])

  const handleStart = () => {
    const [h, m] = wakeTime.split(':').map(Number)
    setWakeUpTime({ hour: h, minute: m })
    setCurrentView(VIEWS.SLEEP_ACTIVE)
  }

  const currentSounds = activeTab === 'sleep' ? SLEEP_SOUNDS : WAKE_SOUNDS

  return (
    <div className="relative min-h-screen flex flex-col"
         style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0"
             style={{ background: 'radial-gradient(circle at 50% 50%, var(--accent-soft) 0%, transparent 70%)' }} />
      </div>

      <header className="relative z-10 flex justify-between items-center px-8 h-24">
        <h1 className="font-['Space_Grotesk'] font-bold text-3xl tracking-tight">快眠向导</h1>
        <button onClick={() => { stopAllSounds(); setCurrentView(VIEWS.CLOCK) }}
                className="w-10 h-10 flex items-center justify-center rounded-full transition-colors"
                style={{ background: 'var(--bg-secondary)' }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--text-secondary)' }}>close</span>
        </button>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center px-6 pb-32 pt-4">
        <div className="w-full max-w-md space-y-4">

          {/* 时间卡片 */}
          <div className="rounded-2xl p-6"
               style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: '0 0 80px rgba(0,0,0,0.3)' }}>
            <span className="font-['Space_Grotesk'] text-xs tracking-[0.3em] font-medium uppercase"
                  style={{ color: 'var(--text-secondary)' }}>设定唤醒时间</span>
            <div className="flex flex-col items-center mt-4 mb-4">
              <div className="font-['Manrope'] font-extralight text-[4.5rem] leading-none tracking-tighter mb-4"
                   style={{ color: 'var(--text-primary)' }}>{wakeTime}</div>
              <input type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)}
                     style={{
                       background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                       borderRadius: '12px', color: 'var(--text-primary)',
                       fontFamily: "'Space Grotesk', sans-serif", fontSize: '16px',
                       padding: '12px 20px', width: '100%', textAlign: 'center', outline: 'none', cursor: 'pointer',
                     }} />
            </div>
            <p className="text-center font-['Manrope'] text-sm" style={{ color: 'var(--text-secondary)' }}>
              预计睡眠：<span style={{ color: 'var(--text-primary)' }}>{sleepDuration}</span>
            </p>
          </div>

          {/* 音效卡片 */}
          <div className="rounded-2xl p-6"
               style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div className="flex gap-2 mb-5 p-1 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
              {[{ id: 'sleep', label: '助眠音效' }, { id: 'wake', label: '起床音乐' }].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                        className="flex-1 py-2 rounded-lg text-xs font-medium tracking-wider transition-all"
                        style={{
                          background: activeTab === tab.id ? 'var(--accent)' : 'transparent',
                          color: activeTab === tab.id ? 'var(--bg-primary)' : 'var(--text-secondary)',
                        }}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {currentSounds.map(sound => {
                const isPlaying = !!playingMap[sound.id]
                const remaining = timerMap[sound.id]
                const isExpanded = expandedTimer === sound.id

                return (
                  <div key={sound.id} className="rounded-xl p-4 transition-all"
                       style={{
                         background: isPlaying ? 'var(--accent-soft)' : 'var(--bg-secondary)',
                         border: `1px solid ${isPlaying ? 'var(--accent)' : 'var(--border)'}`,
                       }}>
                    {/* 主行 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-xl"
                              style={{ color: 'var(--accent)', fontVariationSettings: "'FILL' 1" }}>
                          {sound.icon}
                        </span>
                        <span className="font-['Space_Grotesk'] text-sm font-medium"
                              style={{ color: 'var(--text-primary)' }}>{sound.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* 定时显示/按钮 */}
                        {isPlaying && (
                          <button
                            onClick={() => setExpandedTimer(isExpanded ? null : sound.id)}
                            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs cursor-pointer transition-all"
                            style={{
                              background: remaining ? 'var(--accent-soft)' : 'transparent',
                              color: remaining ? 'var(--accent)' : 'var(--text-secondary)',
                              border: `1px solid ${remaining ? 'var(--accent)' : 'var(--border)'}`,
                            }}>
                            <span className="material-symbols-outlined text-sm">timer</span>
                            {remaining ? formatTime(remaining) : '定时'}
                          </button>
                        )}
                        {/* 播放按钮 */}
                        <button onClick={() => toggleSound(sound)}
                                className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90"
                                style={{ background: isPlaying ? 'var(--accent)' : 'var(--border)' }}>
                          <span className="material-symbols-outlined text-base"
                                style={{ color: isPlaying ? 'var(--bg-primary)' : 'var(--text-secondary)',
                                         fontVariationSettings: "'FILL' 1" }}>
                            {isPlaying ? 'pause' : 'play_arrow'}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* 定时选项展开 */}
                    {isPlaying && isExpanded && (
                      <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                        <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>自动关闭</p>
                        <div className="flex flex-wrap gap-2">
                          {remaining && (
                            <button
                              onClick={() => { clearSoundTimer(sound); setExpandedTimer(null) }}
                              className="px-3 py-1 rounded-lg text-xs cursor-pointer transition-all"
                              style={{
                                background: 'var(--accent)',
                                color: 'var(--bg-primary)',
                              }}>
                              取消定时
                            </button>
                          )}
                          {TIMER_OPTIONS.map(opt => (
                            <button key={opt.value}
                                    onClick={() => { setSoundTimer(sound, opt.value); setExpandedTimer(null) }}
                                    className="px-3 py-1 rounded-lg text-xs cursor-pointer transition-all"
                                    style={{
                                      background: 'var(--bg-secondary)',
                                      border: '1px solid var(--border)',
                                      color: 'var(--text-primary)',
                                    }}>
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
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