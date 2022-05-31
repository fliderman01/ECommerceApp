import React, { Component, useState, useRef, useEffect } from 'react';
import '../app.css';
import Overlay from './Overlay';
import svg3 from '../icons/svg3.svg';
import vectorUp from '../icons/VectorUp.png';
import Vector from '../icons/shopping.png';
import { Link } from 'react-router-dom';
import {
    useQuery,
    gql,
  } from '@apollo/client';

  
  export class SiteHeader extends Component {
    render() {
      function Header(props) {      
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
        const [showCurrency, setShowCurrency] = useState(true);
        const [showOverlay, setShowOverlay] = useState(false);
        // toggle overlay
        const toggleOverlay = () => {
          setShowOverlay(!showOverlay);
        }
        // toggle overlay
        // const hideOverlay = () => {
        //   setShowOverlay(false);
        // }
        // hide currency siwtcher and overlay on outside click
        let menuRef = useRef();
        useEffect(() => {
          document.addEventListener("mousedown", (event) => {
            if (!menuRef.current.contains(event.target)) {
              setShowCurrency(true);
              // hideOverlay();
            }
            document.addEventListener('mousedown', menuRef);
      
            return () => {
              document.removeEventListener('mousedown', menuRef);
            };
          });
        });
  
        // switch / set currency
        const currencyFuncts = (index) => {
          // setCurrency(index);
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
                <Link to="/"><img src={svg3} alt='Green rectangle with an arrow inside' /></Link>
                <div className='actions'>
                  <div
                    className='currencySwitch'
                    onClick={()=>setShowCurrency(!showCurrency)}
                    ref={menuRef}
                  >
                    {data.currencies[props.currencySwitcher].symbol}
                    <img
                      src={vectorUp}
                      alt='arrow up'
                      style={{transform: showCurrency ? '' : 'rotate(180deg)', transitionDuration: '.5s'}}
                    />
                  <div className='displCurrency' style={{display: showCurrency ? 'none' : 'initial', transitionDuration: '3s'}}>
                    <ul>
                      {data.currencies.map(({label, symbol}, index)=>(
                        <li
                          key={index}
                          onClick={()=>{currencyFuncts(index); props.categSymbol(symbol)}}
                        >
                          {symbol} {label}
                        </li>
                      ))}
                    </ul>
                  </div>
                      </div>
                      <div ref={menuRef}>
                        <Overlay
                            currencySwitcher={props.currencySwitcher}
                            changeProductId={props.changeProductId}
                            cart={props.cart}
                            showOverlay={showOverlay}
                            toggleOverlay={toggleOverlay}
                            emptyCart={props.emptyCart}
                            addCart={props.addCart}
                            decCart={props.decCart}
                            sum={props.sum}
                            quantitySum={props.quantitySum}
                        />
                        <img
                          src={Vector}
                          alt='Shopping wheel'
                          style={{width:'37px'}}
                          onClick={()=>toggleOverlay()}
                          // onMouseLeave={()=>props.hideOverlay()}
                        />
                        {props.quantitySum() ? <div className='numOfItems'>{props.quantitySum()}</div> : null}
                      </div>
                </div>
                <div className='overlay' style={{display: showOverlay ? 'initial' : 'none'}}></div>
              </div>
      }
  
      return (
          <>
            {/* delete this.props.currency */}
            <Header
                // currency={this.props.currency}
                categInfo={this.props.categInfo}
                currencySwitch={this.props.currencySwitch}
                toggleOverlay={this.props.toggleOverlay}
                currencySwitcher={this.props.currencySwitcher}
                quantitySum={this.props.quantitySum}
                // hideOverlay={this.props.hideOverlay}
                categSymbol={this.props.categSymbol}
                // overlay
                changeProductId={this.props.changeProductId}
                cart={this.props.cart}
                emptyCart={this.props.emptyCart}
                addCart={this.props.addCart}
                decCart={this.props.decCart}
                sum={this.props.sum}
            />
            
          </>
      )  
  }
}

export default SiteHeader