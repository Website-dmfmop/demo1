import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const FloatingLangToggle = () => {
    const { language, toggleLanguage } = useLanguage();
    const [rotating, setRotating] = useState(false);

    const handleClick = () => {
        setRotating(true);
        toggleLanguage();
        // Reset rotation flag after animation completes
        setTimeout(() => setRotating(false), 600);
    };

    return (
        <>
            <style>{`
                @keyframes langFlip {
                    0%   { transform: translateY(-50%) rotateY(0deg); }
                    50%  { transform: translateY(-50%) rotateY(90deg); }
                    100% { transform: translateY(-50%) rotateY(0deg); }
                }
                .lang-flip-animate {
                    animation: langFlip 0.6s ease-in-out;
                }
            `}</style>
            <button
                onClick={handleClick}
                id="floating-language-toggle"
                className={`fixed right-0 top-1/2 z-[9999] flex flex-col items-center justify-center
                    w-11 min-h-[96px] rounded-l-2xl
                    bg-gradient-to-b from-[#00003c] to-[#000060]
                    border border-r-0 border-white/15
                    shadow-[−4px_0_24px_rgba(0,0,0,0.35)]
                    backdrop-blur-xl cursor-pointer
                    hover:w-14 hover:shadow-[−6px_0_32px_rgba(254,152,50,0.25)]
                    transition-all duration-300 group
                    ${rotating ? 'lang-flip-animate' : ''}`}
                style={{ transform: rotating ? undefined : 'translateY(-50%)' }}
                aria-label={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
                title={language === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}
            >
                {/* Active language indicator dot */}
                <span className="w-1.5 h-1.5 rounded-full bg-[#fe9832] mb-2 opacity-80 group-hover:opacity-100 transition-opacity" />

                {/* EN label */}
                <span
                    className={`text-[11px] font-bold tracking-wider transition-all duration-300 leading-none
                        ${language === 'en'
                            ? 'text-[#fe9832] scale-110'
                            : 'text-white/40 group-hover:text-white/60 scale-90'
                        }`}
                >
                    EN
                </span>

                {/* Divider line */}
                <span className="w-5 h-px bg-white/20 my-2 group-hover:bg-[#fe9832]/40 transition-colors" />

                {/* Hindi label */}
                <span
                    className={`text-[11px] font-bold tracking-wider transition-all duration-300 leading-none
                        ${language === 'hi'
                            ? 'text-[#fe9832] scale-110'
                            : 'text-white/40 group-hover:text-white/60 scale-90'
                        }`}
                >
                    हि
                </span>

                {/* Bottom indicator dot */}
                <span className="w-1.5 h-1.5 rounded-full bg-[#fe9832] mt-2 opacity-80 group-hover:opacity-100 transition-opacity" />
            </button>
        </>
    );
};

export default FloatingLangToggle;
