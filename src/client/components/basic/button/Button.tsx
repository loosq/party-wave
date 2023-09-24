import React from 'react';
import style from './button.module.css';

export const Button = ({ text, className = [] }: { text: string, className?: string[] }) => {
    return (
        <button className={`${style.button} ${className.join(' ')}`}>
            {text}
        </button>  
    )
}