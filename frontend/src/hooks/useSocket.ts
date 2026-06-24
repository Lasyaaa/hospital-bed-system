import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const useSocket = (onBedUpdated: (data: any) => void) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Create socket connection
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
    });

    socketRef.current.on('connect', () => {
      console.log('Socket connected:', socketRef.current?.id);
    });

    // Listen for bed update events from server
    socketRef.current.on('bedUpdated', (updatedBeds) => {
      onBedUpdated(updatedBeds);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    // Cleanup: disconnect when component unmounts
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return socketRef.current;
};

export default useSocket;