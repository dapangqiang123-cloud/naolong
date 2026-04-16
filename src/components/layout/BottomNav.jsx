import { useApp, VIEWS } from '../../context/AppContext'

const navItems = [
  { view: VIEWS.POMODORO,   icon: 'alarm',      label: 'Focus' },
  { view: VIEWS.CLOCK,      icon: 'fullscreen', label: 'Clock' },
  { view: VIEWS.SLEEP_SETUP, icon: 'bedtime',   label: 'Sleep' },
]

export default function BottomNav() {
  const { currentView, setCurrentView } = useApp()
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-8 backdrop-blur-xl h-20"
         style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border)' }}>
      {navItems.map(({ view, icon, label }) => {
        const isActive = currentView === view || (view === VIEWS.SLEEP_SETUP && currentView === VIEWS.SLEEP_ACTIVE)
        return (
          <button key={view} onClick={() => setCurrentView(view)}
                  className="flex flex-col items-center justify-center p-3 rounded-xl active:scale-90 transition-all"
                  style={{
                    background: isActive ? 'var(--bg-card)' : 'transparent',
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  }}>
            <span className="material-symbols-outlined">{icon}</span>
            <span className="text-[10px] uppercase tracking-widest mt-1 font-['Space_Grotesk']">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}