import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


//TO DO:
// set up Search state

function Search() {

  const { searchInput } = useParams();
  const dispatch = useDispatch();

  const users = useSelector((state) => Object.values(state.search.users));





}


export default Search;
