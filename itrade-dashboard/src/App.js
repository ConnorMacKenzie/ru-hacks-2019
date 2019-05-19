import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'
import Graph from './components/Graph'
import Dashboard from './components/Dashboard';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {

    render() {
        return (
          <ApolloProvider client={client}>
            <div className="App">
              <Dashboard/>
            </div>
          </ApolloProvider>
        );
    }
}

export default App;
