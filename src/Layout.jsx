import {Link, Outlet} from "react-router";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext.jsx";
import Button from './Button';

function Layout() {
    const { theme } = useContext(ThemeContext);
    return (
        <div
            className={theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}>
            <header className="p-4 flex justify-center items-center">
                <h1 className="text-5xl font-bold">Game App</h1>
            </header>
            <nav className="p-4 flex justify-between">
                <Link to={"/"} className="py-2 px-4 rounded flex-1 text-center">Home</Link>
                <Link to={"/games"} className="py-2 px-4 rounded flex-1 text-center">Games</Link>
                <Link to={"/games/create"} className="py-2 px-4 rounded flex-1 text-center">Create</Link>
            </nav>
            <div className="flex justify-center p-4">
                <Button/>
            </div>
            <main className="p-4">
                <Outlet/>
            </main>
        </div>
    )
}

export default Layout;
