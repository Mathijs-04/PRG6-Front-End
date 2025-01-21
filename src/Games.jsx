import { useEffect, useState } from "react";
import { Link } from "react-router";

function Games() {
    const [games, setGames] = useState([]);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
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
            setPagination(data.pagination);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchGames(currentPage, limit);
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Games</h1>
            <div className="space-y-4">
                {games && games.length > 0 ? (
                    games.map((game) => (
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
                {pagination._links.previous && (
                    <button onClick={() => handlePageChange(currentPage - 1)}>
                        &lt;
                    </button>
                )}

                {pagination._links.next && (
                    <button onClick={() => handlePageChange(currentPage + 1)}>
                        &gt;
                    </button>
                )}
            </div>

            {/*<div className="flex justify-center mt-6 space-x-2">*/}
            {/*    {pagination._links?.previous && (*/}
            {/*        <button*/}
            {/*            className="px-4 py-2 bg-gray-300 rounded"*/}
            {/*            onClick={() => handlePageChange(currentPage - 1)}*/}
            {/*        >*/}
            {/*            Previous*/}
            {/*        </button>*/}
            {/*    )}*/}
            {/*    {[...Array(pagination.totalPages).keys()].map((page) => (*/}
            {/*        <button*/}
            {/*            key={page}*/}
            {/*            className={`px-4 py-2 rounded ${currentPage === page + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}*/}
            {/*            onClick={() => handlePageChange(page + 1)}*/}
            {/*        >*/}
            {/*            {page + 1}*/}
            {/*        </button>*/}
            {/*    ))}*/}
            {/*    {pagination._links?.next && (*/}
            {/*        <button*/}
            {/*            className="px-4 py-2 bg-gray-300 rounded"*/}
            {/*            onClick={() => handlePageChange(currentPage + 1)}*/}
            {/*        >*/}
            {/*            Next*/}
            {/*        </button>*/}
            {/*    )}*/}
            {/*</div>*/}
        </>
    );
}

export default Games;
