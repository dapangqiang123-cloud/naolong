import { useState, useRef, useEffect } from 'react'
import { useApp, VIEWS } from '../../context/AppContext'

export default function PageHeader({ currentTab }) {
  const { setCurrentView } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const menuRef = useRef(null)
  const moreRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false)
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => { setCopied(false); setMoreOpen(false) }, 1500)
  }

  const tabs = [
    { label: '番茄钟', view: VIEWS.POMODORO },
    { label: '时钟',   view: VIEWS.CLOCK },
    { label: '快眠',   view: VIEWS.SLEEP_SETUP },
  ]

  const menuItemStyle = {
    display: 'flex', alignItems: 'center', gap: '12px',
    width: '100%', padding: '12px 16px', cursor: 'pointer',
    color: 'var(--text-primary)', background: 'transparent',
    border: 'none', textAlign: 'left', fontSize: '14px',
    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
  }

  return (
    <header className="relative z-10 flex justify-between items-center px-6 h-16 w-full"
            style={{ background: 'var(--bg-primary)' }}>

      {/* 左：三条杠 */}
      <div ref={menuRef} style={{ position: 'relative' }}>
        <button
          onClick={() => { setMenuOpen(v => !v); setMoreOpen(false) }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
        >
          <span className="material-symbols-outlined" style={{ color: 'var(--accent)' }}>menu</span>
        </button>
        {menuOpen && (
          <div style={{
            position: 'absolute', top: '44px', left: 0,
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            zIndex: 9999, minWidth: '160px', overflow: 'hidden',
          }}>
            <button
              style={menuItemStyle}
              onClick={() => { setCurrentView(VIEWS.SKINS); setMenuOpen(false) }}
            >
              <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: '20px' }}>palette</span>
              皮肤中心
            </button>
          </div>
        )}
      </div>

      {/* 中：tabs */}
      <nav className="flex gap-8">
        {tabs.map(({ label, view }) => (
          <button key={view}
                  onClick={() => setCurrentView(view)}
                  className="font-['Space_Grotesk'] font-bold tracking-tight transition-colors pb-1"
                  style={{
                    color: currentTab === view ? 'var(--accent)' : 'var(--text-secondary)',
                    borderBottom: currentTab === view ? '2px solid var(--accent)' : '2px solid transparent',
                    background: 'none', border: 'none',
                    borderBottom: currentTab === view ? `2px solid var(--accent)` : '2px solid transparent',
                    cursor: 'pointer', padding: '0 0 4px 0',
                  }}>
            {label}
          </button>
        ))}
      </nav>

      {/* 右：三个点 */}
      <div ref={moreRef} style={{ position: 'relative' }}>
        <button
          onClick={() => { setMoreOpen(v => !v); setMenuOpen(false) }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
        >
          <span className="material-symbols-outlined" style={{ color: 'var(--accent)' }}>more_vert</span>
        </button>
        {moreOpen && (
          <div style={{
            position: 'absolute', top: '44px', right: 0,
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            zIndex: 9999, minWidth: '160px', overflow: 'hidden',
          }}>
            <button style={menuItemStyle} onClick={handleCopyLink}>
              <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: '20px' }}>link</span>
              {copied ? '已复制 ✓' : '复制链接'}
            </button>
            <div style={{ height: '1px', background: 'var(--border)' }} />
            <button style={menuItemStyle} onClick={() => { alert('海报生成功能开发中 🎨'); setMoreOpen(false) }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: '20px' }}>image</span>
              生成海报
            </button>
          </div>
        )}
      </div>
    </header>
  )
}