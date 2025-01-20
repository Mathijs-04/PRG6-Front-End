import { Link, Outlet } from "react-router";

function Layout() {
    return (
        <>
            <header className="bg-black text-white p-4 flex justify-center items-center">
                <h1 className="text-5xl font-bold">Game App</h1>
            </header>
            <nav className="bg-black text-white p-4 flex justify-between">
                <Link to={"/"} className="py-2 px-4 rounded flex-1 text-center">Home</Link>
                <Link to={"/games"} className="py-2 px-4 rounded flex-1 text-center">Games</Link>
                <Link to={"/games/create"} className="py-2 px-4 rounded flex-1 text-center">Create</Link>
            </nav>
            <main className="bg-black text-white p-4">
                <Outlet/>
            </main>
        </>
    )
}

export default Layout;
