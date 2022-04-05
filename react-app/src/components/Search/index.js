import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';

import searchReducer, { loadUsers } from "../../store/search";

function Search() {
  // const { searchInput } = useParams();
  const dispatch = useDispatch();

  // console.log('what is search input', searchInput)
  const users = useSelector((state) => state.search);
  const searchUser = Object.values(users)
  const [showModal, setShowModal] = useState(false)
  const [searchInput, setSearchResult] = useState('')

  console.log(searchInput)
  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  useEffect(() => {
    if (searchUser.includes(searchInput)) {

    }
  }, [searchInput])

  return (
    <div>
      <div className="search">
        {/* <h2>Results</h2> */}
        <input placeholder='Search'
          value={searchInput}
          onClick={() => setShowModal(true)}
          onChange={(e) => setSearchResult(e.target.value)}
        />
        {/* <button onClick={() => setShowModal(true)} /> */}
        {showModal && (
          <>
            <Modal onClose={() => setShowModal(false)} />
            <div>{searchInput}</div>
            <Modal />
          </>
        )}
        <div className="search__result">
          {searchUser.map(search => (
            <div key={search.id}>
              {search.first_name} {search.last_name}
            </div>
          ))}
        </div>
      </div>

    </div>
  )




}


export default Search;
