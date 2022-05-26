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
       cart:[{id:'ps-5', quantity:3, price:884.02}], // empty string
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
    // increase quantity in cart
    addCart = (index) => {
      if (this.state.cart) {
        let temp_state = [...this.state.cart];
        let temp_element = { ...temp_state[index] };
        temp_element.quantity = temp_element.quantity+1;
        temp_state[index] = temp_element;
        this.setState({cart: temp_state });
      }
    }
    // decrease quantity in cart
    decCart = (index) => {
      if (this.state.cart) {
        let temp_state = [...this.state.cart];
        let temp_element = { ...temp_state[index] };
        temp_element.quantity = temp_element.quantity-1;
        temp_state[index] = temp_element;
        this.setState({cart: temp_state });
      }
      // del element from array
      if (this.state.cart[index].quantity<2){
        let temp_state = [...this.state.cart];
        const newState = temp_state.filter((_, i) => i !== index); // what does "_" mean?
        this.setState({cart: newState})
      }
    }

  render() {
    // calculate price * quantity
    const sumTotalPrice = this.state.cart.map((i) => {
      const bb = i.price * i.quantity;
      return bb
    });
    console.log(this.state.cart, 'nikita')

    // add items to cart
    const changeCart = (id, quantity, price) => {
      this.setState({
          cart: [...this.state.cart, {
            id: id,
            quantity: quantity,
            price: price
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
            // cart={this.state.cart}
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
                                            addCart={this.addCart}
                                            decCart={this.decCart}
                                            sum={sumTotalPrice}
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
            addCart={this.addCart}
            decCart={this.decCart}
            sum={sumTotalPrice}
        />
        
        
        
      </BrowserRouter>
    )
  }
}