import React, { Component } from 'react';
import './Cart.css';
import CartItems from './cartItems/CartItems';
import dataForMap from '../data/Dummy.json';

export default class Cart extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       Cart:[]
    }
  }
  render() {
    const infoMap = dataForMap.infoForMap; // delete afther fetching this info from other source (if you !need this name)
    // total quantity of items
    const quantitySum = () => {
      const quantity = infoMap.map(i=>i.quantity);
      return quantity.reduce((a, b) => a + b, 0);
    }

    return (
      <div className='cart'>
        <h2>CART</h2>

        {infoMap.map((i)=>{
          return <CartItems
                    key={i.id}
                    itemId={i.id}
                    itemQuantity={i.quantity}
                    currencySwitcher={this.props.currencySwitcher}
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
            <p className='infoVal'>$42.00</p>
            <p className='infoVal'>{quantitySum()}</p>
            <p className='infoVal'>$244.11</p>
          </div>
        </div>
         
          <button className='orderBtn'>ORDER</button>
        </div>

      </div>
    )
  }
}
