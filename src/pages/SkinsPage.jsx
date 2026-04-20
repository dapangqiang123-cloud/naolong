import { useApp, VIEWS, SKINS } from '../context/AppContext'

const skinList = [
  {
    id: SKINS.CLASSIC_MONO,
    name: 'Classic Mono',
    desc: '工业哑光质感',
    bg: '#2a2a2a',
    digitColor: '#e2e2e2',
    accent: '#bdcd9a',
  },
  {
    id: SKINS.VINTAGE_LATTE,
    name: 'Vintage Latte',
    desc: '复古暖调咖啡馆',
    bg: '#ded0b6',
    digitColor: '#2c1f0e',
    accent: '#8b4513',
  },
  {
    id: SKINS.MIDNIGHT_TOKYO,
    name: 'Midnight Tokyo',
    desc: '午夜霓虹赛博感',
    bg: '#1a1a38',
    digitColor: '#e8e0ff',
    accent: '#c084fc',
  },
  {
    id: SKINS.EMBER_FORGE,
    name: 'Ember Forge',
    desc: '熔炉余烬工业橙',
    bg: '#251810',
    digitColor: '#f5e6d0',
    accent: '#f97316',
  },
  {
    id: SKINS.ARCTIC_MIST,
    name: 'Arctic Mist',
    desc: '极地冷雾北欧蓝',
    bg: '#d8e4ef',
    digitColor: '#1a2a3a',
    accent: '#2563eb',
  },
]

function MiniFlipCard({ bg, digitColor, digit, accent }) {
  return (
    <div className="relative w-20 h-28 rounded-lg flex items-center justify-center shadow-xl"
         style={{ backgroundColor: bg }}>
      <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 z-10 pointer-events-none"
           style={{ background: 'rgba(0,0,0,0.3)' }} />
      <span className="font-['Space_Grotesk'] font-bold text-5xl select-none"
            style={{ color: digitColor }}>
        {digit}
      </span>
    </div>
  )
}

export default function SkinsPage() {
  const { currentSkin, changeSkin, setCurrentView } = useApp()

  return (
    <div className="relative min-h-screen font-['Manrope']"
         style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

      <nav className="flex justify-between items-center px-6 h-16 w-full sticky top-0 z-50"
           style={{ background: 'var(--bg-primary)' }}>
        <h1 className="font-['Space_Grotesk'] font-bold tracking-tight text-xl"
            style={{ color: 'var(--text-primary)' }}>皮肤中心</h1>
        <button
          onClick={() => setCurrentView(VIEWS.CLOCK)}
          className="font-['Space_Grotesk'] font-medium transition-colors"
          style={{ color: 'var(--accent)' }}>
          完成
        </button>
      </nav>

      <main className="max-w-2xl mx-auto px-6 pt-4 pb-32">
        <header className="mb-10">
          <p className="uppercase tracking-widest text-[10px] mb-2 font-['Space_Grotesk']"
             style={{ color: 'var(--text-secondary)' }}>Gallery</p>
          <h2 className="font-['Space_Grotesk'] text-4xl font-bold tracking-tighter leading-none">NAOLONG.</h2>
        </header>

        <div className="grid grid-cols-2 gap-5 items-start">
          {skinList.map((skin, i) => {
            const isActive = currentSkin === skin.id
            return (
              <div
                key={skin.id}
                onClick={() => changeSkin(skin.id)}
                className={`cursor-pointer ${i % 2 === 1 ? 'mt-8' : ''}`}
              >
                <div
                  className="p-5 rounded-2xl flex flex-col items-center justify-center transition-all relative"
                  style={{
                    background: isActive ? 'var(--bg-card)' : 'var(--bg-secondary)',
                    boxShadow: isActive ? `0 0 0 2px var(--accent), 0 8px 32px rgba(0,0,0,0.2)` : 'none',
                  }}
                >
                  {isActive && (
                    <div className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter"
                         style={{ background: 'var(--accent)', color: 'var(--bg-primary)' }}>
                      ACTIVE
                    </div>
                  )}

                  {/* 色块预览条 */}
                  <div className="w-full h-1.5 rounded-full mb-4 overflow-hidden flex">
                    <div className="flex-1" style={{ background: skin.bg }} />
                    <div className="w-6" style={{ background: skin.accent }} />
                  </div>

                  <div className="flex gap-2">
                    <MiniFlipCard bg={skin.bg} digitColor={skin.digitColor} digit="0" accent={skin.accent} />
                    <MiniFlipCard bg={skin.bg} digitColor={skin.digitColor} digit="8" accent={skin.accent} />
                  </div>

                  <div className="mt-5 text-center w-full">
                    <h3 className="font-['Space_Grotesk'] text-sm font-bold mb-1"
                        style={{ color: 'var(--text-primary)' }}>{skin.name}</h3>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{skin.desc}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}