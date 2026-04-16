import { useApp, VIEWS } from '../../context/AppContext'

const navItems = [
  { view: VIEWS.POMODORO, icon: 'alarm',   label: 'Focus' },
  { view: VIEWS.CLOCK,    icon: 'fullscreen', label: 'Clock' },
  { view: VIEWS.SKINS,    icon: 'palette',  label: 'Skins' },
]

export default function BottomNav() {
  const { currentView, setCurrentView } = useApp()
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-8 bg-[#131313]/80 backdrop-blur-xl h-20">
      {navItems.map(({ view, icon, label }) => {
        const isActive = currentView === view
        return (
          <button key={view} onClick={() => setCurrentView(view)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl active:scale-90 transition-transform ${
              isActive ? 'bg-[#2a2a2a] text-[#bdcd9a]' : 'text-[#c6c8ba] hover:bg-[#1f1f1f]'
            }`}>
            <span className="material-symbols-outlined">{icon}</span>
            <span className="text-[10px] uppercase tracking-widest mt-1">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
