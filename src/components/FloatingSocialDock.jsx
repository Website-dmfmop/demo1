import React, { useState, useEffect, useRef } from 'react';
import { SOCIAL_LINKS } from '../data/socialLinks';

const FloatingSocialDock = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dockRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dockRef.current && !dockRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    const anchorIcon = SOCIAL_LINKS.find(s => s.platform === 'Instagram');
    // Reverse the remaining icons so they stack visually upward in a pleasing order
    const otherIcons = SOCIAL_LINKS.filter(s => s.platform !== 'Instagram').reverse(); 

    return (
        <div 
            ref={dockRef}
            className={`fixed bottom-6 right-6 z-[60] flex flex-col items-end ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
            onMouseEnter={() => {
                if (window.matchMedia('(hover: hover)').matches) {
                    setIsOpen(true);
                }
            }}
            onMouseLeave={() => {
                if (window.matchMedia('(hover: hover)').matches) {
                    setIsOpen(false);
                }
            }}
        >
            {/* Expanded items */}
            <div 
                className={`flex flex-col items-end gap-3 transition-all duration-300 ease-out origin-bottom mb-3 ${
                    isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
            >
                {otherIcons.map((social, index) => (
                    <a
                        key={social.platform}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center gap-3 transition-all duration-300 transform ${
                            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                        } hover:scale-105 active:scale-95`}
                        style={{ transitionDelay: `${isOpen ? (index + 1) * 60 : 0}ms` }}
                        aria-label={social.platform}
                    >
                        <span className="bg-white/95 backdrop-blur text-[#00003c] text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition-all duration-300 whitespace-nowrap">
                            {social.platform}
                        </span>
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white shadow-md ${social.color} transition-all duration-300 group-hover:-rotate-12 ${social.glow}`}>
                            <span className="material-symbols-outlined text-[20px]">
                                {social.icon}
                            </span>
                        </div>
                    </a>
                ))}
            </div>

            {/* Anchor (Instagram) */}
            <a
                href={anchorIcon?.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-3 transition-all duration-300 active:scale-95 pointer-events-auto`}
                onClick={(e) => {
                    // On touch devices, first tap expands, second tap goes to link
                    if (window.matchMedia('(hover: none)').matches) {
                        if (!isOpen) {
                            e.preventDefault();
                            setIsOpen(true);
                        }
                    }
                }}
                aria-label="Instagram and more social media links"
            >
                {/* Instagram Label (appears on expand) */}
                <span className={`bg-white/95 backdrop-blur text-[#00003c] text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition-all duration-300 ease-out whitespace-nowrap ${
                    isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
                }`}>
                    {anchorIcon?.platform || 'Instagram'}
                </span>
                
                {/* Instagram Icon */}
                <div className={`relative flex items-center justify-center w-14 h-14 rounded-full text-white shadow-xl transition-all duration-300 ${
                    anchorIcon?.color || 'bg-[#E1306C]'
                } group-hover:-rotate-12 ${anchorIcon?.glow || 'group-hover:shadow-[0_0_20px_rgba(225,48,108,0.6)]'}`}>
                    <span className="material-symbols-outlined text-[28px] z-10 transition-transform">
                        {anchorIcon?.icon || 'photo_camera'}
                    </span>
                </div>
            </a>
        </div>
    );
};

export default FloatingSocialDock;
