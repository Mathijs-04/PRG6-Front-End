import {Link} from "react-router";
import {useContext} from "react";
import {ThemeContext} from "./ThemeContext.jsx";

function Home() {
    const {theme} = useContext(ThemeContext);

    return (
        <div
            className={`min-h-screen flex flex-col items-center justify-start pt-48 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <h1 className="text-5xl font-bold mb-4">Welcome to the Game Collection</h1>
            <h2 className="text-2xl mb-8">This website features a large collection of game data. You can add your own
                games on the create page</h2>
            <Link to={`/games`}>
                <button
                    className={`px-6 py-3 rounded font-semibold ${theme === 'dark' ? 'bg-gray-700 text-white border-white hover:bg-gray-600' : 'bg-gray-200 text-black border-black hover:bg-gray-300'}`}>
                    Games
                </button>
            </Link>
        </div>
    );
}

export default Home;
