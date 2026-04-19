import { useState } from 'react'
import { useApp, VIEWS, SKIN_TOKENS, POMODORO_OPTIONS } from '../context/AppContext'

function SettingSection({ title, children }) {
  return (
    <div className="mb-6">
      <p className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest mb-3 px-1"
         style={{ color: 'var(--text-secondary)' }}>{title}</p>
      <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        {children}
      </div>
    </div>
  )
}

function SettingRow({ icon, label, children, last }) {
  return (
    <div className="flex items-center justify-between px-4 py-4"
         style={{ borderBottom: last ? 'none' : '1px solid var(--border)' }}>
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-xl" style={{ color: 'var(--accent)' }}>{icon}</span>
        <span className="font-['Space_Grotesk'] text-sm" style={{ color: 'var(--text-primary)' }}>{label}</span>
      </div>
      <div>{children}</div>
    </div>
  )
}

function ChipGroup({ options, value, onChange }) {
  return (
    <div className="flex gap-2">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className="px-3 py-1 rounded-full text-xs font-['Space_Grotesk'] font-bold transition-all active:scale-95"
          style={{
            background: value === opt.value ? 'var(--accent)' : 'var(--bg-secondary)',
            color: value === opt.value ? 'var(--bg-primary)' : 'var(--text-secondary)',
            border: `1px solid ${value === opt.value ? 'var(--accent)' : 'var(--border)'}`,
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function TimeWheel({ value, min, max, onChange, pad = 2 }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(value <= min ? max : value - 1)}
        className="w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-transform"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
      >
        <span className="material-symbols-outlined text-base" style={{ color: 'var(--text-secondary)' }}>remove</span>
      </button>
      <span className="font-['Space_Grotesk'] text-xl font-bold w-10 text-center tabular-nums"
            style={{ color: 'var(--text-primary)' }}>
        {String(value).padStart(pad, '0')}
      </span>
      <button
        onClick={() => onChange(value >= max ? min : value + 1)}
        className="w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-transform"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
      >
        <span className="material-symbols-outlined text-base" style={{ color: 'var(--text-secondary)' }}>add</span>
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const {
    currentSkin, changeSkin,
    wakeUpTime, setWakeUpTime,
    pomodoroDuration, changePomodoroDuration,
    setCurrentView,
  } = useApp()

  const skinList = Object.entries(SKIN_TOKENS)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-14 pb-4">
        <h1 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}>设置</h1>
        <button
          onClick={() => setCurrentView(VIEWS.CLOCK)}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <span className="material-symbols-outlined text-lg" style={{ color: 'var(--text-secondary)' }}>close</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-5 pb-32 pt-2">

        {/* 番茄钟 */}
        <SettingSection title="专注">
          <SettingRow icon="timer" label="番茄钟时长" last>
            <ChipGroup
              options={POMODORO_OPTIONS}
              value={pomodoroDuration}
              onChange={changePomodoroDuration}
            />
          </SettingRow>
        </SettingSection>

        {/* 睡眠 */}
        <SettingSection title="睡眠">
          <SettingRow icon="alarm" label="唤醒时间" last>
            <div className="flex items-center gap-2">
              <TimeWheel
                value={wakeUpTime.hour}
                min={0} max={23}
                onChange={h => setWakeUpTime(prev => ({ ...prev, hour: h }))}
              />
              <span className="font-['Space_Grotesk'] text-xl font-bold"
                    style={{ color: 'var(--text-secondary)' }}>:</span>
              <TimeWheel
                value={wakeUpTime.minute}
                min={0} max={59}
                onChange={m => setWakeUpTime(prev => ({ ...prev, minute: m }))}
              />
            </div>
          </SettingRow>
        </SettingSection>

        {/* 皮肤 */}
        <SettingSection title="外观">
          {skinList.map(([id, token], i) => (
            <button
              key={id}
              onClick={() => changeSkin(id)}
              className="w-full flex items-center justify-between px-4 py-3 transition-all active:opacity-70"
              style={{ borderBottom: i < skinList.length - 1 ? '1px solid var(--border)' : 'none' }}
            >
              <div className="flex items-center gap-3">
                {/* 色块预览 */}
                <div className="w-8 h-8 rounded-xl flex-shrink-0 shadow-sm"
                     style={{ background: token['--bg-primary'], border: `2px solid ${token['--accent']}` }}>
                  <div className="w-full h-full rounded-xl flex items-end justify-end p-1">
                    <div className="w-3 h-3 rounded-sm" style={{ background: token['--accent'] }} />
                  </div>
                </div>
                <span className="font-['Space_Grotesk'] text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}>{token.name}</span>
              </div>
              {currentSkin === id && (
                <span className="material-symbols-outlined text-lg" style={{ color: 'var(--accent)' }}>check_circle</span>
              )}
            </button>
          ))}
        </SettingSection>

        {/* 关于 */}
        <SettingSection title="关于">
          <SettingRow icon="info" label="版本" last>
            <span className="font-['Space_Grotesk'] text-sm tabular-nums"
                  style={{ color: 'var(--text-secondary)' }}>v0.3.0</span>
          </SettingRow>
        </SettingSection>

      </main>
    </div>
  )
}