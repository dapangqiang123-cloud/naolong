// src/hooks/useSkin.js
import { useState, useEffect } from 'react'
import { skins } from '../styles/skins'

const STORAGE_KEY = 'naolong_skin'

function applySkin(skinId) {
  const skin = skins[skinId]
  if (!skin) return
  const root = document.documentElement
  Object.entries(skin).forEach(([key, value]) => {
    if (key.startsWith('--')) {
      root.style.setProperty(key, value)
    }
  })
}

export function useSkin() {
  const [currentSkin, setCurrentSkin] = useState(
    () => localStorage.getItem(STORAGE_KEY) || 'default'
  )

  // 初始化时应用皮肤
  useEffect(() => {
    applySkin(currentSkin)
  }, [])

  const changeSkin = (skinId) => {
    setCurrentSkin(skinId)
    applySkin(skinId)
    localStorage.setItem(STORAGE_KEY, skinId)
  }

  return { currentSkin, changeSkin, skins }
}