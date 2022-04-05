import React from 'react'
import './SearchBar.css'
const SearchBar = () => {
    return (
        <div className="searchbar__top">
            <div className="searchbar__blank">

            </div>

            <div className="searchbar__searchbar">
                <input placeholder='Search Slack-ish'>
                </input>
            </div>

            <div className="searchbar__avatar">

            </div>
        </div>
    )
}

export default SearchBar
