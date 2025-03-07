/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from 'react'
import io, { Socket } from 'socket.io-client'

interface UseSocketOptions {
  options?: any
}

interface SocketEventHandlers {
  [event: string]: (...args: any[]) => void
}

export const useWebSocket = ({ options = {} }: UseSocketOptions) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<any>(null)
  const [error, setError] = useState<Error | null>(null)

  const eventHandlersRef = useRef<SocketEventHandlers>({})

  // Conectar ao socket
  useEffect(() => {
    // Criar conexão de socket
    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      ...options,
    })

    // Handlers de conexão
    const onConnect = () => {
      setIsConnected(true)
      setError(null)
    }

    const onDisconnect = () => {
      setIsConnected(false)
    }

    const onConnectError = (err: Error) => {
      setError(err)
      setIsConnected(false)
    }

    // Adicionar listeners
    socketInstance.on('connect', onConnect)
    socketInstance.on('disconnect', onDisconnect)
    socketInstance.on('connect_error', onConnectError)

    // Definir socket
    setSocket(socketInstance)

    // Limpar na desmontagem
    return () => {
      socketInstance.off('connect', onConnect)
      socketInstance.off('disconnect', onDisconnect)
      socketInstance.off('connect_error', onConnectError)
      socketInstance.disconnect()
    }
  }, [process.env.NEXT_PUBLIC_API_URL, JSON.stringify(options)])

  // Método para enviar mensagens
  const sendMessage = useCallback(
    (event: string, data: any) => {
      if (socket && isConnected) {
        socket.emit(event, data)
      }
    },
    [socket, isConnected],
  )

  // Método para adicionar listeners personalizados
  const on = useCallback(
    (event: string, handler: (...args: any[]) => void) => {
      if (!socket) return

      // Remover listener antigo se existir
      if (eventHandlersRef.current[event]) {
        socket.off(event, eventHandlersRef.current[event])
      }

      // Adicionar novo listener
      socket.on(event, (...args) => {
        handler(...args)
        setLastMessage({ event, args })
      })

      // Salvar referência do handler
      eventHandlersRef.current[event] = handler
    },
    [socket],
  )

  // Método para remover listeners
  const off = useCallback(
    (event: string) => {
      if (socket && eventHandlersRef.current[event]) {
        socket.off(event, eventHandlersRef.current[event])
        delete eventHandlersRef.current[event]
      }
    },
    [socket],
  )

  return {
    socket,
    isConnected,
    sendMessage,
    on,
    off,
    lastMessage,
    error,
  }
}

// Exemplo de componente usando o hook
