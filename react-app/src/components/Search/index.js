import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { loadUsers} from "../../store/search";

function Search() {

  const { searchInput } = useParams();
  const dispatch = useDispatch();

  console.log('IM IN THE SEARCH COMPONENT---------')

  const users = useSelector((state) => state?.search.users);
  // const users = useSelector((state) => Object.values(state?.search.users));

  console.log('USERS IN SEARCH COMPONENT--------', users)
  useEffect(() => {
    dispatch(loadUsers());
    }, [dispatch]);

  return (
    <div>
      <h2>Results</h2>

    </div>
  )




}


export default Search;
