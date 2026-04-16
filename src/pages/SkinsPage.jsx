import { useApp, VIEWS, SKINS } from '../context/AppContext'

const skinList = [
  {
    id: SKINS.CLASSIC_MONO,
    name: 'Classic Mono',
    desc: 'Industrial matte finish',
    bg: '#2a2a2a',
    digitColor: '#c6c6c6',
    accent: '#bdcd9a',
    tall: true,
  },
  {
    id: SKINS.BRUTALIST_WHITE,
    name: 'Brutalist White',
    desc: 'High contrast stark aesthetics',
    bg: '#353535',
    digitColor: '#e2e2e2',
    accent: '#e2e2e2',
    tall: false,
  },
  {
    id: SKINS.MECHANICAL_OLIVE,
    name: 'Mechanical Olive',
    desc: 'Signature brand palette',
    bg: '#2a2a2a',
    digitColor: '#bdcd9a',
    accent: '#bdcd9a',
    tall: false,
  },
  {
    id: SKINS.DEEP_VOID,
    name: 'Deep Void',
    desc: 'Ultra-dark for maximum focus',
    bg: '#131313',
    digitColor: '#c6c8ba',
    accent: '#45483e',
    tall: true,
  },
]

function MiniFlipCard({ bg, digitColor, digit }) {
  return (
    <div className="relative w-20 h-28 rounded-lg flex items-center justify-center shadow-xl"
         style={{ backgroundColor: bg }}>
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#131313] -translate-y-1/2 z-10 pointer-events-none" />
      <span className="font-['Space_Grotesk'] font-bold text-5xl select-none"
            style={{ color: digitColor }}>
        {digit}
      </span>
    </div>
  )
}

export default function SkinsPage() {
  // ✅ 改这里：setCurrentSkin → changeSkin
  const { currentSkin, changeSkin, setCurrentView } = useApp()

  return (
    <div className="relative min-h-screen font-['Manrope']"
         style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

      {/* 顶部导航 */}
      <nav className="flex justify-between items-center px-6 h-16 w-full sticky top-0 z-50"
           style={{ background: 'var(--bg-primary)' }}>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined cursor-pointer" style={{ color: 'var(--accent)' }}>menu</span>
          <h1 className="font-['Space_Grotesk'] font-bold tracking-tight text-xl"
              style={{ color: 'var(--text-primary)' }}>皮肤中心</h1>
        </div>
        <button
          onClick={() => setCurrentView(VIEWS.CLOCK)}
          className="font-['Space_Grotesk'] font-medium transition-colors"
          style={{ color: 'var(--accent)' }}>
          完成
        </button>
      </nav>

      <main className="max-w-2xl mx-auto px-6 pt-8 pb-32">
        <header className="mb-12">
          <p className="uppercase tracking-widest text-[10px] mb-2 font-['Space_Grotesk']"
             style={{ color: 'var(--text-secondary)' }}>Gallery</p>
          <h2 className="font-['Space_Grotesk'] text-4xl font-bold tracking-tighter leading-none">NAOLONG.</h2>
        </header>

        {/* 皮肤网格 */}
        <div className="grid grid-cols-2 gap-6 items-start">
          {skinList.map((skin, i) => {
            const isActive = currentSkin === skin.id
            return (
              <div
                key={skin.id}
                // ✅ 改这里：setCurrentSkin → changeSkin
                onClick={() => changeSkin(skin.id)}
                className={`group cursor-pointer ${i % 2 === 1 ? 'mt-10' : ''} overflow-visible`}
              >
                <div
                  className={`p-6 rounded-xl flex flex-col items-center justify-center transition-all relative overflow-visible ...`}
                  style={{
                    background: isActive ? 'var(--bg-card)' : 'var(--bg-secondary)',
                    boxShadow: isActive ? `0 0 0 2px var(--accent)` : 'none',
                  }}
                >
                  {/* Active 徽章 */}
                  {isActive && (
                    <div className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter"
                         style={{ background: 'var(--accent)', color: 'var(--bg-primary)' }}>
                      Active
                    </div>
                  )}

                  {/* 翻页数字预览 */}
                  <div className="flex gap-3">
                    <MiniFlipCard bg={skin.bg} digitColor={skin.digitColor} digit="0" />
                    <MiniFlipCard bg={skin.bg} digitColor={skin.digitColor} digit="8" />
                  </div>

                  {/* 名称 */}
                  <div className="mt-6 text-center">
                    <h3 className="font-['Space_Grotesk'] text-base font-bold mb-1"
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