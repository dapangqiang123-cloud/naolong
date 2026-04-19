import { useEffect } from 'react'
import { AppProvider, useApp, VIEWS } from './context/AppContext'
import BottomNav from './components/layout/BottomNav'
import PomodoroPage from './pages/PomodoroPage'
import FlipClockPage from './pages/FlipClockPage'
import SleepSetupPage from './pages/SleepSetupPage'
import SleepActivePage from './pages/SleepActivePage'
import SettingsPage from './pages/SettingsPage'
import SkinsPage from './pages/SkinsPage'

function WakeLock() {
  useEffect(() => {
    let wakeLock = null

    const request = async () => {
      if ('wakeLock' in navigator) {
        try {
          wakeLock = await navigator.wakeLock.request('screen')
        } catch (e) {
          // 用户拒绝或不支持，静默忽略
        }
      }
    }

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') request()
    }

    request()
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      wakeLock?.release()
    }
  }, [])

  return null
}

function AppInner() {
  const { currentView, zenMode } = useApp()
  const isImmersive = currentView === VIEWS.SLEEP_ACTIVE
  return (
    <div className="dark min-h-screen w-full" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <WakeLock />
      <main className={isImmersive ? '' : 'pb-20'}>
        {currentView === VIEWS.POMODORO     && <PomodoroPage />}
        {currentView === VIEWS.CLOCK        && <FlipClockPage />}
        {currentView === VIEWS.SLEEP_SETUP  && <SleepSetupPage />}
        {currentView === VIEWS.SLEEP_ACTIVE && <SleepActivePage />}
        {currentView === VIEWS.SETTINGS     && <SettingsPage />}
        {currentView === VIEWS.SKINS        && <SkinsPage />}
      </main>
      {!isImmersive && !zenMode && <BottomNav />}
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