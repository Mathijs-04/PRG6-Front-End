import React, { useState, useContext } from "react";
import { ThemeContext } from "./ThemeContext.jsx";

const Searchbar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const { theme } = useContext(ThemeContext);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for games or developers..."
            className={`w-full max-w-md px-4 py-2 rounded border focus:outline-none focus:ring-2 ${
                theme === "dark"
                    ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500"
                    : "bg-white text-black border-gray-300 focus:ring-blue-500"
            }`}
        />
    );
};

export default Searchbar;
