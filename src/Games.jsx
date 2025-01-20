import { useEffect, useState } from "react";
import { Link } from "react-router";

function Games() {
    const [games, setGames] = useState([]);

    async function fetchGames() {
        try {
            const response = await fetch('http://145.24.223.187:8000/games', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            setGames(data.items);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Games</h1>
            <div className="space-y-4">
                {games && games.length > 0 ? (
                    games.map((game) => (
                        <div
                            key={game.id}
                            className="bg-black p-4 rounded-lg shadow-md"
                        >
                            <Link to={`/games/${game.id}`} className="text-2xl font-bold">
                                {game.title}
                            </Link>
                            <p>{game.description}</p>
                            <p>Developer: {game.developer}</p>
                        </div>
                    ))
                ) : (
                    <p>No Games</p>
                )}
            </div>
        </>
    )
}

export default Games;
