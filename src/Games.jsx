import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import Searchbar from "./Searchbar.jsx";
import { ThemeContext } from "./ThemeContext.jsx";

function Games() {
    const { theme } = useContext(ThemeContext);
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFavorites, setShowFavorites] = useState(false);
    const limit = 10;

    async function fetchAllGames() {
        try {
            const response = await fetch(`http://145.24.223.187:8000/games`, {
                method: "GET",
                headers: { Accept: "application/json" },
            });
            const data = await response.json();
            const sortedGames = data.items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setGames(sortedGames);
            setFilteredGames(sortedGames);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleSearch = (term) => {
        const filtered = games.filter((game) =>
            game.title.toLowerCase().includes(term.toLowerCase()) ||
            game.developer.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredGames(filtered);
        setCurrentPage(1);
    };

    const toggleShowFavorites = () => {
        setShowFavorites(!showFavorites);
    };

    useEffect(() => {
        fetchAllGames();
    }, []);

    useEffect(() => {
        if (showFavorites) {
            setFilteredGames(games.filter((game) => game.favorite));
        } else {
            setFilteredGames(games);
        }
    }, [showFavorites, games]);

    const handlePageChange = (page) => setCurrentPage(page);

    const paginatedGames = filteredGames.slice((currentPage - 1) * limit, currentPage * limit);
    const totalPages = Math.ceil(filteredGames.length / limit);

    const maxPageLinks = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPageLinks / 2));
    const endPage = Math.min(totalPages, startPage + maxPageLinks - 1);
    const adjustedStartPage = Math.max(1, endPage - maxPageLinks + 1);
    const pageNumbers = Array.from({ length: endPage - adjustedStartPage + 1 }, (_, i) => adjustedStartPage + i);

    return (
        <div className={theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}>
            <h1 className="text-2xl font-bold text-center mb-6">Games</h1>

            {/* Search bar and favorite button in the same row */}
            <div className="flex justify-center items-center space-x-4 mb-6">
                <Searchbar onSearch={handleSearch} />
                <button
                    onClick={toggleShowFavorites}
                    className={`px-4 py-2 font-semibold rounded border ${
                        theme === "dark" ? "bg-gray-700 text-white border-white" : "bg-white text-black border-black"
                    }`}
                >
                    {showFavorites ? "Show All" : "Show Favorites"}
                </button>
            </div>

            {/* Game list in two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {paginatedGames.length > 0 ? (
                    paginatedGames.map((game) => (
                        <Link to={`/games/${game.id}`} key={game.id}>
                            <div
                                className={`p-4 rounded-lg shadow-md ${
                                    theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"
                                }`}
                            >
                                <p className="text-2xl font-bold">{game.title}</p>
                                <p>{game.description}</p>
                                <p>Developer: {game.developer}</p>
                                <p>Favorite: {game.favorite.toString()}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>Loading games...</p>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2">
                <button
                    onClick={() => handlePageChange(1)}
                    className={`px-3 py-2 rounded ${
                        theme === "dark" ? "bg-gray-700 text-white border-white" : "bg-white text-black border-black"
                    }`}
                >
                    First
                </button>

                {currentPage > 1 && (
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`px-3 py-2 rounded ${
                            theme === "dark" ? "bg-gray-700 text-white border-white" : "bg-white text-black border-black"
                        }`}
                    >
                        &lt;
                    </button>
                )}

                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded ${
                            page === currentPage
                                ? theme === "dark"
                                    ? "bg-blue-500 text-white"
                                    : "bg-blue-300 text-black"
                                : theme === "dark"
                                    ? "bg-gray-700 text-white border-white"
                                    : "bg-white text-black border-black"
                        }`}
                    >
                        {page}
                    </button>
                ))}

                {currentPage < totalPages && (
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`px-3 py-2 rounded ${
                            theme === "dark" ? "bg-gray-700 text-white border-white" : "bg-white text-black border-black"
                        }`}
                    >
                        &gt;
                    </button>
                )}

                <button
                    onClick={() => handlePageChange(totalPages)}
                    className={`px-3 py-2 rounded ${
                        theme === "dark" ? "bg-gray-700 text-white border-white" : "bg-white text-black border-black"
                    }`}
                >
                    Last
                </button>
            </div>
        </div>
    );
}

export default Games;
