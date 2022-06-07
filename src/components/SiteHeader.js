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

  let useClickOutside = (handler) => {
    let domNode = useRef();
  
    useEffect(() => {
      let maybeHandler = (event) => {
        if (!domNode.current.contains(event.target)) {
          handler();
        }
      };
  
      document.addEventListener("mousedown", maybeHandler);
  
      return () => {
        document.removeEventListener("mousedown", maybeHandler);
      };
    });
  
    return domNode;
  };

  
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

        let domNode = useClickOutside(() => {
          setShowOverlay(false);
        });
        // useEffect(() => {
        //   document.addEventListener("mousedown", (event) => {
        //     if (!menuRef.current.contains(event.target)) {
        //       // setShowCurrency(true);
        //       toggleOverlay()
        //       // hideOverlay();
        //     }
        //     document.addEventListener('mousedown', menuRef);

        //     return () => {
        //       document.removeEventListener('mousedown', menuRef);
        //     };
        //   });
        // });
        // useEffect(()=>{
        //   document.addEventListener("mousedown", (event)=>{
        //     if (!menuRef.current.contains(event.target)){
        //       setShowOverlay(false)
        //     }
        //   })
        // })

        // // show overlay
        // const showThisOverlay = () => {
        //   setShowOverlay(true)
        // }
        // console.log(showOverlay, 'ahahahahahahahahahahahah')
  
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

                  <button
                    className='currencySwitch'
                    onClick={()=>setShowCurrency(!showCurrency)}
                    onBlur={()=>setShowCurrency(true)}
                  >
                    {data.currencies[props.currencySwitcher].symbol}
                    <img
                      className='arrowImg'
                      src={vectorUp}
                      alt='arrow up'
                      style={{transform: showCurrency ? '' : 'rotate(180deg)', transitionDuration: '.5s'}}
                    />
                    {/* put this menu outside of currency switch button & see if menu ref works */}
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
                  </button>


                      <div
                        ref={domNode}
                        className='overlaySwitch'
                      >
                        <div
                          onClick={()=>toggleOverlay()}
                          className='currencySwitchInside'
                        >
                          <img
                            src={Vector}
                            alt='Shopping wheel'
                            style={{width:'37px', marginTop:'5px'}}
                          />
                        </div>
                          {/* delete show/toggleOverlay at the end */}
                          {showOverlay && <Overlay
                              currencySwitcher={props.currencySwitcher}
                              changeProductId={props.changeProductId}
                              cart={props.cart}
                              // showOverlay={showOverlay}
                              toggleOverlay={toggleOverlay}
                              emptyCart={props.emptyCart}
                              addCart={props.addCart}
                              decCart={props.decCart}
                              sum={props.sum}
                              quantitySum={props.quantitySum}
                              checking={props.checking}
                              // showThisOverlay={showThisOverlay}
                          />}
                        {props.quantitySum() ? <div onClick={()=>setShowOverlay(!showOverlay)} className='numOfItems'>{props.quantitySum()}</div> : null}
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
                checking={this.props.checking}
            />
            
          </>
      )  
  }
}

export default SiteHeader