import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import Category from './components/Category';
import SiteHeader from './components/SiteHeader';
import Overlay from './components/Overlay';
import Product from './components/Product';
import NoPage from './components/NoPage';
import './app.css';
// import wheel from './icons/wheel.svg';
// make vector wheel if end up using it


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
    // empty cart (on order or check out)
    emptyCart = () => {
      this.setState({
        cart:[]
      })
    }
    // add item (quantity) to cart
    // addItem = (id) => {
    //   // this.state.cart.map(i => i.id === id && i.quantity + 1)
    //   this.setState({
    //     cart: this.state.cart.map(i=>i.id===id && i.quantity +1)
    //   })
    // }

  render() {
    // add items to cart
    const changeCart = (id, quantity) => {
      this.setState({
          cart: [...this.state.cart, {
            id: id,
            quantity: quantity
          }]
        });
    }
    // change id of item in Product
    const changeProductId = (data) => {
      this.setState({
        productId: data
      })
    }

    return (
      <BrowserRouter>

        {/* delete this.props.currency */}
        <SiteHeader
          currency={this.props.currency}
          categInfo={this.categInfo}
          currencySwitch={this.currencySwitch}
          toggleOverlay={this.toggleOverlay}
          currencySwitcher={this.state.currencySwitcher}
        />
        <div className='overlay'></div>
        {/* delete afther finish */}
        <button onClick={()=>this.addItem('ps-5')}>+</button>

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
                                            emptyCart={this.emptyCart}
                                          />} />
          <Route path="*" element={<NoPage />} />
        </Routes>

        <Overlay
            currencySwitcher={this.state.currencySwitcher}
            changeProductId={changeProductId}
            cart={this.state.cart}
            showOverlay={this.state.showOverlay}
            toggleOverlay={this.toggleOverlay}
            emptyCart={this.emptyCart}
        />
        
        
        
      </BrowserRouter>
    )
  }
}