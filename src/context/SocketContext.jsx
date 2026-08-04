import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem('adminToken');
        if (!token) return;

        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const newSocket = io(API_URL, {
            auth: { token }
        });

        newSocket.on('connect', () => {
            console.log('Workspace Socket connected');
        });

        newSocket.on('workspace:presence', (users) => {
            setOnlineUsers(users);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
