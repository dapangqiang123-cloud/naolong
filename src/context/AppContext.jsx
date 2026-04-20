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
  VINTAGE_LATTE: 'vintage_latte',
  EMBER_FORGE: 'ember_forge',
  SAGE_DUSK: 'sage_dusk',
  BLOOD_MOON: 'blood_moon',
  STEEL_MACHINE: 'steel_machine',
  RAIN_WINDOW: 'rain_window',
  GHOST_CITY: 'ghost_city',
  NEON_VOID: 'neon_void',
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
  ember_forge: {
    name: '熔炉余烬',
    '--bg-primary': '#0f0a06',
    '--bg-secondary': '#1a1008',
    '--bg-card': '#251810',
    '--text-primary': '#f5e6d0',
    '--text-secondary': '#a07850',
    '--accent': '#f97316',
    '--accent-soft': 'rgba(249,115,22,0.15)',
    '--border': 'rgba(249,115,22,0.15)',
  },
  sage_dusk: {
    name: '暮色青苔',
    '--bg-primary': '#1e2420',
    '--bg-secondary': '#252e28',
    '--bg-card': '#2f3b32',
    '--text-primary': '#d4ddd5',
    '--text-secondary': '#7a9b80',
    '--accent': '#8fbc8f',
    '--accent-soft': 'rgba(143,188,143,0.15)',
    '--border': 'rgba(143,188,143,0.15)',
  },
  blood_moon: {
    name: '血月',
    '--bg-primary': '#0a0404',
    '--bg-secondary': '#150808',
    '--bg-card': '#200c0c',
    '--text-primary': '#f5d0d0',
    '--text-secondary': '#a05050',
    '--accent': '#dc2626',
    '--accent-soft': 'rgba(220,38,38,0.15)',
    '--border': 'rgba(220,38,38,0.15)',
  },
  steel_machine: {
    name: '钢铁机械',
    variant: 'mechanical',
    '--bg-primary': '#141414',
    '--bg-secondary': '#1c1c1c',
    '--bg-card': '#2c2c2e',
    '--text-primary': '#f0f0f0',
    '--text-secondary': '#888888',
    '--accent': '#a8a8a8',
    '--accent-soft': 'rgba(168,168,168,0.15)',
    '--border': 'rgba(255,255,255,0.08)',
  },
  rain_window: {
    name: '雨窗',
    variant: 'minimal',
    '--bg-primary': '#f7f7f5',
    '--bg-secondary': '#efefed',
    '--bg-card': '#ffffff',
    '--text-primary': '#1a1a1a',
    '--text-secondary': '#888888',
    '--accent': '#1a1a1a',
    '--accent-soft': 'rgba(0,0,0,0.06)',
    '--border': 'rgba(0,0,0,0.10)',
  },
  ghost_city: {
    name: '幽灵城市',
    variant: 'ghost',
    '--bg-primary': '#111318',
    '--bg-secondary': '#16191f',
    '--bg-card': '#1e2128',
    '--text-primary': '#e8eaf0',
    '--text-secondary': '#60657a',
    '--accent': '#6366f1',
    '--accent-soft': 'rgba(99,102,241,0.15)',
    '--border': 'rgba(99,102,241,0.15)',
  },
  neon_void: {
    name: '霓虹空洞',
    variant: 'mechanical',
    '--bg-primary': '#030a03',
    '--bg-secondary': '#071007',
    '--bg-card': '#0d1f0d',
    '--text-primary': '#e0ffe0',
    '--text-secondary': '#3a7a3a',
    '--accent': '#00ff41',
    '--accent-soft': 'rgba(0,255,65,0.12)',
    '--border': 'rgba(0,255,65,0.20)',
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
    () => {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved && SKIN_TOKENS[saved] ? saved : SKINS.CLASSIC_MONO
    }
  )
  const [wakeUpTime, setWakeUpTime] = useState({ hour: 7, minute: 0 })
  const [zenMode, setZenMode] = useState(false)
  const currentVariant = SKIN_TOKENS[currentSkin]?.variant || 'default'
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
      currentVariant,
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