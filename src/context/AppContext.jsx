import { createContext, useContext, useState, useEffect, useRef } from 'react'

const AppContext = createContext(null)

export const VIEWS = {
  POMODORO: 'pomodoro',
  CLOCK: 'clock',
  SLEEP_SETUP: 'sleep_setup',
  SLEEP_ACTIVE: 'sleep_active',
  SETTINGS: 'settings',
  SKINS: 'skins'
}

export const SKINS = {
  CLASSIC_MONO: 'classic_mono',
  BRUTALIST_WHITE: 'brutalist_white',
  MECHANICAL_OLIVE: 'mechanical_olive',
  DEEP_VOID: 'deep_void',
  VINTAGE_LATTE: 'vintage_latte',
}

const SKIN_TOKENS = {
  classic_mono: {
    name: '经典黑',
    '--bg-primary': '#131313',
    '--bg-secondary': '#1b1b1b',
    '--bg-card': '#2a2a2a',
    '--text-primary': '#e2e2e2',
    '--text-secondary': '#c6c8ba',
    '--accent': '#bdcd9a',
    '--accent-soft': 'rgba(189,205,154,0.15)',
    '--border': 'rgba(189,205,154,0.15)',
  },
  brutalist_white: {
    name: '极光白',
    '--bg-primary': '#f5f5f7',
    '--bg-secondary': '#ffffff',
    '--bg-card': '#ffffff',
    '--text-primary': '#1d1d1f',
    '--text-secondary': '#6e6e73',
    '--accent': '#7c3aed',
    '--accent-soft': 'rgba(124,58,237,0.10)',
    '--border': 'rgba(0,0,0,0.08)',
  },
  mechanical_olive: {
    name: '机械橄榄',
    '--bg-primary': '#0a130d',
    '--bg-secondary': '#111f14',
    '--bg-card': '#162419',
    '--text-primary': '#e8f5ea',
    '--text-secondary': '#7aad84',
    '--accent': '#4ade80',
    '--accent-soft': 'rgba(74,222,128,0.15)',
    '--border': 'rgba(74,222,128,0.12)',
  },
  deep_void: {
    name: '深海',
    '--bg-primary': '#071428',
    '--bg-secondary': '#0d1f3c',
    '--bg-card': '#102244',
    '--text-primary': '#e8f4ff',
    '--text-secondary': '#7aaed4',
    '--accent': '#38bdf8',
    '--accent-soft': 'rgba(56,189,248,0.15)',
    '--border': 'rgba(56,189,248,0.12)',
  },
  vintage_latte: {
    name: '复古拿铁',
    '--bg-primary': '#f0e6d3',
    '--bg-secondary': '#e8d9c0',
    '--bg-card': '#ded0b6',
    '--text-primary': '#2c1f0e',
    '--text-secondary': '#7a5c3a',
    '--accent': '#8b4513',
    '--accent-soft': 'rgba(139,69,19,0.12)',
    '--border': 'rgba(139,69,19,0.15)',
  },
}

const STORAGE_KEY = 'naolong_skin'
const POMODORO_KEY = 'naolong_pomodoro_duration'

export const POMODORO_OPTIONS = [
  { label: '25 min', value: 25 },
  { label: '45 min', value: 45 },
  { label: '60 min', value: 60 },
]

export const TIMER_OPTIONS = [
  { label: '10分钟', value: 10 },
  { label: '30分钟', value: 30 },
  { label: '50分钟', value: 50 },
  { label: '80分钟', value: 80 },
  { label: '120分钟', value: 120 },
]

function applySkin(skinId) {
  const tokens = SKIN_TOKENS[skinId]
  if (!tokens) return
  const root = document.documentElement
  Object.entries(tokens).forEach(([key, value]) => {
    if (key.startsWith('--')) root.style.setProperty(key, value)
  })
}

export { SKIN_TOKENS }

export function AppProvider({ children }) {
  const [currentView, setCurrentView] = useState(VIEWS.CLOCK)
  const [currentSkin, setCurrentSkin] = useState(
    () => localStorage.getItem(STORAGE_KEY) || SKINS.CLASSIC_MONO
  )
  const [wakeUpTime, setWakeUpTime] = useState({ hour: 7, minute: 0 })
  const [zenMode, setZenMode] = useState(false)
  const [pomodoroDuration, setPomodoroDuration] = useState(
    () => parseInt(localStorage.getItem(POMODORO_KEY) || '25', 10)
  )

  const [playingMap, setPlayingMap] = useState({})
  const [timerMap, setTimerMap] = useState({})

  const soundsRef = useRef({})
  const timerIntervalsRef = useRef({})

  useEffect(() => { applySkin(currentSkin) }, [])

  const changeSkin = (skinId) => {
    setCurrentSkin(skinId)
    applySkin(skinId)
    localStorage.setItem(STORAGE_KEY, skinId)
  }

  const changePomodoroDuration = (minutes) => {
    setPomodoroDuration(minutes)
    localStorage.setItem(POMODORO_KEY, String(minutes))
  }

  const getOrCreateAudio = (sound) => {
    if (!soundsRef.current[sound.id]) {
      const audio = new Audio(sound.file)
      audio.loop = true
      audio.volume = 0.7
      soundsRef.current[sound.id] = { audio }
    }
    return soundsRef.current[sound.id].audio
  }

  const stopSoundById = (id) => {
    if (soundsRef.current[id]) {
      soundsRef.current[id].audio.pause()
    }
    clearInterval(timerIntervalsRef.current[id])
    setPlayingMap(prev => ({ ...prev, [id]: false }))
    setTimerMap(prev => ({ ...prev, [id]: null }))
  }

  const toggleSound = (sound) => {
    const audio = getOrCreateAudio(sound)
    if (playingMap[sound.id]) {
      stopSoundById(sound.id)
    } else {
      if (typeof window !== 'undefined') {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        if (AudioContext) {
          const ctx = new AudioContext()
          ctx.resume().then(() => ctx.close())
        }
      }
      audio.play().catch(err => console.warn('play failed:', err))
      setPlayingMap(prev => ({ ...prev, [sound.id]: true }))
    }
  }

  const setSoundTimer = (sound, minutes) => {
    clearInterval(timerIntervalsRef.current[sound.id])
    let remaining = minutes * 60
    setTimerMap(prev => ({ ...prev, [sound.id]: remaining }))
    timerIntervalsRef.current[sound.id] = setInterval(() => {
      remaining -= 1
      if (remaining <= 0) {
        stopSoundById(sound.id)
      } else {
        setTimerMap(prev => ({ ...prev, [sound.id]: remaining }))
      }
    }, 1000)
  }

  const clearSoundTimer = (sound) => {
    clearInterval(timerIntervalsRef.current[sound.id])
    setTimerMap(prev => ({ ...prev, [sound.id]: null }))
  }

  const stopAllSounds = () => {
    Object.keys(soundsRef.current).forEach(id => {
      soundsRef.current[id].audio.pause()
      clearInterval(timerIntervalsRef.current[id])
    })
    soundsRef.current = {}
    setPlayingMap({})
    setTimerMap({})
  }

  return (
    <AppContext.Provider value={{
      currentView, setCurrentView,
      currentSkin, changeSkin,
      wakeUpTime, setWakeUpTime,
      zenMode, setZenMode,
      pomodoroDuration, changePomodoroDuration,
      skinTokens: SKIN_TOKENS,
      playingMap, timerMap,
      toggleSound, setSoundTimer, clearSoundTimer, stopAllSounds,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}