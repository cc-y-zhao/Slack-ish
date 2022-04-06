import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';

import { loadUsersResults } from "../../store/search";

function Search() {
  // const { searchInput } = useParams();
  const dispatch = useDispatch();

  const results = useSelector((state) => state?.search.users_results);
  const prevSearchInput = useSelector((state) => state?.search.search_input);


  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchResult] = useState(prevSearchInput);

  console.log('previous search input', prevSearchInput);


  // useEffect(() => {
  //   dispatch(loadUsersResults());
  // }, [dispatch]);

  // From Dan:
  // useEffect allows you to run code between renders.. doesnt actually cause renders
  // console log inside useEffects

  // useEffect(() => {
  //   if (searchUsers.includes(searchInput)) {

  //   }
  // }, [searchInput])

  // once a name is selected, need to search join table to see if a channel_users intance exists
  // if message room doesn't exist, create new channel with hardcoded values (is_dm),
  // and then redirect / history.push them to that new channel


  return (
    <div>
      <div className="search">
        <h2>Results</h2>
        <input placeholder='Search'
          value={searchInput}
          // onClick={() => setShowModal(true)}
          onChange={(e) => dispatch(loadUsersResults(e.target.value))}
          // onChange -> dispatch for the results and then setSearchResult to those results
        />
        {/* <button onClick={() => setShowModal(true)} />
        {showModal && (
          <>
            <Modal onClose={() => setShowModal(false)} />
            <div>{searchInput}</div>
            <Modal />
          </>
        )} */}
        <h2>Search Results</h2>
          <div className="search__result">
          {results?.map(result => (
            <div key={result.id}>
              {result.first_name} {result.last_name}
            </div>
          ))}
        </div>
        {/* <h2>All Users: (for testing)</h2>
        <div className="search__result">
          {users?.map(user => (
            <div key={user.id}>
              {user.first_name} {user.last_name}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  )




}


export default Search;
