import { useApp, VIEWS } from '../../context/AppContext'

export default function PageHeader({ currentTab }) {
  const { setCurrentView } = useApp()

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
    alert('链接已复制 ✓')
  }

  const tabs = [
    { label: '番茄钟', view: VIEWS.POMODORO },
    { label: '时钟',   view: VIEWS.CLOCK },
    { label: '快眠',   view: VIEWS.SLEEP_SETUP },
  ]

  return (
    <header style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0 24px', height: '64px',
      background: 'var(--bg-primary)',
      position: 'relative', zIndex: 10,
    }}>

      {/* 左：皮肤中心图标 */}
      <span
        className="material-symbols-outlined"
        onClick={() => setCurrentView(VIEWS.SKINS)}
        style={{ color: 'var(--accent)', fontSize: '26px', cursor: 'pointer', padding: '10px', margin: '-10px' }}
      >
        palette
      </span>

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
            }}>
            {label}
          </button>
        ))}
      </nav>

      {/* 右：复制链接图标 */}
      <span
        className="material-symbols-outlined"
        onClick={copyLink}
        style={{ color: 'var(--accent)', fontSize: '26px', cursor: 'pointer', padding: '10px', margin: '-10px' }}
      >
        ios_share
      </span>

    </header>
  )
}