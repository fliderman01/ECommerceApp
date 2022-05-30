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
       cart:[],
       peoductId:'',
       showOverlay:false,
       currencySymbol:'$'
      }
    };
    // change currency symbol (for Product)
    categSymbol = (Data) => {
      this.setState({currencySymbol: Data})
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
    // hide overlay
    hideOverlay = () => {
      this.setState({
        showOverlay: false
      })
      console.log('hii')
    }
    // show overlay
    showOverlay = () => {
      this.setState({
        showOverlay: true
      })
      console.log('mela')
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
    // items total quantity
    const quantitySum = () => {
      const quantity = this.state.cart.map(i=>i.quantity);
      return quantity.reduce((a, b) => a + b, 0);
    }

    // add items to cart
    const changeCart = (id, quantity, price) => {
      // are duplicate items in cart?
      const isItemInCart = this.state.cart.find(i=>i.id === id);
      // if cart has duplicate item, increase items quantity, else add item 
      if (isItemInCart) {
        this.setState({
          cart: this.state.cart.map(i=>i.id===id?{...i, quantity: i.quantity + 1} : i)
        })
      } else {
        this.setState({
            cart: [...this.state.cart, {
              id: id,
              quantity: quantity,
              price: price,
              attributes: {}
            }]
          });
      }
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
          quantitySum={quantitySum}
          hideOverlay={this.hideOverlay}
          categSymbol={this.categSymbol}
        />
        <div className='overlay' style={{display: this.state.showOverlay ? 'initial' : 'none'}}></div>

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
            quantitySum={quantitySum}
        />
        
        <Routes>
          <Route index element={<Category
            categ={this.state.msg}
            currencySwitcher={this.state.currencySwitcher}
            // cart={this.state.cart}
            changeCart={changeCart}
            changeProductId={changeProductId}
            // showOverlay={this.state.showOverlay}
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
                                            quantitySum={quantitySum}
                                            symbol={this.state.currencySymbol}
                                          />} />
          <Route path="*" element={<NoPage />} />
        </Routes>        
        
      </BrowserRouter>
    )
  }
}
// reference, (delete after finish) https://github.com/weibenfalk/react-shopping-cart/tree/main/src