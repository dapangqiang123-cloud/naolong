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
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('click', handler, true)
    return () => {
      document.removeEventListener('click', handler, true)
    }
  }, [])

  const handleCopyLink = (e) => {
    console.log('handleCopyLink called')
    e?.stopPropagation()
    setMoreOpen(false)
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }).catch(() => {
      // fallback for older browsers
      const el = document.createElement('input')
      el.value = window.location.href
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  const handleSkinCenter = (e) => {
    console.log('handleSkinCenter called')
    e?.stopPropagation()
    setMenuOpen(false)
    setCurrentView(VIEWS.SKINS)
  }

  const handlePoster = (e) => {
    console.log('handlePoster called')
    e?.stopPropagation()
    setMoreOpen(false)
    alert('海报生成功能开发中 🎨')
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
    zIndex: 9999,
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
    pointerEvents: 'auto',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  }

  return (
    <header style={{
      position: 'relative', zIndex: 10,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0 24px', height: '64px',
      background: 'var(--bg-primary)',
    }}>

      {/* 左：三条杠 */}
      <div ref={menuRef} style={{ position: 'relative' }}>
        <button
          onClick={(e) => { e.stopPropagation(); setMenuOpen(v => !v); setMoreOpen(false) }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
        >
          <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: '24px' }}>menu</span>
        </button>
        {menuOpen && (
          <div style={{ ...dropdownStyle, top: '48px', left: 0 }}>
            <div
              style={{...itemStyle, transition: 'background 0.2s'}}
              onClick={(e) => {
                console.log('Menu item clicked!')
                e.stopPropagation()
                handleSkinCenter(e)
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
              onTouchEnd={(e) => {
                console.log('Menu item touched!')
                e.preventDefault()
                e.stopPropagation()
                handleSkinCenter(e)
              }}
            >
              <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: '20px', pointerEvents: 'none' }}>palette</span>
              <span style={{ pointerEvents: 'none' }}>皮肤中心</span>
            </div>
          </div>
        )}
      </div>

      {/* 中：tabs */}
      <nav style={{ display: 'flex', gap: '32px' }}>
        {tabs.map(({ label, view }) => (
          <button key={view}
            onClick={(e) => { e.stopPropagation(); setCurrentView(view) }}
            style={{
              background: 'none', border: 'none',
              borderBottom: currentTab === view ? '2px solid var(--accent)' : '2px solid transparent',
              color: currentTab === view ? 'var(--accent)' : 'var(--text-secondary)',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: '14px',
              cursor: 'pointer', padding: '0 0 4px 0',
              letterSpacing: '-0.02em',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
            }}>
            {label}
          </button>
        ))}
      </nav>

      {/* 右：三个点 */}
      <div ref={moreRef} style={{ position: 'relative' }}>
        <button
          onClick={(e) => { e.stopPropagation(); setMoreOpen(v => !v); setMenuOpen(false) }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
        >
          <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: '24px' }}>more_vert</span>
        </button>
        {moreOpen && (
          <div style={{ ...dropdownStyle, top: '48px', right: 0 }}>
            <div
              style={{...itemStyle, transition: 'background 0.2s'}}
              onClick={(e) => {
                console.log('Copy link clicked!')
                e.stopPropagation()
                handleCopyLink(e)
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
              onTouchEnd={(e) => {
                console.log('Copy link touched!')
                e.preventDefault()
                e.stopPropagation()
                handleCopyLink(e)
              }}
            >
              <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: '20px', pointerEvents: 'none' }}>link</span>
              <span style={{ pointerEvents: 'none' }}>{copied ? '已复制 ✓' : '复制链接'}</span>
            </div>
            <div style={{ height: '1px', background: 'var(--border)' }} />
            <div
              style={{...itemStyle, transition: 'background 0.2s'}}
              onClick={(e) => {
                console.log('Poster clicked!')
                e.stopPropagation()
                handlePoster(e)
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
              onTouchEnd={(e) => {
                console.log('Poster touched!')
                e.preventDefault()
                e.stopPropagation()
                handlePoster(e)
              }}
            >
              <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: '20px', pointerEvents: 'none' }}>image</span>
              <span style={{ pointerEvents: 'none' }}>生成海报</span>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}