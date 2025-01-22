import { useEffect, useState } from "react";
import { Link } from "react-router";
import Searchbar from "./Searchbar.jsx";

function Games() {
    const [games, setGames] = useState([]);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const limit = 5;

    async function fetchGames(page = 1, limit = 10) {
        try {
            const response = await fetch(`http://145.24.223.187:8000/games?page=${page}&limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            setGames(data.items);
            setPagination(data.pagination || {});
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handlesearch = (term) => {
        setSearchTerm(term);
    }

    const filteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.developer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetchGames(currentPage, limit);
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= (pagination.totalPages || 1)) {
            setCurrentPage(page);
        }
    };

    const maxPageLinks = 5;
    const totalPages = pagination.totalPages || 1;
    const startPage = Math.max(1, currentPage - Math.floor(maxPageLinks / 2));
    const endPage = Math.min(totalPages, startPage + maxPageLinks - 1);
    const adjustedStartPage = Math.max(1, endPage - maxPageLinks + 1);
    const pageNumbers = Array.from(
        { length: endPage - adjustedStartPage + 1 },
        (_, i) => adjustedStartPage + i
    );

    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Games</h1>

            <Searchbar onSearch={handlesearch} />

            <div className="space-y-4">
                {filteredGames && filteredGames.length > 0 ? (
                    filteredGames.map((game) => (
                        <div
                            key={game.id}
                            className="bg-white p-4 rounded-lg shadow-md"
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
            <div>
                {pagination._links?.previous && (
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

                {pagination._links?.next && (
                    <button onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
                )}
            </div>

        </>
    );
}

export default Games;
