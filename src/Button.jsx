import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext.jsx';

function Button() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            className="p-2 bg-gray-800 text-white rounded"
            onClick={toggleTheme}
        >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
    );
}

export default Button;
