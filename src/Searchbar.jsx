import React, { useState } from "react";

const Searchbar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    }

    return(
        <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search for games or developers..."/>
    )
}

export default Searchbar;
