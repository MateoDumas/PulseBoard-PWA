import { useEffect, useRef, useState } from 'react'
import { socketService } from '../services/socket'

export function useSocket(event, callback) {
  const callbackRef = useRef(callback)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (!socketService.socket) {
      socketService.connect()
    }

    const socket = socketService.socket

    const handleConnect = () => setIsConnected(true)
    const handleDisconnect = () => setIsConnected(false)

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)

    if (event) {
      socket.on(event, (data) => {
        callbackRef.current?.(data)
      })
    }

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      if (event) {
        socket.off(event)
      }
    }
  }, [event])

  return { isConnected, socket: socketService.socket }
}
