import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSocket } from '../context/SocketContext';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const GROUPING_THRESHOLD_MS = 5 * 60 * 1000;
const DEFAULT_EMOJIS = ['👍', '❤️', '😂', '🎉', '👀', '😮'];

function getTimestampFromId(objectId) {
    if (!objectId) return 0;
    try { return new Date(parseInt(objectId.substring(0, 8), 16) * 1000).getTime(); }
    catch(e) { return 0; }
}

const EmojiQuickBar = ({ onSelect }) => (
    <div className="flex gap-2 p-2 bg-gray-50 border-t border-gray-200 overflow-x-auto scrollbar-hide">
        {DEFAULT_EMOJIS.map((emoji, i) => (
            <button key={i} onClick={() => onSelect(emoji)} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors shrink-0 text-lg">
                {emoji}
            </button>
        ))}
    </div>
);

const renderMarkdown = (text, taskReferences, onNavigateToTask) => {
    if (!text) return null;
    
    // Markdown
    let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    parsed = parsed.replace(/\*(.*?)\*/g, '<em>$1</em>');
    parsed = parsed.replace(/`(.*?)`/g, '<code class="bg-black/10 text-[0.9em] px-1 rounded font-mono">$1</code>');
    
    // Auto-link URLs
    parsed = parsed.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-200 hover:underline break-all">$1</a>');
    
    const parts = parsed.split(/(@\[.*?\]|#\[.*?\])/g);
    
    return parts.map((part, index) => {
        if (part.startsWith('@[') && part.endsWith(']')) {
            const name = part.slice(2, -1);
            return (
                <span key={index} className="px-1.5 py-0.5 mx-0.5 bg-blue-100/20 text-blue-100 rounded-full font-semibold text-xs cursor-pointer shadow-sm border border-blue-200/20">
                    <span className="material-symbols-outlined text-[12px] align-middle mr-1">person</span>
                    {name}
                </span>
            );
        } else if (part.startsWith('#[') && part.endsWith(']')) {
            const title = part.slice(2, -1);
            const taskRef = taskReferences?.find(t => t.title === title);
            if (taskRef) {
                return (
                    <div key={index} onClick={() => onNavigateToTask(taskRef._id)} className="my-2 block p-3 bg-white/10 rounded-lg border border-white/20 cursor-pointer hover:bg-white/20 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-[16px]">task</span>
                            <span className="font-bold text-sm leading-tight">{taskRef.title}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs">
                            <span className="bg-white/20 px-2 py-0.5 rounded capitalize">{taskRef.status?.replace(/_/g, ' ')}</span>
                            <span className={`px-2 py-0.5 rounded font-bold ${taskRef.priority === 'High' || taskRef.priority === 'Critical' ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'}`}>{taskRef.priority}</span>
                            {taskRef.deadline && <span className="bg-white/10 px-2 py-0.5 rounded">Due: {new Date(taskRef.deadline).toLocaleDateString()}</span>}
                        </div>
                    </div>
                );
            }
            return <span key={index} className="font-bold">{part}</span>;
        }
        return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
    });
};

const MessageItem = React.memo(({ 
    item, isMe, canDelete, canPin, isConsecutive, observer, currentUserId, prefs,
    onReply, onDelete, onEdit, onReact, onPin, onSave, isSaved, onNavigateToTask, onNavigateToReply, onRetry 
}) => {
    const [copied, setCopied] = useState(false);
    const [showReactPicker, setShowReactPicker] = useState(false);
    const msgRef = useRef(null);

    useEffect(() => {
        const node = msgRef.current;
        if (node && observer && item._status !== 'sending' && item._status !== 'failed') {
            observer.observe(node);
            return () => observer.unobserve(node);
        }
    }, [observer, item._id, item._status]);

    const handleCopy = () => {
        navigator.clipboard.writeText(item.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const groupedReactions = useMemo(() => {
        const groups = {};
        (item.reactions || []).forEach(r => {
            if (!groups[r.emoji]) groups[r.emoji] = { count: 0, users: [] };
            groups[r.emoji].count++;
            groups[r.emoji].users.push(r.user?.name || 'Someone');
        });
        return groups;
    }, [item.reactions]);

    const myReaction = (item.reactions || []).find(r => (r.user?._id || r.user) === currentUserId)?.emoji;

    return (
        <div ref={msgRef} data-msg-id={item._id} data-msg-type={item._isOptimistic ? 'optimistic' : 'real'} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-full group/main ${isConsecutive ? 'mt-1' : 'mt-4'} transition-colors duration-500 rounded-lg relative`}>
            {item.isPinned && (
                <div className={`text-[10px] text-gray-500 font-bold mb-1 flex items-center gap-1 ${isMe ? 'pr-4' : 'pl-10'}`}>
                    <span className="material-symbols-outlined text-[12px] text-orange-500">push_pin</span> Pinned Message
                </div>
            )}
            
            <div className="flex items-end gap-2 max-w-[85%] relative">
                {!isMe && (
                    <div className="w-8 h-8 shrink-0 flex items-end">
                        {!isConsecutive && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                {item.sender?.name?.charAt(0) || '?'}
                            </div>
                        )}
                    </div>
                )}
                
                <div className="flex flex-col gap-1 w-full relative">
                    {!isMe && !isConsecutive && (
                        <div className="flex items-center gap-2 pl-1">
                            <span className="text-xs font-bold text-gray-700">{item.sender?.name}</span>
                            <span className="text-[10px] text-gray-500">{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    )}
                    
                    <div className="relative group/msg flex items-center">
                        {!item._isOptimistic && !item.isDeleted && (
                            <div className={`absolute ${isMe ? 'right-full mr-2' : 'left-full ml-2'} opacity-0 group-hover/msg:opacity-100 transition-opacity flex items-center gap-1 bg-white shadow-sm border border-gray-100 rounded-lg p-1 z-10 shrink-0`}>
                                <div className="relative">
                                    <button onClick={() => setShowReactPicker(!showReactPicker)} className="p-1 text-gray-400 hover:text-orange-500 rounded flex items-center" title="React"><span className="material-symbols-outlined text-[14px]">add_reaction</span></button>
                                    {showReactPicker && (
                                        <div className="absolute bottom-full mb-2 right-0 flex bg-white shadow-xl border border-gray-200 rounded-full p-1 gap-1 z-50">
                                            {DEFAULT_EMOJIS.map(e => (
                                                <button key={e} onClick={() => { onReact(item._id, e); setShowReactPicker(false); }} className="hover:scale-125 transition-transform w-6 h-6 flex items-center justify-center text-sm">{e}</button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button onClick={() => onReply(item)} className="p-1 text-gray-400 hover:text-primary rounded flex items-center" title="Reply"><span className="material-symbols-outlined text-[14px]">reply</span></button>
                                <button onClick={() => onSave(item._id)} className={`p-1 rounded flex items-center ${isSaved ? 'text-primary' : 'text-gray-400 hover:text-primary'}`} title="Save Message"><span className="material-symbols-outlined text-[14px]">{isSaved ? 'bookmark' : 'bookmark_border'}</span></button>
                                {canPin && <button onClick={() => onPin(item._id)} className={`p-1 rounded flex items-center ${item.isPinned ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'}`} title="Pin Message"><span className="material-symbols-outlined text-[14px]">push_pin</span></button>}
                                <button onClick={handleCopy} className="p-1 text-gray-400 hover:text-green-600 rounded flex items-center" title="Copy"><span className="material-symbols-outlined text-[14px]">{copied ? 'check' : 'content_copy'}</span></button>
                                {isMe && <button onClick={() => onEdit(item)} className="p-1 text-gray-400 hover:text-blue-500 rounded flex items-center" title="Edit"><span className="material-symbols-outlined text-[14px]">edit</span></button>}
                                {canDelete && <button onClick={() => onDelete(item._id)} className="p-1 text-gray-400 hover:text-red-500 rounded flex items-center" title="Delete"><span className="material-symbols-outlined text-[14px]">delete</span></button>}
                            </div>
                        )}

                        <div className={`relative p-3 shadow-sm text-sm break-words flex flex-col gap-2 ${isMe ? 'bg-primary text-white rounded-2xl rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-none'} ${item._status === 'sending' ? 'opacity-70' : ''}`}>
                            <div className="w-full flex items-end gap-2">
                                <div className="flex-1 w-full">
                                    {item.replyTo && (
                                        <div onClick={() => onNavigateToReply(item.replyTo._id)} className={`mb-2 p-2 rounded-lg text-xs border-l-2 cursor-pointer ${isMe ? 'bg-white/10 border-white/50 text-white/90 hover:bg-white/20' : 'bg-gray-50 border-primary text-gray-600 hover:bg-gray-100'} transition-colors`}>
                                            <span className="font-bold">{item.replyTo.sender?.name}</span>
                                            <div className="truncate">{item.replyTo.content}</div>
                                        </div>
                                    )}
                                    
                                    <div className="whitespace-pre-wrap break-words leading-relaxed">
                                        {item.isDeleted ? <span className="italic opacity-60">This message was deleted.</span> : renderMarkdown(item.content, item.taskReferences, onNavigateToTask)}
                                    </div>
                                    
                                    {item.isEdited && !item.isDeleted && (
                                        <span className="text-[10px] opacity-70 mt-1 inline-block italic cursor-help" title={`Edited at ${new Date(item.editedAt || item.updatedAt).toLocaleString()}`}>(edited)</span>
                                    )}
                                </div>
                                
                                {item._status === 'failed' && (
                                    <button onClick={() => onRetry(item)} className="bg-red-500 text-white p-1 rounded-full shrink-0 shadow hover:bg-red-600" title="Failed to send. Click to retry.">
                                        <span className="material-symbols-outlined text-[14px]">refresh</span>
                                    </button>
                                )}
                                {item._status === 'sending' && (
                                    <span className="material-symbols-outlined text-[14px] text-white/70 animate-spin shrink-0">progress_activity</span>
                                )}
                            </div>

                            {Object.keys(groupedReactions).length > 0 && (
                                <div className={`flex flex-wrap gap-1 mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                                    {Object.entries(groupedReactions).map(([emoji, {count, users}]) => (
                                        <button 
                                            key={emoji}
                                            onClick={() => onReact(item._id, emoji)}
                                            title={users.join(', ')}
                                            className={`px-1.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors shadow-sm ${myReaction === emoji ? 'bg-blue-100 text-blue-800 border border-blue-200' : isMe ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'}`}
                                        >
                                            {emoji} <span>{count}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {isMe && !isConsecutive && !item._isOptimistic && (
                        <span className="text-[10px] text-gray-400 text-right w-full pr-1">{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    )}
                </div>
            </div>
        </div>
    );
});

const WorkspaceChat = ({ currentUser, navigateToTask }) => {
    const socketContext = useSocket() || {};
    const socket = socketContext.socket;
    const [isOpen, setIsOpen] = useState(false);
    
    // Core State & Views
    const [viewMode, setViewMode] = useState('latest'); 
    const [messages, setMessages] = useState([]);
    const [historicalMessages, setHistoricalMessages] = useState([]);
    const [savedMessages, setSavedMessages] = useState([]);
    const [pinnedMessages, setPinnedMessages] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [chatState, setChatState] = useState({ lastReadMessage: null, lastReadMention: null, lastReadReply: null, notificationPreferences: {}, savedMessages: [] });
    
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const [inputValue, setInputValue] = useState(() => localStorage.getItem('workspaceChatDraft') || '');
    const [replyTo, setReplyTo] = useState(null);
    const [editingMessageId, setEditingMessageId] = useState(null);
    
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [showJumpToLatest, setShowJumpToLatest] = useState(false);
    const [showPinned, setShowPinned] = useState(false);

    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const inputRef = useRef(null);
    const observerRef = useRef(null);
    const syncTimeoutRef = useRef(null);

    const prefs = chatState.notificationPreferences || {};

    const activeMessages = viewMode === 'history' ? historicalMessages : 
                           viewMode === 'saved' ? savedMessages : 
                           messages;

    const lastReadMsgTs = getTimestampFromId(chatState?.lastReadMessage);
    const unreadMessagesCount = useMemo(() => {
        return messages.filter(m => !m._isOptimistic && new Date(m.createdAt).getTime() > lastReadMsgTs && (m.sender?._id || m.sender) !== currentUser?.id).length;
    }, [messages, lastReadMsgTs, currentUser?.id]);

    const unreadMentionsCount = chatState?.unreadMentions?.length || 0;

    const fetchData = async (before = null, isHistory = false) => {
        try {
            const token = sessionStorage.getItem('adminToken');
            
            if (!before && !isHistory) {
                fetch(`${API_URL}/api/workspace-chat/state`, { headers: { 'Authorization': `Bearer ${token}` } })
                    .then(r => r.json())
                    .then(s => setChatState(prev => ({ ...prev, ...s })))
                    .catch(() => {});
            }

            let url = `${API_URL}/api/workspace-chat?limit=${isHistory ? '100' : '50'}`;
            if (before) url += `&before=${before}`;

            const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
            if (res.ok) {
                const data = await res.json();
                
                if (isHistory) {
                    setHistoricalMessages(data);
                    return data;
                }

                if (data.length < 50) setHasMore(false);
                
                if (before) {
                    const container = chatContainerRef.current;
                    const prevScrollHeight = container ? container.scrollHeight : 0;
                    setMessages(prev => [...data, ...prev]);
                    setTimeout(() => {
                        if (container) container.scrollTop += (container.scrollHeight - prevScrollHeight);
                    }, 0);
                } else {
                    setMessages(data);
                    setPinnedMessages(data.filter(m => m.isPinned));
                    setTimeout(() => {
                        if (chatState.lastReadMessage && viewMode === 'latest') {
                            const unreadDividerNode = document.querySelector('[data-unread-divider="true"]');
                            if (unreadDividerNode) {
                                unreadDividerNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                return;
                            }
                        }
                        if (prefs.autoScrollToLatest !== false) scrollToBottom(false);
                    }, 100);
                }
            }
        } catch (err) {} finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => { fetchData(); }, []); // eslint-disable-line

    const executeSearch = async (q) => {
        if (!q.trim()) { setSearchResults([]); return; }
        setIsSearching(true);
        try {
            const token = sessionStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/api/workspace-chat/search?q=${encodeURIComponent(q)}`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (res.ok) setSearchResults(await res.json());
        } catch(e) {} finally { setIsSearching(false); }
    };

    const fetchSavedMessages = async () => {
        try {
            const saved = messages.filter(m => chatState.savedMessages?.includes(m._id));
            setSavedMessages(saved);
        } catch(e) {}
    };

    const syncState = useCallback((payload) => {
        setChatState(prev => ({ ...prev, ...payload }));
        if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
        syncTimeoutRef.current = setTimeout(() => {
            const token = sessionStorage.getItem('adminToken');
            fetch(`${API_URL}/api/workspace-chat/state/sync`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).catch(() => {});
        }, 1000);
    }, []);

    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            if (!isOpen || !chatState) return;
            let maxReadMsgId = chatState.lastReadMessage;
            let maxReadMsgTs = getTimestampFromId(maxReadMsgId);
            let changed = false;
            let readMentionIds = [];

            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.getAttribute('data-msg-type') === 'real') {
                    const msgId = entry.target.getAttribute('data-msg-id');
                    const msgTs = getTimestampFromId(msgId);
                    if (msgTs > maxReadMsgTs) { maxReadMsgTs = msgTs; maxReadMsgId = msgId; changed = true; }
                    
                    if (chatState.unreadMentions?.includes(msgId)) {
                        readMentionIds.push(msgId);
                        changed = true;
                    }
                }
            });

            if (changed) {
                const payload = {};
                if (maxReadMsgId !== chatState.lastReadMessage) payload.lastReadMessage = maxReadMsgId;
                if (readMentionIds.length > 0) {
                    payload.readMentionIds = readMentionIds;
                    // Optimistically clear locally
                    setChatState(prev => ({ ...prev, unreadMentions: prev.unreadMentions.filter(m => !readMentionIds.includes(m)) }));
                }
                if (Object.keys(payload).length > 0) syncState(payload);
            }
        }, { threshold: 0.5 });
        return () => observerRef.current?.disconnect();
    }, [isOpen, viewMode, messages, chatState, currentUser?.id, syncState]);

    useEffect(() => {
        if (!socket) return;
        const handleMsgUpdate = (msg) => {
            setMessages(prev => {
                const existing = prev.find(m => m._id === msg._id);
                return existing ? prev.map(m => m._id === msg._id ? msg : m) : [...prev, msg];
            });
            setPinnedMessages(prev => {
                const exists = prev.find(m => m._id === msg._id);
                if (msg.isPinned && !exists) return [...prev, msg];
                if (!msg.isPinned && exists) return prev.filter(m => m._id !== msg._id);
                return exists ? prev.map(m => m._id === msg._id ? msg : m) : prev;
            });
            
            // Sync unread mentions
            const mentionsMe = msg.mentions?.some(u => (u._id || u) === currentUser?.id);
            if (msg.isEdited && !mentionsMe) {
                setChatState(prev => prev.unreadMentions?.includes(msg._id) ? { ...prev, unreadMentions: prev.unreadMentions.filter(id => id !== msg._id) } : prev);
            } else if (!msg.isEdited && mentionsMe && (msg.sender?._id || msg.sender) !== currentUser?.id) {
                // Ignore if it's already in unreadMentions or we are viewing it
                setChatState(prev => prev.unreadMentions?.includes(msg._id) ? prev : { ...prev, unreadMentions: [...(prev.unreadMentions || []), msg._id] });
            }

            if (isOpen && viewMode === 'latest') {
                const container = chatContainerRef.current;
                if (container && container.scrollHeight - container.scrollTop <= container.clientHeight + 150) {
                    setTimeout(() => scrollToBottom(true), 50);
                } else { setShowJumpToLatest(true); }
            }
        };

        const handleDelete = ({ id }) => {
            setMessages(prev => prev.map(m => m._id === id ? { ...m, isDeleted: true, content: 'This message was deleted.' } : m));
            setChatState(prev => prev.unreadMentions?.includes(id) ? { ...prev, unreadMentions: prev.unreadMentions.filter(mId => mId !== id) } : prev);
        };

        socket.on('workspace:message', handleMsgUpdate);
        socket.on('workspace:mention', handleMsgUpdate);
        socket.on('workspace:reply', handleMsgUpdate);
        socket.on('workspace:edit', handleMsgUpdate);
        socket.on('workspace:delete', handleDelete);
        socket.on('connect', () => fetchData());

        const handleNavigateEvent = async (e) => {
            setIsOpen(true);
            const msgId = e.detail;
            const inBuffer = messages.find(m => m._id === msgId);
            if (inBuffer) {
                setViewMode('latest');
                setTimeout(() => handleNavigateToReply(msgId), 300);
            } else {
                const ts = getTimestampFromId(msgId);
                const beforeDate = new Date(ts + 5000).toISOString();
                setViewMode('history');
                const data = await fetchData(beforeDate, true);
                if (data && data.length > 0) setTimeout(() => handleNavigateToReply(msgId), 300);
            }
        };
        window.addEventListener('WORKSPACE_NAVIGATE_CHAT', handleNavigateEvent);

        return () => {
            socket.off('workspace:message'); socket.off('workspace:mention'); socket.off('workspace:reply'); socket.off('workspace:edit'); socket.off('workspace:delete'); socket.off('connect');
            window.removeEventListener('WORKSPACE_NAVIGATE_CHAT', handleNavigateEvent);
        };
    }, [socket, isOpen, viewMode, currentUser, messages]);

    const scrollToBottom = (smooth = true) => {
        messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
        setShowJumpToLatest(false);
    };

    const handleNavigateToReply = useCallback((replyId) => {
        const node = document.querySelector(`[data-msg-id="${replyId}"]`);
        if (node) {
            node.scrollIntoView({ behavior: 'smooth', block: 'center' });
            node.classList.remove('animate-pulse-highlight');
            void node.offsetWidth;
            node.classList.add('animate-pulse-highlight');
        }
    }, []);

    const handleScroll = () => {
        const container = chatContainerRef.current;
        if (!container || viewMode !== 'latest') return;
        if (container.scrollTop === 0 && hasMore && !loadingMore && messages.length > 0) {
            setLoadingMore(true);
            fetchData(messages[0].createdAt);
        }
        if (container.scrollHeight - container.scrollTop <= container.clientHeight + 100) setShowJumpToLatest(false);
    };

    const sendMessage = async () => {
        if (!inputValue.trim()) return;
        const payload = { content: inputValue, replyTo: replyTo?._id };
        const tempId = `temp_${Date.now()}`;
        if (!editingMessageId) {
            setMessages(prev => [...prev, { _id: tempId, sender: currentUser, content: inputValue, createdAt: new Date().toISOString(), replyTo, _isOptimistic: true, _status: 'sending' }]);
            if (prefs.autoScrollToLatest !== false) setTimeout(() => scrollToBottom(true), 10);
        }
        
        setInputValue('');
        localStorage.removeItem('workspaceChatDraft');
        setReplyTo(null);
        setEditingMessageId(null);

        try {
            const token = sessionStorage.getItem('adminToken');
            const res = await fetch(editingMessageId ? `${API_URL}/api/workspace-chat/${editingMessageId}` : `${API_URL}/api/workspace-chat`, {
                method: editingMessageId ? 'PUT' : 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const savedMsg = await res.json();
                if (!editingMessageId) setMessages(prev => prev.map(m => m._id === tempId ? savedMsg : m));
            }
        } catch (err) {
            if (!editingMessageId) setMessages(prev => prev.map(m => m._id === tempId ? { ...m, _status: 'failed' } : m));
        }
    };

    const handleAction = async (type, id, payload = {}) => {
        try {
            const token = sessionStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/api/workspace-chat/${type === 'save' ? 'state/save' : `${id}/${type}`}`, {
                method: type === 'delete' ? 'DELETE' : type === 'save' ? 'POST' : 'PUT',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(type === 'save' ? { messageId: id } : payload)
            });
            if (res.ok && type === 'save') {
                const s = await res.json();
                setChatState(prev => ({ ...prev, savedMessages: s.savedMessages }));
            }
        } catch (e) {}
    };

    const groupedMessages = [];
    let lastDateStr = null, lastSenderId = null, lastTime = null, unreadDividerInjected = false;
    
    activeMessages.forEach(m => {
        const dateStr = new Date(m.createdAt).toLocaleDateString();
        if (viewMode === 'latest' && !unreadDividerInjected && chatState.lastReadMessage && !m._isOptimistic && (m.sender?._id || m.sender) !== currentUser?.id && new Date(m.createdAt).getTime() > lastReadMsgTs) {
            groupedMessages.push({ type: 'unread-divider', _id: 'unread-divider' });
            unreadDividerInjected = true; lastDateStr = null; lastSenderId = null;
        }
        if (dateStr !== lastDateStr) { groupedMessages.push({ type: 'separator', dateStr, _id: `sep-${m._id}` }); lastDateStr = dateStr; lastSenderId = null; }
        const senderId = m.sender?._id || m.sender;
        const currentTime = new Date(m.createdAt).getTime();
        const isConsecutive = lastSenderId === senderId && lastTime && (currentTime - lastTime < GROUPING_THRESHOLD_MS);
        groupedMessages.push({ type: 'message', isConsecutive, ...m });
        lastSenderId = senderId; lastTime = currentTime;
    });

    return (
        <div className="fixed bottom-0 right-0 z-50 md:bottom-6 md:right-6 md:font-sans w-full md:w-auto" role="log" aria-label="Workspace Chat">
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.95 }} className="absolute bottom-0 right-0 md:bottom-16 w-full h-[100dvh] md:h-[75vh] md:w-[450px] md:max-h-[750px] bg-white md:rounded-2xl shadow-2xl md:border border-gray-200 overflow-hidden flex flex-col">
                        
                        <div className="bg-primary text-white p-3 flex justify-between items-center shrink-0 shadow-sm z-20 pt-safe">
                            <h3 className="font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-[20px]">forum</span>
                                Workspace Chat
                            </h3>
                            <div className="flex items-center gap-1">
                                <button onClick={() => setViewMode(v => v === 'search' ? 'latest' : 'search')} className="text-white/80 hover:bg-white/20 p-1.5 rounded transition"><span className="material-symbols-outlined text-[18px]">search</span></button>
                                <button onClick={() => { setViewMode('saved'); fetchSavedMessages(); }} className="text-white/80 hover:bg-white/20 p-1.5 rounded transition"><span className="material-symbols-outlined text-[18px]">bookmark</span></button>
                                <button onClick={() => setViewMode(v => v === 'preferences' ? 'latest' : 'preferences')} className="text-white/80 hover:bg-white/20 p-1.5 rounded transition"><span className="material-symbols-outlined text-[18px]">settings</span></button>
                                <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 p-1.5 rounded transition ml-1"><span className="material-symbols-outlined text-[20px]">close</span></button>
                            </div>
                        </div>

                        {viewMode === 'search' && (
                            <div className="bg-gray-50 p-3 border-b border-gray-200">
                                <input autoFocus type="text" placeholder="Search messages, users, tasks..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); executeSearch(e.target.value); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20" />
                            </div>
                        )}
                        {viewMode === 'history' && (
                            <div className="bg-orange-50 border-b border-orange-100 p-2 flex justify-between items-center text-sm font-bold text-orange-800">
                                Viewing Historical Context
                                <button onClick={() => { setViewMode('latest'); setTimeout(() => scrollToBottom(), 100); }} className="bg-orange-600 text-white px-3 py-1 rounded-full shadow-sm hover:bg-orange-700">Back to Latest</button>
                            </div>
                        )}
                        {viewMode === 'latest' && pinnedMessages.length > 0 && (
                            <div className="bg-amber-50 border-b border-amber-100">
                                <button onClick={() => setShowPinned(!showPinned)} className="w-full flex justify-between items-center p-2 text-xs font-bold text-amber-800">
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">push_pin</span> {pinnedMessages.length} Pinned Messages</span>
                                    <span className="material-symbols-outlined text-[16px]">{showPinned ? 'expand_less' : 'expand_more'}</span>
                                </button>
                                {showPinned && (
                                    <div className="px-3 pb-2 max-h-32 overflow-y-auto">
                                        {pinnedMessages.map(pm => (
                                            <div key={pm._id} onClick={() => handleNavigateToReply(pm._id)} className="text-xs bg-white border border-amber-100 rounded p-2 mb-1 cursor-pointer hover:bg-amber-100 transition truncate">
                                                <span className="font-bold">{pm.sender?.name}:</span> {pm.content}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {viewMode === 'search' ? (
                            <div className="flex-1 overflow-y-auto bg-white p-2">
                                {isSearching ? <div className="p-4 text-center text-gray-500">Searching...</div> : 
                                 searchResults.length > 0 ? searchResults.map(res => (
                                    <div key={res._id} onClick={() => {
                                        window.dispatchEvent(new CustomEvent('WORKSPACE_NAVIGATE_CHAT', { detail: res._id }));
                                    }} className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition">
                                        <div className="flex justify-between items-start mb-1 text-xs text-gray-500"><span className="font-bold text-gray-700">{res.sender?.name}</span><span>{new Date(res.createdAt).toLocaleDateString()}</span></div>
                                        {res.replyTo && (
                                            <div className="mb-1 text-[10px] text-gray-500 bg-gray-100 p-1 rounded border-l-2 border-primary truncate">
                                                <span className="font-bold">{res.replyTo.sender?.name}:</span> {res.replyTo.content}
                                            </div>
                                        )}
                                        <div className="text-sm line-clamp-2 text-gray-800">{res.content}</div>
                                    </div>
                                )) : searchQuery ? <div className="p-8 text-center text-gray-400">
                                    <div className="mb-2"><span className="material-symbols-outlined text-[48px] text-gray-200">search_off</span></div>
                                    No results found
                                </div> : <div className="p-8 text-center text-gray-400">Type to search messages...</div>}
                            </div>
                        ) : viewMode === 'preferences' ? (
                            <div className="flex-1 overflow-y-auto bg-gray-50 p-6 space-y-4">
                                <h4 className="font-bold text-gray-800 mb-4">Chat Preferences</h4>
                                {[
                                    { id: 'enterToSend', label: 'Press Enter to Send' },
                                    { id: 'autoScrollToLatest', label: 'Auto-scroll to Latest Message' },
                                    { id: 'playMentionSound', label: 'Play Sound on Mention' },
                                    { id: 'showPreviews', label: 'Show Rich Task Previews' },
                                    { id: 'compactLayout', label: 'Compact Message Layout' }
                                ].map(p => (
                                    <label key={p.id} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition">
                                        <span className="text-sm font-medium text-gray-700">{p.label}</span>
                                        <input type="checkbox" checked={prefs[p.id] !== false} onChange={(e) => syncState({ notificationPreferences: { [p.id]: e.target.checked } })} className="w-4 h-4 text-primary rounded" />
                                    </label>
                                ))}
                                <button onClick={() => setViewMode('latest')} className="w-full py-2 bg-primary text-white rounded-lg font-bold shadow hover:bg-primary-hover mt-4">Done</button>
                            </div>
                        ) : (
                            <div className={`flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col relative ${prefs.compactLayout ? 'gap-0' : ''}`} ref={chatContainerRef} onScroll={handleScroll}>
                                {loadingMore && <div className="text-center p-2 text-xs text-gray-400 animate-pulse">Loading older messages...</div>}
                                {groupedMessages.map((item) => {
                                    if (item.type === 'unread-divider') return <div key={item._id} data-unread-divider="true" className="flex justify-center my-4 relative"><div className="absolute w-full h-px bg-red-200"></div><span className="bg-red-50 text-red-600 text-xs font-bold px-4 py-1 rounded-full border border-red-200 relative z-10">Unread</span></div>;
                                    if (item.type === 'separator') return <div key={item._id} className="flex justify-center my-3"><span className="bg-white border border-gray-200 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full">{item.dateStr === new Date().toLocaleDateString() ? 'Today' : item.dateStr}</span></div>;
                                    
                                    const isMe = (item.sender?._id || item.sender) === (currentUser?._id || currentUser?.id);
                                    const canAct = isMe || ['SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'].includes(currentUser?.role);
                                    return <MessageItem key={item._id} item={item} isMe={isMe} canDelete={canAct} canPin={['SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'].includes(currentUser?.role)} isConsecutive={item.isConsecutive && prefs.compactLayout !== false} observer={observerRef.current} currentUserId={currentUser?.id} prefs={prefs} onReply={(m) => { setReplyTo(m); inputRef.current?.focus(); }} onDelete={(id) => handleAction('delete', id)} onEdit={(m) => { setEditingMessageId(m._id); setInputValue(m.content); inputRef.current?.focus(); }} onReact={(id, emoji) => handleAction('react', id, { emoji })} onPin={(id) => handleAction('pin', id)} onSave={(id) => handleAction('save', id)} isSaved={chatState.savedMessages?.includes(item._id)} onNavigateToTask={navigateToTask} onNavigateToReply={handleNavigateToReply} onRetry={() => {}} />;
                                })}
                                {viewMode === 'saved' && savedMessages.length === 0 && <div className="m-auto text-gray-400 text-sm italic p-8 text-center">
                                    <div className="mb-2"><span className="material-symbols-outlined text-[48px] text-gray-200">bookmark_border</span></div>    
                                    No saved messages. Bookmark a message to see it here.
                                </div>}
                                <div ref={messagesEndRef} />
                            </div>
                        )}

                        {showJumpToLatest && viewMode === 'latest' && (
                            <button onClick={() => scrollToBottom(true)} className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full shadow-lg text-xs font-bold flex items-center gap-1 hover:bg-blue-700 z-20"><span className="material-symbols-outlined text-[14px]">arrow_downward</span> Latest</button>
                        )}

                        {(viewMode === 'latest' || viewMode === 'history') && (
                            <div className="bg-white border-t border-gray-200 shrink-0 relative z-20 pb-safe">
                                <EmojiQuickBar onSelect={(e) => setInputValue(v => v + e)} />
                                <div className="p-3 pt-2">
                                    {replyTo && (
                                        <div className="mb-2 bg-gray-50 p-2 rounded-lg text-xs border-l-2 border-primary flex justify-between shadow-sm">
                                            <div><span className="font-bold text-gray-700">Replying to {replyTo.sender?.name}</span><div className="text-gray-500 truncate max-w-[250px]">{replyTo.content}</div></div>
                                            <button onClick={() => setReplyTo(null)} className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined text-[14px]">close</span></button>
                                        </div>
                                    )}
                                    {editingMessageId && (
                                        <div className="mb-2 bg-blue-50 p-2 rounded-lg text-xs border-l-2 border-blue-500 flex justify-between shadow-sm">
                                            <span className="font-bold text-blue-700">Editing Message</span>
                                            <button onClick={() => { setEditingMessageId(null); setInputValue(''); }} className="text-blue-400 hover:text-blue-700"><span className="material-symbols-outlined text-[14px]">close</span></button>
                                        </div>
                                    )}
                                    <div className="flex items-end gap-2">
                                        <textarea ref={inputRef} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && (prefs.enterToSend !== false && !e.shiftKey)) { e.preventDefault(); sendMessage(); } }} placeholder="Type a message..." className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:border-primary resize-none shadow-inner" rows={1} style={{ minHeight: '40px', maxHeight: '120px' }} />
                                        <button onClick={sendMessage} disabled={!inputValue.trim()} className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary-hover disabled:opacity-50 transition shadow-sm"><span className="material-symbols-outlined text-[18px]">{editingMessageId ? 'check' : 'send'}</span></button>
                                    </div>
                                    <div className="text-[10px] text-gray-400 mt-1 flex justify-between px-1">
                                        <span>Markdown: **bold**, *italic*, `code`</span>
                                        <span>Use @user and #task</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {!isOpen && (
                <button onClick={() => { setIsOpen(true); if (prefs.autoScrollToLatest !== false) setTimeout(() => scrollToBottom(false), 100); }} className="w-14 h-14 mb-6 mr-6 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center bg-primary text-white hover:bg-primary-hover hover:scale-105 transition-all relative z-50">
                    <span className="material-symbols-outlined text-[28px]">chat</span>
                    {unreadMentionsCount > 0 && <span className="absolute -top-2 -left-2 bg-blue-600 text-white text-[10px] font-bold h-6 px-2 flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-pulse">@ {unreadMentionsCount}</span>}
                    {unreadMessagesCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-bold min-w-[24px] h-6 px-1.5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">{unreadMessagesCount}</span>}
                </button>
            )}
        </div>
    );
};

export default WorkspaceChat;
