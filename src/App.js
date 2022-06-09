import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import Category from './components/Category';
import SiteHeader from './components/SiteHeader';
// import Overlay from './components/Overlay';
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
       productId:'huarache-x-stussy-le',
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
      const total = i.price * i.quantity;
      return total
    });
    // items total quantity
    const quantitySum = () => {
      const quantity = this.state.cart.map(i=>i.quantity);
      return quantity.reduce((a, b) => a + b, 0);
    }

    // add items to cart
    const changeCart = (id, quantity, price, selectedAttr) => {
      // are duplicate items in cart?
      const isItemInCart = this.state.cart.find(i=>i.id === id);
      // const sameIds = this.state.cart.filter(i=>i.id === id);
      // const sameAttrs = (sameIds.length && sameIds[0].attributes[0]) ? sameIds[0].attributes.some((i)=>i.attrId === selectedAttr[0].attrId && i.attr === selectedAttr[0].attr) : false;
      // const sameAttrs = (isItemInCart.attributes.length) ? isItemInCart.attributes.some((i)=>i.attrId === selectedAttr[0].attrId && i.attr === selectedAttr[0].attr) : false;
      
      // check if cart item and new item have same attributes
      const sameAttrs = isItemInCart && isItemInCart.attributes.every((i, index)=>i.attrId === selectedAttr[index].attrId && i.attr === selectedAttr[index].attr);
      // const sameAttrs = sameIds[0].attributes.some((i)=>i.attrId === selectedAttr[0].attrId && i.attr === selectedAttr[0].attr);
      // console.log(sameAttrs, 'cart')
      // console.log(isItemInCart && isItemInCart.attributes.some((i, index)=>i.attrId === selectedAttr[index].attrId), 'karta');
      // console.log(isItemInCart && isItemInCart.attributes.map(i=>i.attrId), 'isItemInCart');
      // console.log(selectedAttr, 'selected');
      // console.log(sameAttrs, 'sameAttrs');
      // if cart has duplicate item, increase items quantity, else add item 
      if (isItemInCart && sameAttrs) { // && !sameAttrs.length
        this.setState({
          cart: this.state.cart.map(i=>i.id===id?{...i, quantity: i.quantity + 1} : i)
        })
      }
      // here should be 1 if else statement: (!isItemInCart || (isItemInCart && sameAttrs))
      else if (!isItemInCart ||( isItemInCart && !sameAttrs))  { 
        this.setState({
            cart: [...this.state.cart, {
              id: id,
              quantity: quantity,
              price: price,
              attributes: selectedAttr
            }]
          });
      }
      // else // if (isItemInCart && sameAttrs.length || !isItemInCart)
      // {
      //   this.setState({
      //       cart: [...this.state.cart, {
      //         id: id,
      //         quantity: quantity,
      //         price: price,
      //         attributes: selectedAttr
      //       }]
      //     });
      // }
    }
    // give attributes check value
    const checking =(index, attr, attrId, productId)=>{
      const thisCart = this.state.cart.filter(i=>i.id===productId)
      const attrs = thisCart[0].attributes.map(i=>i.attr);
      const attrIds = thisCart[0].attributes.filter(i=>i.attrId === attrId);
      if (attrIds.length !== 0 && attrIds[0].attr === attr) {
        return true
      } else if (attrs.some(i=>i !== attr) && index===0){
        return true
      } else if (attrs.length===0 && index===0){
        return true
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
          // for overlay
          changeProductId={changeProductId}
          cart={this.state.cart}
          emptyCart={this.emptyCart}
          addCart={this.addCart}
          decCart={this.decCart}
          sum={sumTotalPrice}
          checking={checking}
        />
        
        <Routes>
          <Route index element={<Category
            categ={this.state.msg}
            currencySwitcher={this.state.currencySwitcher}
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
                                            quantitySum={quantitySum}
                                            symbol={this.state.currencySymbol}
                                            checking={checking}
                                          />} />
          <Route path="*" element={<NoPage />} />
        </Routes>        
        
      </BrowserRouter>
    )
  }
}
// reference, (delete after finish) https://github.com/weibenfalk/react-shopping-cart/tree/main/src