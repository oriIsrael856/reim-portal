import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

const adminHoverStyle = "hover:bg-yellow-100/80 hover:ring-2 hover:ring-yellow-400 hover:rounded cursor-text transition-all duration-200";

export const EditableText = ({ value, update, section, path, placeholder = '...', tag = 'span', className }) => {
    if (!update) return React.createElement(tag, { className }, value);
    return (
        <input
            type="text"
            value={value || ''}
            placeholder={placeholder}
            onChange={(e) => update(section, path, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className={`bg-transparent border-b border-dashed border-gray-300 outline-none w-full min-w-[20px] ${adminHoverStyle} ${className}`}
        />
    );
};

export const EditableArea = ({ value, update, section, path, className }) => {
    if (!update) return <p className={`whitespace-pre-line ${className}`}>{value}</p>;
    return (
        <textarea
            value={value || ''}
            onChange={(e) => update(section, path, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className={`bg-transparent border border-dashed border-gray-300 rounded p-1 w-full min-h-[60px] resize-y ${adminHoverStyle} ${className}`}
        />
    );
};

export const EditableImage = ({ src, update, section, path, className, alt }) => {
    const handleClick = (e) => {
        if (!update) return;
        e.stopPropagation();
        const newSrc = prompt("Enter new image URL:", src);
        if (newSrc) update(section, path, newSrc);
    };
    return (
        <div className={`relative ${className} ${update ? 'cursor-pointer group hover:ring-4 hover:ring-yellow-400 rounded-xl' : ''}`} onClick={handleClick}>
            <img src={src} alt={alt} className="w-full h-full object-cover" />
            {update && <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"><ImageIcon className="text-white"/></div>}
        </div>
    );
};