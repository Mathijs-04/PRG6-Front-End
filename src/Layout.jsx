import { Link, Outlet, useLocation } from "react-router";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext.jsx";
import Button from "./Button";

function Layout() {
    const { theme } = useContext(ThemeContext);
    const location = useLocation(); // Get the current location

    return (
        <div
            className={`min-h-screen relative ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
        >
            {/* Top-right toggle button */}
            <div className="absolute top-4 right-4">
                <Button />
            </div>

            <header className="p-4 flex justify-center items-center">
                <h1 className="text-5xl font-bold">Game App</h1>
            </header>

            {/* Navigation bar */}
            <nav className="p-4 flex justify-between">
                <Link
                    to="/"
                    className={`py-2 px-4 rounded text-center basis-[30%] ${
                        location.pathname === "/"
                            ? theme === "dark"
                                ? "bg-blue-500 text-white"
                                : "bg-blue-300 text-black"
                            : ""
                    }`}
                >
                    Home
                </Link>
                <Link
                    to="/games"
                    className={`py-2 px-4 rounded text-center basis-[30%] ${
                        location.pathname === "/games"
                            ? theme === "dark"
                                ? "bg-blue-500 text-white"
                                : "bg-blue-300 text-black"
                            : ""
                    }`}
                >
                    Games
                </Link>
                <Link
                    to="/games/create"
                    className={`py-2 px-4 rounded text-center basis-[30%] ${
                        location.pathname === "/games/create"
                            ? theme === "dark"
                                ? "bg-blue-500 text-white"
                                : "bg-blue-300 text-black"
                            : ""
                    }`}
                >
                    Create
                </Link>
            </nav>

            <main className="p-4">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
