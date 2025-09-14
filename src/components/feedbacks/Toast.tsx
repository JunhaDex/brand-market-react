import useToastStore from '@/stores/Toast.store.ts'
import { Check } from 'lucide-react'

export default function Toast() {
  const toastStore = useToastStore()
  return (
    <div
      className={`toast-wrapper ${toastStore.isShow ? 'show' : ''}`.trim()}
    >
      <div className="toast-content">
        <span className="deco">
          <Check strokeWidth={4} size={16} />
        </span>
        <b className="inline-block flex-1 font-medium">{toastStore.message}</b>
      </div>
    </div>
  )
}
