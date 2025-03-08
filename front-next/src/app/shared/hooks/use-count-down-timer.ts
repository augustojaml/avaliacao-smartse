import { useCallback, useEffect, useState } from 'react'

interface UseCountdownTimerProps {
  initialTime?: number
}

export const useCountdownTimer = ({
  initialTime = 10,
}: UseCountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [finished, setFinished] = useState(false)

  // Função para reiniciar o temporizador
  const restartCountdown = useCallback(() => {
    setTimeLeft(initialTime)
    setFinished(false)
  }, [initialTime])

  useEffect(() => {
    if (timeLeft <= 0) {
      setFinished(true)
      console.log('Tempo acabou!')
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer)
          setFinished(true)
          console.log('Tempo acabou!')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  return { timeLeft, finished, restartCountdown }
}
