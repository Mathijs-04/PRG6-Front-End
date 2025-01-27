import {useEffect, useState} from "react";
import {Link} from "react-router";
import Searchbar from "./Searchbar.jsx";
import game from "./Game.jsx";

function Games() {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const limit = 5;

    async function fetchAllGames() {
        try {
            const response = await fetch(`http://145.24.223.187:8000/games`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            const sortedGames = data.items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setGames(sortedGames);
            setFilteredGames(sortedGames);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function toggleFavorite(id, currentFavorite) {
        try {
            await fetch(`http://145.24.223.187:8000/games/${id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"favorite": !currentFavorite}),
            });
            setGames((prevGames) =>
                prevGames.map((game) =>
                    game.id === id ? {...game, favorite: !currentFavorite} : game
                )
            );
            setFilteredGames((prevFilteredGames) =>
                prevFilteredGames.map((game) =>
                    game.id === id ? {...game, favorite: !currentFavorite} : game
                )
            );
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    const handleSearch = (term) => {
        setSearchTerm(term);
        const filtered = games.filter((game) =>
            game.title.toLowerCase().includes(term.toLowerCase()) ||
            game.developer.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredGames(filtered);
        setCurrentPage(1);
    }

    useEffect(() => {
        fetchAllGames();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedGames = filteredGames.slice((currentPage - 1) * limit, currentPage * limit);
    const totalPages = Math.ceil(filteredGames.length / limit);

    const maxPageLinks = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPageLinks / 2));
    const endPage = Math.min(totalPages, startPage + maxPageLinks - 1);
    const adjustedStartPage = Math.max(1, endPage - maxPageLinks + 1);
    const pageNumbers = Array.from(
        {length: endPage - adjustedStartPage + 1},
        (_, i) => adjustedStartPage + i
    );

    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Games</h1>

            <Searchbar onSearch={handleSearch}/>

            <button>Show favorites</button>

            <div className="space-y-4">
                {paginatedGames && paginatedGames.length > 0 ? (
                    paginatedGames.map((game) => (
                        <Link to={`/games/${game.id}`}>
                            <div
                                key={game.id}
                                className="bg-white p-4 rounded-lg shadow-md"
                            >

                                <p className="text-2xl font-bold">{game.title}</p>
                                <p>{game.description}</p>
                                <p>Developer: {game.developer}</p>
                                <p>Favorite: {game.favorite.toString()}</p>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleFavorite(game.id, game.favorite);
                                    }}
                                    className="px-4 py-2 bg-white text-black rounded border border-black ml-2"
                                >
                                    {game.favorite ? 'Unfavorite' : 'Favorite'}
                                </button>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>Loading games...</p>
                )}
            </div>
            <div>
                {currentPage > 1 && (
                    <button onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
                )}

                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={page === currentPage ? "font-bold" : ""}
                    >
                        {page}
                    </button>
                ))}

                {currentPage < totalPages && (
                    <button onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
                )}
            </div>
        </>
    );
}

export default Games;
