import usePrefStore from '@/stores/Pref.store.ts'
import Toast from '@/components/feedbacks/Toast.tsx'

interface MobileViewProps {
  children: React.ReactNode
}

export default function MobileView({ children }: MobileViewProps) {
  const uiMode = usePrefStore((state) => state.uiMode)
  return (
    <>
      <div className={`screen theme-${uiMode}`.trim()}>
        <div className="app-container" id="appContainer">
          {children}
        </div>
      </div>
      <Toast />
    </>
  )
}
