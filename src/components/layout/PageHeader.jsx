import { useState } from 'react'
import { useApp, VIEWS } from '../../context/AppContext'

export default function PageHeader({ currentTab }) {
  const { setCurrentView } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [copied, setCopied] = useState(false)

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

  const overlayStyle = {
    position: 'fixed', inset: 0, zIndex: 100,
  }

  const dropdownStyle = {
    position: 'absolute',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    zIndex: 200,
    minWidth: '160px',
    overflow: 'hidden',
  }

  const itemStyle = {
    display: 'flex', alignItems: 'center', gap: '12px',
    width: '100%', padding: '14px 16px',
    background: 'none', border: 'none',
    color: 'var(--text-primary)',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '14px', fontWeight: 500,
    cursor: 'pointer', textAlign: 'left',
  }

  return (
    <header style={{
      position: 'relative', zIndex: 10,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0 24px', height: '64px',
      background: 'var(--bg-primary)',
    }}>

      {/* 点击遮罩关闭菜单 */}
      {(menuOpen || moreOpen) && (
        <div
          style={overlayStyle}
          onClick={() => { setMenuOpen(false); setMoreOpen(false) }}
        />
      )}

      {/* 左：三条杠 */}
      <div style={{ position: 'relative', zIndex: 201 }}>
        <button
          onClick={() => { setMenuOpen(v => !v); setMoreOpen(false) }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
        >
          <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: '24px' }}>menu</span>
        </button>
        {menuOpen && (
          <div style={{ ...dropdownStyle, top: '48px', left: 0 }}>
            <button style={itemStyle} onClick={() => { setCurrentView(VIEWS.SKINS); setMenuOpen(false) }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: '20px' }}>palette</span>
              皮肤中心
            </button>
          </div>
        )}
      </div>

      {/* 中：tabs */}
      <nav style={{ display: 'flex', gap: '32px' }}>
        {tabs.map(({ label, view }) => (
          <button key={view}
            onClick={() => setCurrentView(view)}
            style={{
              background: 'none', border: 'none',
              borderBottom: currentTab === view ? '2px solid var(--accent)' : '2px solid transparent',
              color: currentTab === view ? 'var(--accent)' : 'var(--text-secondary)',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: '14px',
              cursor: 'pointer', padding: '0 0 4px 0',
            }}>
            {label}
          </button>
        ))}
      </nav>

      {/* 右：三个点 */}
      <div style={{ position: 'relative', zIndex: 201 }}>
        <button
          onClick={() => { setMoreOpen(v => !v); setMenuOpen(false) }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
        >
          <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: '24px' }}>more_vert</span>
        </button>
        {moreOpen && (
          <div style={{ ...dropdownStyle, top: '48px', right: 0 }}>
            <button style={itemStyle} onClick={copyLink}>
              <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: '20px' }}>link</span>
              {copied ? '已复制 ✓' : '复制链接'}
            </button>
            <div style={{ height: '1px', background: 'var(--border)' }} />
            <button style={itemStyle} onClick={() => { alert('海报生成功能开发中 🎨'); setMoreOpen(false) }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: '20px' }}>image</span>
              生成海报
            </button>
          </div>
        )}
      </div>
    </header>
  )
}