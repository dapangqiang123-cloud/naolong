import { AppProvider, useApp, VIEWS } from './context/AppContext'
import BottomNav from './components/layout/BottomNav'
import PomodoroPage from './pages/PomodoroPage'
import FlipClockPage from './pages/FlipClockPage'
import SleepSetupPage from './pages/SleepSetupPage'
import SleepActivePage from './pages/SleepActivePage'
import SettingsPage from './pages/SettingsPage'
import SkinsPage from './pages/SkinsPage'

function AppInner() {
  const { currentView } = useApp()
  const isImmersive = currentView === VIEWS.SLEEP_ACTIVE
  return (
    <div className="dark min-h-screen w-full bg-[#131313] text-[#e2e2e2]">
      <main className={isImmersive ? '' : 'pb-20'}>
        {currentView === VIEWS.POMODORO     && <PomodoroPage />}
        {currentView === VIEWS.CLOCK        && <FlipClockPage />}
        {currentView === VIEWS.SLEEP_SETUP  && <SleepSetupPage />}
        {currentView === VIEWS.SLEEP_ACTIVE && <SleepActivePage />}
        {currentView === VIEWS.SETTINGS     && <SettingsPage />}
        {currentView === VIEWS.SKINS        && <SkinsPage />}
      </main>
      {!isImmersive && <BottomNav />}
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  )
}
