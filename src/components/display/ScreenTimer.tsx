import useTimerStore from '@/stores/Timer.store.ts'
import { useEffect, useMemo } from 'react'
import dayjs from 'dayjs'

interface ScreenTimerProps {
  isTick?: boolean
  onTimeOver: () => void
}

export default function ScreenTimer({ isTick, onTimeOver }: ScreenTimerProps) {
  const timerStore = useTimerStore()
  const timeStr = useMemo(() => {
    return dayjs().startOf('day').second(timerStore.seconds).format('mm:ss')
  }, [timerStore.seconds])
  useEffect(() => {
    if (timerStore.seconds === 0) {
      onTimeOver()
    }
  }, [timerStore.seconds])
  useEffect(() => {
    const interval = setInterval(() => {
      if (isTick && timerStore.seconds > 0) {
        timerStore.decrementTimer()
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [isTick, timerStore.seconds])
  return (
    <div className={`screen-timer ${isTick && 'show'}`.trim()}>
      <div className="timer-circle badge">{timeStr}</div>
    </div>
  )
}
