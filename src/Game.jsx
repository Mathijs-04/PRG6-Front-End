import {useParams, useNavigate} from "react-router";
import {useEffect, useState, useContext} from "react";
import {ThemeContext} from "./ThemeContext.jsx";

function Game() {
    const {theme} = useContext(ThemeContext);
    const params = useParams();
    const id = params.id;
    const [game, setGame] = useState(null);
    const navigate = useNavigate();

    async function fetchGame() {
        try {
            const response = await fetch(`http://145.24.223.187:8000/games/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                navigate('/notfound');
                return;
            }

            const data = await response.json();
            setGame(data);
        } catch (error) {
            console.error('Error:', error);
            navigate('/notfound');
        }
    }

    async function deleteGame() {
        try {
            await fetch(`http://145.24.223.187:8000/games/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                }
            });
            navigate('/games');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchGame();
    }, []);

    function editNavigation() {
        navigate(`/games/${id}/edit`);
    }

    return (
        <div className={theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}>
            {game ? (
                <>
                    <h1 className="text-2xl font-bold mb-6">Game: {game.title}</h1>
                    <div className="space-y-6">
                        <div className={`p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
                            <h1 className="text-2xl font-bold mb-4">{game.title}</h1>
                            <p className="mb-4">{game.description}</p>
                            <p className="mb-4">Developer: {game.developer}</p>
                            <p className="mb-4">Last updated at: {new Date(game.updatedAt).toLocaleString('en-GB', {
                                hour: '2-digit',
                                minute: '2-digit',
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}</p>
                            <p>Favorite: {game.favorite.toString()}</p>
                            <div className="flex mt-4">
                                <button
                                    onClick={editNavigation}
                                    className={`px-4 py-2 rounded border mr-2 ${theme === 'dark' ? 'bg-gray-700 text-white border-white' : 'bg-white text-black border-black'}`}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={deleteGame}
                                    className={`px-4 py-2 rounded border ${theme === 'dark' ? 'bg-gray-700 text-white border-white' : 'bg-white text-black border-black'}`}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Game;
