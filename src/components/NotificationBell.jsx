import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const NotificationBell = ({ currentUser }) => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isRinging, setIsRinging] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('adminToken');
        if (!token || !currentUser) return;

        const socket = io(API_URL, {
            auth: { token }
        });

        socket.on('connect', () => {
            console.log('Socket connected for notifications');
        });

        socket.on('TASK_ASSIGNED', (task) => {
            const newNotif = { id: Date.now(), text: `New Task Assigned: ${task.title}`, read: false };
            setNotifications(prev => [newNotif, ...prev]);
            triggerRing();
        });

        socket.on('STATUS_UPDATED', (task) => {
            const newNotif = { id: Date.now(), text: `Task Status Updated to ${task.status}: ${task.title}`, read: false };
            setNotifications(prev => [newNotif, ...prev]);
            triggerRing();
        });

        return () => socket.disconnect();
    }, [currentUser]);

    const triggerRing = () => {
        setIsRinging(true);
        setTimeout(() => setIsRinging(false), 1000);
    };

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="relative">
            <motion.button 
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-500 hover:text-primary transition-colors focus:outline-none"
                animate={isRinging ? { rotate: [0, -20, 20, -20, 20, 0] } : {}}
                transition={{ duration: 0.5 }}
            >
                <span className="material-symbols-outlined text-[24px]">notifications</span>
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-headline font-bold text-gray-800 text-sm">Notifications</h3>
                            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{unreadCount} New</span>
                        </div>
                        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                            {notifications.length === 0 ? (
                                <div className="p-4 text-center text-sm text-gray-400 font-medium">No new notifications</div>
                            ) : (
                                notifications.map(notif => (
                                    <div 
                                        key={notif.id}
                                        onClick={() => markAsRead(notif.id)}
                                        className={`p-3 rounded-lg cursor-pointer transition-colors ${notif.read ? 'bg-transparent text-gray-500' : 'bg-primary/5 text-gray-800 font-medium hover:bg-primary/10'}`}
                                    >
                                        <p className="text-sm">{notif.text}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationBell;
