/// <reference types="vite-plugin-svgr/client" />

import { RouterProvider } from "react-router-dom";
import router from "./router/";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { Provider } from "react-redux";
import { store } from "./store";

import "./styles.scss";
const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </Provider>
  );
};

export default App;
