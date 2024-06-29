// query GetRepository($login:String!, $name:String!) {
//   repositoryOwner(login: $login) {
//     repository(name: $name) {
//      stargazerCount
//     }
//   }
// }

import { useAppDispatch } from "@shared/model/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRepositoryThunk, setName, setOwner } from "../model/slice";

const RepositoryPage = () => {
  const { login, name } = useParams();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(setName(name));
    dispatch(setOwner(login));
    dispatch(fetchRepositoryThunk());
  }, [dispatch, login, name]);

  return (
    <div>
      Repository {login}/{name}
    </div>
  );
};

export { RepositoryPage };
