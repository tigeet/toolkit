import { MainPage } from "@pages/main/";
import { RepositoryPage } from "@pages/repository/";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/:login/:name",
    element: <RepositoryPage />,
  },
]);

export default router;
