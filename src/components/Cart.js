import React, { Component } from 'react';
import './Cart.css';
import CartItems from './cartItems/CartItems';
import { Link } from 'react-router-dom';

export default class Cart extends Component {
  render() {
    // calculate Tax 21%
    const total = (total) => {
      const result = (21 * total) / 100
      return result.toFixed(2);
    }
    //sum of const sum items
    const totalPrice = this.props.sum.reduce((a, b) => a + b, 0);

    return (
      <div className='cart'>
        <h2>CART</h2>

        {this.props.cart.map((i, index)=>{
          return <CartItems
                    key={i.id}
                    itemId={i.id}
                    itemQuantity={i.quantity}
                    currencySwitcher={this.props.currencySwitcher}
                    changeProductId={this.props.changeProductId}
                    addCart={this.props.addCart}
                    decCart={this.props.decCart}
                    index={index}
                  />
        })}



        <div className='orderInfo'>

        <div className='orderSection'>
          <div>
            <p className='cartInfo'>Tax 21%: </p>
            <p className='cartInfo'>Quantity: </p>
            <p className='cartInfo totalInfo'>Total: </p>
          </div>

          <div>
            <p className='infoVal'>${total(totalPrice)}</p>
            <p className='infoVal'>{this.props.quantitySum()}</p>
            <p className='infoVal'>${totalPrice.toFixed(2)}</p>
          </div>
        </div>
         
         {/* make entire btn clickable */}
          <button onClick={()=>this.props.emptyCart()} className='orderBtn'><Link className='routerLink linkB' id='cartLink' to="/">ORDER</Link></button>
        </div>

      </div>
    )
  }
}
