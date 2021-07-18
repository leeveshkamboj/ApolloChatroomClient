import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { setContext } from "apollo-link-context";
import { getMainDefinition } from "@apollo/client/utilities";

import Login from "./components/login";
import Home from "./components/home";
import MenuBar from "./components/navbar";
import { AuthProvider } from "./context/auth";
import About from "./components/about";
import Register from "./components/register";
import Verify from "./components/verify";
import { WebSocketLink } from "@apollo/client/link/ws";
import Chat from "./components/chat";
import Contacts from "./components/contacts";

const httpUrl = "https://apollochatroom.herokuapp.com/graphql";
const webSocketUrl = "wss://apollochatroom.herokuapp.com/graphql";

const wsLink = new WebSocketLink({
  uri: webSocketUrl,
  options: {
    reconnect: true,
  },
});

const httpLink = createHttpLink({
  uri: httpUrl,
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <MenuBar />
          <Container>
            <br />
            <br />
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/verify/:token">
                <Verify />
              </Route>
              <Route path="/chat/:username">
                <Chat />
              </Route>
              <Route path="/chat">
                <Contacts />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </Container>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
