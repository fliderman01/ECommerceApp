import React, { Component } from 'react';
// import Cart from './components/Cart';
import Category from './components/Category';
import Overlay from './components/Overlay';
// import Product from './components/Product';
import './surface.css';
import svg3 from './icons/svg3.svg';
// import wheel from './icons/wheel.svg';
// make vector wheel if end up using it
import Vector from './icons/Vector.svg';
// import TestClass from './TestClass';
import {
  useQuery,
  gql,
} from '@apollo/client';

// create new components file for SiteHeader

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      categories: [],
      currencies: [],
    }
  }

  render() {
    const CATEG_CURRENCIES = gql`
      query GetRates {
        categories{
          name
        }
        currencies{
          label
          symbol
        }
      }
    `;

    function SiteHeader() {
      const { loading, error, data } = useQuery(CATEG_CURRENCIES);

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return <div className='surface'>
              <div className='category'>
                {data.categories.map(({name})=>(
                  <p key={name}>{name}</p>
                ))}
              </div>
              <img src={svg3} alt='Green rectangle with arrow inside' />
              <div className='actions'>
              <select name="currencies" id="currencies">
                {data.currencies.map(({label, symbol})=>(
                  <option value={label}>{symbol} {label}</option>
                ))}
              </select>
                <img src={Vector} alt='Shopping wheel' />
              </div>
            </div>
    }

    return (
      <div>

        <SiteHeader />
        
        <Overlay />
        <Category />
        {/* <Product /> */}
        {/* <Cart /> */}
        {/* <TestClass /> */}
      </div>
    )
  }
}

