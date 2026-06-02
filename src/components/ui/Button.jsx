import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
    children, 
    onClick, 
    variant = 'primary', 
    themeColor = '#000080', 
    className = '', 
    type = 'button',
    disabled = false
}) => {
    
    const baseClasses = "px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2";
    
    let variantStyles = {};
    if (variant === 'primary') {
        variantStyles = {
            backgroundColor: themeColor,
            color: '#ffffff',
            boxShadow: `0 4px 14px 0 ${themeColor}40`
        };
    } else if (variant === 'outline') {
        variantStyles = {
            backgroundColor: 'transparent',
            color: themeColor,
            border: `2px solid ${themeColor}`
        };
    } else if (variant === 'secondary') {
        variantStyles = {
            backgroundColor: `${themeColor}15`,
            color: themeColor,
        };
    }

    if (disabled) {
        variantStyles.opacity = 0.5;
        variantStyles.cursor = 'not-allowed';
    }

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            whileHover={disabled ? {} : { scale: 1.02 }}
            whileTap={disabled ? {} : { scale: 0.98 }}
            className={`${baseClasses} ${className}`}
            style={variantStyles}
        >
            {children}
        </motion.button>
    );
};

export default Button;
