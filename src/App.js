import React, { Component } from 'react';
// import Cart from './components/Cart';
import Category from './components/Category';
import Overlay from './components/Overlay';
// import Product from './components/Product';
// import wheel from './icons/wheel.svg';
// make vector wheel if end up using it
// import TestClass from './TestClass';
import Header from './components/Header';

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
    return (
      <div>

        <Header />
        
        <Overlay />
        <Category />
        {/* <Product /> */}
        {/* <Cart /> */}
        {/* <TestClass /> */}
      </div>
    )
  }
}

