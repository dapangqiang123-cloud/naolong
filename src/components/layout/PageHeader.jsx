import { useState, useRef, useEffect } from 'react'
import { useApp, VIEWS } from '../../context/AppContext'

export default function PageHeader({ currentTab }) {
  const { setCurrentView } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const menuRef = useRef(null)
  const moreRef = useRef(null)

  // 点击外部关闭
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => { setCopied(false); setMoreOpen(false) }, 1500)
  }

  const handleSharePoster = () => {
    setMoreOpen(false)
    alert('海报生成功能开发中 🎨')
  }

  const tabs = [
    { label: '番茄钟', view: VIEWS.POMODORO },
    { label: '时钟',   view: VIEWS.CLOCK },
    { label: '快眠',   view: VIEWS.SLEEP_SETUP },
  ]

  return (
    <header className="relative z-10 flex justify-between items-center px-6 h-16 w-full"
            style={{ background: 'var(--bg-primary)' }}>

      {/* 左：三条杠菜单 */}
      <div ref={menuRef} className="relative">
        <button onClick={() => setMenuOpen(v => !v)}>
          <span className="material-symbols-outlined cursor-pointer"
                style={{ color: 'var(--accent)' }}>menu</span>
        </button>
        {menuOpen && (
          <div className="absolute top-10 left-0 rounded-xl shadow-2xl z-50 overflow-hidden min-w-[160px]"
               style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <button
              onClick={() => { setCurrentView(VIEWS.SKINS); setMenuOpen(false) }}
              className="w-full flex items-center gap-3 px-4 py-3 transition-colors text-left"
              style={{ color: 'var(--text-primary)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span className="material-symbols-outlined text-lg" style={{ color: 'var(--accent)' }}>palette</span>
              <span className="font-['Space_Grotesk'] text-sm font-medium">皮肤中心</span>
            </button>
          </div>
        )}
      </div>

      {/* 中：导航 tabs */}
      <nav className="flex gap-8">
        {tabs.map(({ label, view }) => (
          <button key={view}
                  onClick={() => setCurrentView(view)}
                  className="font-['Space_Grotesk'] font-bold tracking-tight transition-colors pb-1"
                  style={{
                    color: currentTab === view ? 'var(--accent)' : 'var(--text-secondary)',
                    borderBottom: currentTab === view ? '2px solid var(--accent)' : '2px solid transparent',
                  }}>
            {label}
          </button>
        ))}
      </nav>

      {/* 右：三个点菜单 */}
      <div ref={moreRef} className="relative">
        <button onClick={() => setMoreOpen(v => !v)}>
          <span className="material-symbols-outlined cursor-pointer"
                style={{ color: 'var(--accent)' }}>more_vert</span>
        </button>
        {moreOpen && (
          <div className="absolute top-10 right-0 rounded-xl shadow-2xl z-50 overflow-hidden min-w-[160px]"
               style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-3 px-4 py-3 transition-colors text-left"
              style={{ color: 'var(--text-primary)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span className="material-symbols-outlined text-lg" style={{ color: 'var(--accent)' }}>link</span>
              <span className="font-['Space_Grotesk'] text-sm font-medium">
                {copied ? '已复制 ✓' : '复制链接'}
              </span>
            </button>
            <div style={{ height: '1px', background: 'var(--border)' }} />
            <button
              onClick={handleSharePoster}
              className="w-full flex items-center gap-3 px-4 py-3 transition-colors text-left"
              style={{ color: 'var(--text-primary)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span className="material-symbols-outlined text-lg" style={{ color: 'var(--accent)' }}>image</span>
              <span className="font-['Space_Grotesk'] text-sm font-medium">生成海报</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}