// delete afther complete fetch
import React, { Component } from 'react';
import {
  useQuery,
  gql,
} from '@apollo/client';

export default class App extends Component {
  render() {

    const EXCHANGE_RATES = gql`
    query GetRates {
      categories{
        name
      }
    }
  `;

    function ExchangeRates() {
      const { loading, error, data } = useQuery(EXCHANGE_RATES);

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.categories.map(({ name }) => (
        <div key={name}>
          <p>{name}</p>
        </div>
      ));
    }
    return (
      // put ApolloProvider tags in index.js rendering file
        <div>
          <h1>Class categories!</h1>
          <ExchangeRates />
        </div>
    );
  }
}
