import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

function Game() {
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

    async function toggleFavorite() {
        try {
            const response = await fetch(`http://145.24.223.187:8000/games`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                //Update favorite boolean
            });
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    useEffect(() => {
        fetchGame();
    }, []);

    function editNavigation() {
        navigate(`/games/${id}/edit`);
    }

    return (
        <>
            {game ? (
                <>
                    <h1 className="text-2xl font-bold mb-6">Game: {game.title}</h1>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h1 className="text-2xl font-bold mb-4">{game.title}</h1>
                            <p className="mb-4">{game.description}</p>
                            <p className="mb-4">Developer: {game.developer}</p>
                            <p>Favorite: {game.favorite.toString()}</p>
                            <div className="flex mt-4">
                                <button
                                    onClick={editNavigation}
                                    className="px-4 py-2 bg-white text-black rounded border border-black mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={deleteGame}
                                    className="px-4 py-2 bg-white text-black rounded border border-black"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={toggleFavorite}
                                    className="px-4 py-2 bg-white text-black rounded border border-black"
                                >
                                    Favorite
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}

export default Game;
