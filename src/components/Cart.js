import React, { Component } from 'react';
import './Cart.css';
import CartItems from './cartItems/CartItems';

export default class Cart extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       Cart:[]
    }
  }
  render() {
    return (
      <div className='cart'>
        <h2>CART</h2>

        <CartItems />
        <CartItems />


        <div className='orderInfo'>
          <p className='cartInfo'>Tax: <span className='infoVal'>$15.00</span></p>
          <p className='cartInfo'>Qty: <span className='infoVal'>3</span></p>
          <p className='cartInfo totalInfo'>Total: <span className='infoVal'>$200.00</span></p>
          <button className='orderBtn'>ORDER</button>
        </div>

      </div>
    )
  }
}
