import {useParams, useNavigate} from "react-router";
import {useEffect, useState} from "react";

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
            const data = await response.json();
            setGame(data);
        } catch (error) {
            console.error('Error:', error);
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
        <>
            <h1 className="text-2xl font-bold mb-6">Game: {game?.title}</h1>
            {game ? (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold mb-4">{game.title}</h1>
                        <p className="mb-4">{game.description}</p>
                        <p>Developer: {game.developer}</p>
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
                        </div>
                    </div>
                </div>
            ) : (
                <p>No game found</p>
            )}
        </>
    )
}

export default Game;
