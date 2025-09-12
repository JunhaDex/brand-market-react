import usePrefStore from '@/stores/Pref.store.ts'

interface MobileViewProps {
  children: React.ReactNode
}

export default function MobileView({ children }: MobileViewProps) {
  const uiMode = usePrefStore((state) => state.uiMode)
  return (
    <div className={`screen theme-${uiMode}`.trim()}>
      <div className="app-container">{children}</div>
    </div>
  )
}
