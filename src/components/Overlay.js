import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OverlayItems from './overlayItems/OverlayItems';
import './overlay.css';
import dataForMap from '../data/Dummy.json';


export default class Overlay extends Component {
  render() {
    const infoMap = dataForMap.infoForMap;
    // items total quantity
    const quantitySum = () => {
      const quantity = infoMap.map(i=>i.quantity);
      return quantity.reduce((a, b) => a + b, 0);
    }
    return (
      <aside style={{display: 'none'}}>
        {/* title */}
        <div className='title'>
          <h6>My Bag, <span className='itemNum'>{quantitySum()} items</span></h6>
        </div>

        {/* product description */}
        {infoMap.map(i=>{
          return <OverlayItems key={i.id} itemId={i.id} itemQuantity={i.quantity} currencySwitcher={this.props.currencySwitcher} />
        })}

        {/* bag footer */}
        <div className='bagFooter'>
        {/* price */}
          <div className='price'>
            <p className='totalPrice'>Total</p>
            <p className='totalPrice'>$200.00</p>
          </div>
          {/* bag buttons */}
          <div className='bag'>
            <button className='bagBtn view'><Link to="/cart">VIEW BAG</Link></button>
            <button className='bagBtn'>CHECK OUT</button>
          </div>
        </div>
      </aside>
    )
  }
}
