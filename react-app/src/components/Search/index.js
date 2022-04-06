import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';

import { loadUsers } from "../../store/search";

function Search() {
  // const { searchInput } = useParams();
  // const dispatch = useDispatch();

  // const searchState = useSelector((state) => Object.values(state?.search));

  // console.log('NEW SEARCH STATE-----------', searchState);

  // const [showModal, setShowModal] = useState(false)
  // const [searchInput, setSearchResult] = useState('')


  // useEffect(() => {
  //   dispatch(loadUsers());
  // }, [dispatch]);

  // useEffect allows you to run code between renders.. doesnt actually cause renders
  // console log inside useEffects

  // useEffect(() => {
  //   if (searchUsers.includes(searchInput)) {

  //   }
  // }, [searchInput])
  // once a name is selected, need to search join table to see if a channel_users intance exists
  //if message room doesn't exist, create new channel with hardcoded values (is_dm),
  // and then redirect / history.push them to that new channel

  return (
    <div>

      {/* <div className="search">
        <h2>Results</h2>
        <input placeholder='Search'
          value={searchInput}
          onClick={() => setShowModal(true)}
          onChange={(e) => setSearchResult(e.target.value)}
        />
        <button onClick={() => setShowModal(true)} />
        {showModal && (
          <>
            <Modal onClose={() => setShowModal(false)} />
            <div>{searchInput}</div>
            <Modal />
          </>
        )}
        <div className="search__result">
          {searchUsers.map(search => (
            <div key={search.id}>
              {search.first_name} {search.last_name}
            </div>
          ))}
        </div>
      </div> */}

    </div>
  )




}


export default Search;
