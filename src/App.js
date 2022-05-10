import React, { Component, useState, useEffect } from 'react';
// import Cart from './components/Cart';
import Category from './components/Category';
import Overlay from './components/Overlay';
// import Product from './components/Product';
import './app.css';
import svg3 from './icons/svg3.svg';
import vectorUp from './icons/VectorUp.png';
// import wheel from './icons/wheel.svg';
// make vector wheel if end up using it
import Vector from './icons/shopping.png';
import {
  useQuery,
  gql,
} from '@apollo/client';

export default class App extends Component {

  render(props) {
    function SiteHeader(props) {
      // category filter
      const [categ, setCateg] = useState('all');
      console.log(categ, 'vvvvvvv');

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
      const { loading, error, data } = useQuery(CATEG_CURRENCIES);
      // switch currency
      const [currency, setCurrency] = useState(() => {
        const saved = localStorage.getItem('currency');
        return saved ? JSON.parse(saved) : 0;
      });
      useEffect(() => {
        localStorage.setItem('currency', JSON.stringify(currency));
      }, [currency]);
      // show/hide currency switcher
      const [showCurrency, setShowCurrency] = useState(true);

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return <div className='surface'>
              <div className='category'>
                {data.categories.map(({name})=>(
                  <p onClick={()=>setCateg(name)} key={name}>{name}</p>
                ))}
              </div>
              <img src={svg3} alt='Green rectangle with an arrow inside' />
              <div className='actions'>
                <span className='currencySwitch' onClick={()=>setShowCurrency(!showCurrency)}>{data.currencies[currency].symbol} <img src={vectorUp} alt='arrow up' style={{transform: showCurrency ? '' : 'rotate(180deg)', transitionDuration: '.5s'}} /></span>
                <div className='displCurrency' style={{display: showCurrency ? 'none' : 'initial', transitionDuration: '3s'}}>
                  <ul>
                    {data.currencies.map(({label, symbol}, index)=>(
                      <li key={label} onClick={()=>{setCurrency(index); setShowCurrency(true);}} >{symbol} {label}</li>
                    ))}
                  </ul>
                </div>
                  <img src={Vector} alt='Shopping wheel' style={{width:'37px'}} />
              </div>
            </div>
    }

    return (
      <div>

        <SiteHeader currency={this.props.currency} categ={this.props.categ} />
        {console.log(this.props.categ, 'kata')}
        <div className='overlay'></div>

        <Overlay />
        <Category categ={this.props.categ} />
        {/* <Product currency={this.props.currency}/> */}
        {/* <Cart /> */}
        {/* <TestClass /> */}
      </div>
    )
  }
}
