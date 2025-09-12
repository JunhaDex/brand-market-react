import { useEffect, useRef } from 'react'

interface ScrollObserverProps {
  onIntersect: (entry: IntersectionObserverEntry) => void
}

export default function ScrollObserver({ onIntersect }: ScrollObserverProps) {
  const observerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!observerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect(entry)
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(observerRef.current)
    return () => {
      observer.disconnect()
    }
  }, [])
  return <div ref={observerRef}></div>
}
