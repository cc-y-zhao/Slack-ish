import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { loadUsers} from "../../store/search";

function Search() {

  const { searchInput } = useParams();
  const dispatch = useDispatch();

  const users = useSelector((state) => Object.values(state.search.users));

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
