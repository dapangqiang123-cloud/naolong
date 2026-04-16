import { useState } from 'react'
import { useApp, VIEWS } from '../../context/AppContext'

export default function PageHeader({ currentTab }) {
  const { setCurrentView } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [skinPressed, setSkinPressed] = useState(false)
  const [copyPressed, setCopyPressed] = useState(false)

  const copyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href)
    } catch {
      const el = document.createElement('input')
      el.value = window.location.href
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setMoreOpen(false)
    setTimeout(() => setCopied(false), 1500)
  }

  const tabs = [
    { label: '番茄钟', view: VIEWS.POMODORO },
    { label: '时钟',   view: VIEWS.CLOCK },
    { label: '快眠',   view: VIEWS.SLEEP_SETUP },
  ]

  const dropdownStyle = {
    position: 'absolute',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    zIndex: 200,
    minWidth: '180px',
    overflow: 'hidden',
  }

  return (
    <header style={{
      position: 'relative', zIndex: 10,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0 24px', height: '64px',
      background: 'var(--bg-primary)',
    }}>

      {(menuOpen || moreOpen) && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 100 }}
          onClick={() => { setMenuOpen(false); setMoreOpen(false) }}
        />
      )}

      {/* 左：三条杠 */}
      <div style={{ position: 'relative', zIndex: 201 }}>
        <button
          onClick={() => { setMenuOpen(v => !v); setMoreOpen(false) }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '12px', margin: '-12px',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: '24px', display: 'block', pointerEvents: 'none' }}>menu</span>
        </button>
        {menuOpen && (
          <div style={{ ...dropdownStyle, top: '52px', left: '-8px' }}>
            <button
              onTouchStart={() => setSkinPressed(true)}
              onTouchEnd={() => { setSkinPressed(false); setCurrentView(VIEWS.SKINS); setMenuOpen(false) }}
              onClick={() => { setCurrentView(VIEWS.SKINS); setMenuOpen(false) }}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                width: '100%', padding: '16px 20px',
                background: skinPressed ? 'var(--accent-soft)' : 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '15px', fontWeight: 500,
                cursor: 'pointer', textAlign: 'left',
                boxSizing: 'border-box',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                transition: 'background 0.1s',
              }}
            >
              <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: '22px', pointerEvents: 'none', flexShrink: 0 }}>palette</span>
              <span style={{ pointerEvents: 'none' }}>皮肤中心</span>
            </button>
          </div>
        )}
      </div>

      {/* 中：tabs */}
      <nav style={{ display: 'flex', gap: '28px' }}>
        {tabs.map(({ label, view }) => (
          <button key={view}
            onClick={() => setCurrentView(view)}
            style={{
              background: 'none', border: 'none',
              borderBottom: currentTab === view ? '2px solid var(--accent)' : '2px solid transparent',
              color: currentTab === view ? 'var(--accent)' : 'var(--text-secondary)',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: '14px',
              cursor: 'pointer', padding: '4px 0',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
            }}>
            {label}
          </button>
        ))}
      </nav>

      {/* 右：三个点 */}
      <div style={{ position: 'relative', zIndex: 201 }}>
        <button
          onClick={() => { setMoreOpen(v => !v); setMenuOpen(false) }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '12px', margin: '-12px',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: '24px', display: 'block', pointerEvents: 'none' }}>more_vert</span>
        </button>
        {moreOpen && (
          <div style={{ ...dropdownStyle, top: '52px', right: '-8px' }}>
            <button
              onTouchStart={() => setCopyPressed(true)}
              onTouchEnd={() => { setCopyPressed(false); copyLink() }}
              onClick={copyLink}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                width: '100%', padding: '16px 20px',
                background: copyPressed ? 'var(--accent-soft)' : copied ? 'var(--accent-soft)' : 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '15px', fontWeight: 500,
                cursor: 'pointer', textAlign: 'left',
                boxSizing: 'border-box',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                transition: 'background 0.1s',
              }}
            >
              <span className="material-symbols-outlined" style={{ color: copied ? 'var(--accent)' : 'var(--accent)', fontSize: '22px', pointerEvents: 'none', flexShrink: 0 }}>
                {copied ? 'check_circle' : 'link'}
              </span>
              <span style={{ pointerEvents: 'none' }}>{copied ? '已复制 ✓' : '复制链接'}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}