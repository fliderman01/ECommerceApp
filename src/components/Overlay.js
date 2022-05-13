import React, { Component } from 'react';
import OverlayItems from './overlayItems/OverlayItems';
import './overlay.css';

export default class Overlay extends Component {
  render() {
    return (
      <aside style={{display: 'none'}}>
        {/* title */}
        <div className='title'>
          <h6>My Bag, <span className='itemNum'>3 items</span></h6>
        </div>

        {/* product description */}
        <OverlayItems />
        <OverlayItems />
        <OverlayItems />
        <OverlayItems />

        {/* bag footer */}
        <div className='bagFooter'>
        {/* price */}
          <div className='price'>
            <p className='totalPrice'>Total</p>
            <p className='totalPrice'>$200.00</p>
          </div>
          {/* bag buttons */}
          <div className='bag'>
            <button className='bagBtn view'>VIEW BAG</button>
            <button className='bagBtn'>CHECK OUT</button>
          </div>
        </div>
      </aside>
    )
  }
}
