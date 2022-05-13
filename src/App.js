import React, { Component, useState, useEffect } from 'react';
import Cart from './components/Cart';
// import Category from './components/Category';
import Overlay from './components/Overlay';
import Product from './components/Product';
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
  constructor(props) {
    super(props)
  
    this.state = {
       msg:'',
       currencySwitcher:0
    }
  };
  // change category
  categInfo = (Data) => {
    this.setState({msg: Data})
  };
  // change currency
  currencySwitch = (Data) => {
    this.setState({currencySwitcher: Data})
  };

  render() {

    function SiteHeader(props) {      
      // category filter
      const sendData = (info) => {
        props.categInfo(info);
      }
      // currency switcher
      const sendSwitchData = (info) => {
        props.currencySwitch(info)
      }

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
                  <p onClick={()=>{sendData(name);}} key={name}>{name}</p>
                ))}
              </div>
              <img src={svg3} alt='Green rectangle with an arrow inside' />
              <div className='actions'>
                <span className='currencySwitch' onClick={()=>setShowCurrency(!showCurrency)}>{data.currencies[currency].symbol} <img src={vectorUp} alt='arrow up' style={{transform: showCurrency ? '' : 'rotate(180deg)', transitionDuration: '.5s'}} /></span>
                {console.log(currency, 'map')}
                <div className='displCurrency' style={{display: showCurrency ? 'none' : 'initial', transitionDuration: '3s'}}>
                  <ul>
                    {data.currencies.map(({label, symbol}, index)=>(
                      <li key={index} onClick={()=>{setCurrency(index); setShowCurrency(true); sendSwitchData(index);}} >{symbol} {label}</li>
                    ))}
                  </ul>
                </div>
                  <img src={Vector} alt='Shopping wheel' style={{width:'37px'}} />
              </div>
            </div>
    }

    return (
      <div>

        <SiteHeader currency={this.props.currency} categInfo={this.categInfo} currencySwitch={this.currencySwitch} />
        <div className='overlay'></div>

        <Overlay />
        {/* <Category categ={this.state.msg} currencySwitcher={this.state.currencySwitcher} /> */}
        <Product currencySwitcher={this.state.currencySwitcher}/>
        <Cart />
      </div>
    )
  }
}