import { useEffect, useRef, useState } from 'react'

export const useInactiveBidCountdown = (initialDuration = 5) => {
  const [countdown, setCountdown] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startCountdown = (duration = initialDuration) => {
    setCountdown(duration)

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current as NodeJS.Timeout)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return { countdown, startCountdown }
}
