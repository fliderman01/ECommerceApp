import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Cart from './components/Cart';
import Category from './components/Category';
import Overlay from './components/Overlay';
import Product from './components/Product';
import NoPage from './components/NoPage';
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
       currencySwitcher:0,
       cart:[{id:'ps-5', quantity:1}], // empty string
       peoductId:'',
       showOverlay:false
      }
    };
    // change category
    categInfo = (Data) => {
      this.setState({msg: Data})
    };
    // change currency
    currencySwitch = (Data) => {
      this.setState({currencySwitcher: Data})
      console.log(Data, 'twoData')
      console.log(this.state.currencySwitcher, 'threeSwitcher')
  };
    // show / hide overlay
    toggleOverlay = () => {
      this.setState({
        showOverlay: !this.state.showOverlay
      })
    }

  render() {
    // add items to cart
    const changeCart = (id, quantity) => {
      this.setState({
          cart: [...this.state.cart, {
            id: id,
            quantity: quantity
          }]
        });
        console.log(this.state.cart, 'kartarara')
    }
    // change id of item in Product
    const changeProductId = (data) => {
      this.setState({
        productId: data
      })
    }

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

      // switch / set currency (is error because this and above (localStorage) change currency concurently?(DELETE THIS))
      const currencyFuncts = (index) => {
        setCurrency(index);
        setShowCurrency(true);
        sendSwitchData(index);
      }

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return <div className='surface'>
              <div className='category'>
                {data.categories.map(({name})=>(
                  <p onClick={()=>{sendData(name);}} key={name}>{name}</p>
                ))}
              </div>
              <Link to="/"><img src={svg3} alt='Green rectangle with an arrow inside' onClick={()=>props.toggleOverlay()} /></Link>
              <div className='actions'>
                <span className='currencySwitch' onBlur={()=>setShowCurrency(!showCurrency)} onClick={()=>setShowCurrency(!showCurrency)} >{data.currencies[currency].symbol} <img src={vectorUp} alt='arrow up' style={{transform: showCurrency ? '' : 'rotate(180deg)', transitionDuration: '.5s'}} /></span>
                {console.log(currency, 'map')}
                <div className='displCurrency' style={{display: showCurrency ? 'none' : 'initial', transitionDuration: '3s'}}>
                  <ul>
                    {data.currencies.map(({label, symbol}, index)=>(
                      <li key={index} onClick={()=>currencyFuncts(index)} >{symbol} {label}</li>
                    ))}
                  </ul>
                </div>
                  <img
                    src={Vector}
                    alt='Shopping wheel'
                    style={{width:'37px'}}
                    onClick={()=>props.toggleOverlay()}
                  />
              </div>
            </div>
    }

    return (
      <BrowserRouter>

        {/* delete this.props.currency */}
        <SiteHeader
          currency={this.props.currency}
          categInfo={this.categInfo}
          currencySwitch={this.currencySwitch}
          toggleOverlay={this.toggleOverlay}
        />
        <div className='overlay'></div>

        <Routes>
          <Route index element={<Category
            categ={this.state.msg}
            currencySwitcher={this.state.currencySwitcher}
            cart={this.state.cart}
            changeCart={changeCart}
            changeProductId={changeProductId}
        />} />
          <Route path="product" element={<Product
                                            currencySwitcher={this.state.currencySwitcher}
                                            productId={this.state.productId}
                                            changeCart={changeCart}
                                          />} />
          <Route path="cart" element={<Cart
                                            currencySwitcher={this.state.currencySwitcher}
                                            changeProductId={changeProductId}
                                            cart={this.state.cart}
                                          />} />
          <Route path="*" element={<NoPage />} />
        </Routes>

        <Overlay
            currencySwitcher={this.state.currencySwitcher}
            changeProductId={changeProductId}
            cart={this.state.cart}
            showOverlay={this.state.showOverlay}
            toggleOverlay={this.toggleOverlay}
        />
        
        
        
      </BrowserRouter>
    )
  }
}