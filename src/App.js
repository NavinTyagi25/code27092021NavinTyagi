import React from 'react';
//import "./App.css";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Route, BrowserRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

// import Footer from './components/Footer/Footer';
//
import Products from './components/Products/ShowAllProduct';
const AUTH_TOKEN = 'auth-token';

let token;

function checklogin() {
  let res = null;
  token = localStorage.getItem(AUTH_TOKEN) || null;
  if (token !== null) {
    var decoded = jwtDecode(token);
    res = decoded;
    if (Date.now() / 1000 > res.exp) {
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.clear();
      console.log("Oh, you have a key, but it's expired! ");
    }
  } else {
    console.log("You don't have a key? Why don't you ask that gentleman there? Go on then");
  }
  return res;
}
//uri:    https://sushingg-api.herokuapp.com/graphql
//        http://localhost:4000/graphql
const client = new ApolloClient({
  uri: 'https://sushingg-api.herokuapp.com/graphql',
  request: async (operation) => {
    if (checklogin()) {
      operation.setContext({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(AUTH_TOKEN),
        },
      });
    }
  },
});

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Route exact path="/" component={Products} />
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
