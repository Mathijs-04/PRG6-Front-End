import {useContext} from 'react';
import {ThemeContext} from './ThemeContext.jsx';

function Button() {
    const {theme, toggleTheme} = useContext(ThemeContext);

    return (
        <button
            className={`p-2 rounded border ${
                theme === 'light'
                    ? 'bg-gray-800 text-white border-gray-800'
                    : 'bg-white text-black border-black'
            }`}
            onClick={toggleTheme}
        >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
    );
}

export default Button;
