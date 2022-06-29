import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import SchemaHandler from "./SchemaBuilder";

const client = new ApolloClient({
  uri: process.env.REACT_APP_HASURA_URL ?? "No uri env found",
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret":
      process.env.REACT_APP_HASURA_ADMIN_SECRET ?? "No secret env found",
  },
});

const App = (): JSX.Element => {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Routes>
          <Route path="overview/:overviewId" element={<Home />} />
          <Route path="oview" element={<SchemaHandler />}>
            <Route path=":oview" element={<SchemaHandler />} />
          </Route>
        </Routes>
      </ApolloProvider>
    </div>
  );
};

export default App;
