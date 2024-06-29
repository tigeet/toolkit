/// <reference types="vite-plugin-svgr/client" />

import { RouterProvider } from "react-router-dom";
import router from "./router/";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { Provider } from "react-redux";
import { persistor, store } from "./store";

import "./styles.scss";
import { PersistGate } from "redux-persist/integration/react";
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <RouterProvider router={router} />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
