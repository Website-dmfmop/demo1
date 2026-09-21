import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { API_URL } from '../config/api';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem('adminToken');
        if (!token) return;

        const socketTarget = API_URL || window.location.origin;
        const newSocket = io(socketTarget, {
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
