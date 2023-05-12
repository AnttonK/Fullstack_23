import React from "react";

const Filter = ({search, handleSearch}) => {
    return (
        <p>
            filter shown with <input value={search}
            onChange={handleSearch}/>
        </p>
    )
}
export default Filter