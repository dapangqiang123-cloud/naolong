import { createContext, useContext, useState } from 'react'
const AppContext = createContext(null)
export const VIEWS = { POMODORO:'pomodoro', CLOCK:'clock', SLEEP_SETUP:'sleep_setup', SLEEP_ACTIVE:'sleep_active', SETTINGS:'settings', SKINS:'skins' }
export const SKINS = { CLASSIC_MONO:'classic_mono', BRUTALIST_WHITE:'brutalist_white', MECHANICAL_OLIVE:'mechanical_olive', DEEP_VOID:'deep_void' }
export function AppProvider({ children }) {
  const [currentView, setCurrentView] = useState(VIEWS.CLOCK)
  const [currentSkin, setCurrentSkin] = useState(SKINS.CLASSIC_MONO)
  const [wakeUpTime, setWakeUpTime] = useState({ hour: 7, minute: 0 })
  return <AppContext.Provider value={{ currentView, setCurrentView, currentSkin, setCurrentSkin, wakeUpTime, setWakeUpTime }}>{children}</AppContext.Provider>
}
export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
