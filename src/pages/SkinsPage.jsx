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
  const { currentSkin, setCurrentSkin, setCurrentView } = useApp()

  return (
    <div className="relative min-h-screen bg-[#131313] text-[#e2e2e2] font-['Manrope']">

      {/* 顶部导航 */}
      <nav className="bg-[#131313] flex justify-between items-center px-6 h-16 w-full sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-[#bdcd9a] cursor-pointer">menu</span>
          <h1 className="font-['Space_Grotesk'] font-bold tracking-tight text-white text-xl">皮肤中心</h1>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrentView(VIEWS.CLOCK)}
            className="text-[#bdcd9a] font-['Space_Grotesk'] font-medium hover:text-white transition-colors">
            完成
          </button>
        </div>
      </nav>

      {/* 编辑标题 */}
      <main className="max-w-2xl mx-auto px-6 pt-8 pb-32">
        <header className="mb-12">
          <p className="text-[#c6c8ba] uppercase tracking-widest text-[10px] mb-2 font-['Space_Grotesk']">Gallery</p>
          <h2 className="font-['Space_Grotesk'] text-4xl font-bold tracking-tighter leading-none">NAOLONG.</h2>
        </header>

        {/* 皮肤网格 */}
        <div className="grid grid-cols-2 gap-6 items-start">
          {skinList.map((skin, i) => {
            const isActive = currentSkin === skin.id
            return (
              <div
                key={skin.id}
                onClick={() => setCurrentSkin(skin.id)}
                className={`group cursor-pointer ${i % 2 === 1 ? 'mt-10' : ''}`}
              >
                <div className={`
                  p-6 rounded-xl flex flex-col items-center justify-center transition-all relative overflow-hidden
                  ${skin.tall ? 'min-h-[320px]' : 'min-h-[260px]'}
                  ${isActive
                    ? 'bg-[#2a2a2a] ring-2 ring-[#bdcd9a]/60'
                    : 'bg-[#1b1b1b] hover:bg-[#2a2a2a]'}
                `}>
                  {/* Active 徽章 */}
                  {isActive && (
                    <div className="absolute top-3 right-3 bg-[#bdcd9a] text-[#222d0a] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
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
                    <h3 className="font-['Space_Grotesk'] text-base font-bold mb-1">{skin.name}</h3>
                    <p className="text-[#c6c8ba] text-xs">{skin.desc}</p>
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
