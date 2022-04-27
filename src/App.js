import React, { Component } from 'react';
// import Cart from './components/Cart';
// import Category from './components/Category';
import Overlay from './components/Overlay';
import Product from './components/Product';
import './surface.css';
import svg3 from './icons/svg3.svg';
// import wheel from './icons/wheel.svg';
// make vector wheel if end up using it
import Vector from './icons/Vector.svg';


export default class App extends Component {
  render() {
    return (
      <div>
        <div className='surface'>
          <div className='category'>
            <p>WOMEN</p>
            <p>MEN</p>
            <p>KIDS</p>
          </div>
          <img src={svg3} alt='Green rectangle with arrow inside' />
          <div className='actions'>
            <p>$ ^</p>
            <img src={Vector} alt='Shopping wheel' />
          </div>
        </div>

        
        <Overlay />
        {/* <Category /> */}
        <Product />
        {/* <Cart /> */}
      </div>
    )
  }
}

