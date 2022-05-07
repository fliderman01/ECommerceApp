import React, { Component } from 'react';
import './header.css';
import svg3 from '../icons/svg3.svg';
import Vector from '../icons/Vector.svg';
import {
    useQuery,
    gql,
  } from '@apollo/client';

export class Header extends Component {
    
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
            <img src={svg3} alt='Green rectangle with an arrow inside' />
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
      <SiteHeader />
    )
  }
}

export default Header