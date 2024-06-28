// query GetRepository($login:String!, $name:String!) {
//   repositoryOwner(login: $login) {
//     repository(name: $name) {
//      stargazerCount
//     }
//   }
// }

import { useParams } from "react-router-dom";

const RepositoryPage = () => {
  const { login, name } = useParams();
  return (
    <div>
      Repository {login}/{name}
    </div>
  );
};

export { RepositoryPage };
