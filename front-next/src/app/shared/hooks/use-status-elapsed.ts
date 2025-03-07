import { StatusProps } from '@/app/(private)/dtos/auctions-dto'
import { differenceInSeconds, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'

function getLocalDate(dateString: string): Date {
  return parseISO(dateString)
}

function formatTimeDifference(startTime: string, endTime: string): string {
  const now = new Date()
  const startDate = getLocalDate(startTime)
  const endDate = getLocalDate(endTime)

  if (now > endDate || now < startDate) return '00:00:00'

  const totalSeconds = differenceInSeconds(endDate, now)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function getStatus(startTime: string, endTime: string): StatusProps {
  const now = new Date()
  const startDate = getLocalDate(startTime)
  const endDate = getLocalDate(endTime)

  if (now > endDate) return 'closed'
  if (now < startDate) return 'waiting'

  return 'open'
}

function calculateStatusBarPercent(startTime: string, endTime: string): number {
  const now = new Date()
  const startDate = getLocalDate(startTime)
  const endDate = getLocalDate(endTime)

  if (now < startDate) return 100
  if (now > endDate) return 0

  const remainingTime = endDate.getTime() - now.getTime()
  const totalTime = endDate.getTime() - startDate.getTime()

  return Math.min(Math.max((remainingTime / totalTime) * 100, 0), 100)
}

export function useStatusElapsed(startTime: string, endTime: string) {
  const [diff, setDiff] = useState(() =>
    formatTimeDifference(startTime, endTime),
  )
  const [status, setStatus] = useState<StatusProps>(() =>
    getStatus(startTime, endTime),
  )
  const [statusBarPercent, setStatusBarPercent] = useState(() =>
    calculateStatusBarPercent(startTime, endTime),
  )

  useEffect(() => {
    const updateTimer = () => {
      const currentStatus = getStatus(startTime, endTime)
      setStatus(currentStatus)

      if (currentStatus === 'open') {
        setDiff(formatTimeDifference(startTime, endTime))
        setStatusBarPercent(calculateStatusBarPercent(startTime, endTime))
      } else {
        setDiff('00:00:00')
        setStatusBarPercent(0)
      }
    }

    updateTimer()
    const intervalId = setInterval(updateTimer, 1000)

    return () => clearInterval(intervalId)
  }, [startTime, endTime])

  return { diff, status, statusBarPercent }
}
