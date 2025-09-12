/**
 * Timer component should be displayed top center fixed position on the screen
 * Timer should be round shape
 * use Timer.store.ts
 *
 * interface TimerStoreState {
 *   seconds: number
 *   resetTimer: () => void
 *   decrementTimer: () => void
 * }
 *
 * timer should show time format mm:ss - 1 minute countdown
 * use dayjs to format 60 seconds to mm:ss
 */
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
