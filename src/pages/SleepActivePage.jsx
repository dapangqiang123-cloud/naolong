import { useState } from 'react'
import { useApp, VIEWS } from '../context/AppContext'
import { useFlipClock } from '../hooks/useFlipClock'
import { useAntiburn } from '../hooks/useAntiburn'

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

export default function SleepActivePage() {
  const { setCurrentView, wakeUpTime, playingMap, volumeMap, toggleSound, setVolume, stopAllSounds } = useApp()
  const { timeStr, ampm } = useFlipClock()
  const { isDimmed, resetTimer } = useAntiburn(5000)

  const [showSoundPanel, setShowSoundPanel] = useState(false)
  const [activeTab, setActiveTab] = useState('sleep')

  const wakeStr = `${String(wakeUpTime.hour).padStart(2,'0')}:${String(wakeUpTime.minute).padStart(2,'0')}`
  const anyPlaying = Object.values(playingMap).some(Boolean)
  const currentSounds = activeTab === 'sleep' ? SLEEP_SOUNDS : WAKE_SOUNDS

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

      {/* 顶部控制 */}
      <div className={`absolute top-12 left-0 w-full px-8 flex justify-between items-center transition-opacity duration-500 z-10 ${isDimmed ? 'opacity-0' : 'opacity-40 hover:opacity-100'}`}>
        <button onClick={() => { stopAllSounds(); setCurrentView(VIEWS.SLEEP_SETUP) }} className="p-2 cursor-pointer">
          <span className="material-symbols-outlined text-[#e5e2e1]">close</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#bbcf7c] text-sm"
                style={{fontVariationSettings:"'FILL' 1"}}>bedtime</span>
          <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#e5e2e1]">Sleep Mode</span>
        </div>
        <div className="w-10" />
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

        {/* 唤醒时间标签 */}
        <div className="mt-12 px-6 py-2 bg-white/5 backdrop-blur-md rounded-full flex items-center gap-3 border border-white/5">
          <span className="material-symbols-outlined text-[#bbcf7c] text-sm">alarm</span>
          <span className="font-['Space_Grotesk'] text-xs tracking-wider text-[#c6c8ba]">
            唤醒时间 {wakeStr}
          </span>
        </div>

        {/* 音效按钮 */}
        <button
          onClick={(e) => { e.stopPropagation(); setShowSoundPanel(true) }}
          className="mt-6 px-6 py-2 rounded-full flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          style={{
            background: anyPlaying ? 'rgba(187,207,124,0.15)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${anyPlaying ? 'rgba(187,207,124,0.4)' : 'rgba(255,255,255,0.08)'}`,
          }}>
          <span className="material-symbols-outlined text-sm"
                style={{ color: '#bbcf7c', fontVariationSettings: "'FILL' 1" }}>
            {anyPlaying ? 'volume_up' : 'music_note'}
          </span>
          <span className="font-['Space_Grotesk'] text-xs tracking-wider text-[#c6c8ba]">
            {anyPlaying ? '音效播放中' : '环境音效'}
          </span>
        </button>
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

      {/* 全屏音效面板 */}
      {showSoundPanel && (
        <div
          className="absolute inset-0 z-50 flex flex-col"
          style={{ background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(20px)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 面板头部 */}
          <div className="flex justify-between items-center px-8 pt-16 pb-6">
            <h2 className="font-['Space_Grotesk'] font-bold text-xl text-[#e5e2e1]">环境音效</h2>
            <button onClick={() => setShowSoundPanel(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
                    style={{ background: 'rgba(255,255,255,0.08)' }}>
              <span className="material-symbols-outlined text-[#e5e2e1]">close</span>
            </button>
          </div>

          {/* Tab 切换 */}
          <div className="px-8 mb-6">
            <div className="flex gap-2 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
              {[{ id: 'sleep', label: '助眠音效' }, { id: 'wake', label: '起床音乐' }].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                        className="flex-1 py-2 rounded-lg text-xs font-medium tracking-wider transition-all cursor-pointer"
                        style={{
                          background: activeTab === tab.id ? '#bbcf7c' : 'transparent',
                          color: activeTab === tab.id ? '#0a0a0a' : 'rgba(255,255,255,0.4)',
                        }}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 音效列表 */}
          <div className="flex-1 overflow-y-auto px-8 pb-12 space-y-3">
            {currentSounds.map(sound => {
              const isPlaying = !!playingMap[sound.id]
              const vol = volumeMap[sound.id] ?? 0.6
              return (
                <div key={sound.id} className="rounded-xl p-4 transition-all"
                     style={{
                       background: isPlaying ? 'rgba(187,207,124,0.1)' : 'rgba(255,255,255,0.04)',
                       border: `1px solid ${isPlaying ? 'rgba(187,207,124,0.4)' : 'rgba(255,255,255,0.08)'}`,
                     }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-xl"
                            style={{ color: '#bbcf7c', fontVariationSettings: "'FILL' 1" }}>
                        {sound.icon}
                      </span>
                      <span className="font-['Space_Grotesk'] text-sm font-medium text-[#e5e2e1]">
                        {sound.label}
                      </span>
                    </div>
                    <button onClick={() => toggleSound(sound)}
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 cursor-pointer"
                            style={{ background: isPlaying ? '#bbcf7c' : 'rgba(255,255,255,0.1)' }}>
                      <span className="material-symbols-outlined text-base"
                            style={{ color: isPlaying ? '#0a0a0a' : 'rgba(255,255,255,0.5)',
                                     fontVariationSettings: "'FILL' 1" }}>
                        {isPlaying ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                  </div>
                  {isPlaying && (
                    <div className="flex items-center gap-3 mt-3">
                      <span className="material-symbols-outlined text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>volume_down</span>
                      <input type="range" min="0" max="1" step="0.01" value={vol}
                             onChange={(e) => setVolume(sound, e.target.value)}
                             className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                             style={{ accentColor: '#bbcf7c' }} />
                      <span className="material-symbols-outlined text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>volume_up</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
