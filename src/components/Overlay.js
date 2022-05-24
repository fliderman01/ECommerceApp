import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OverlayItems from './overlayItems/OverlayItems';
import './overlay.css';


export default class Overlay extends Component {
  render() {
    const infoMap = this.props.cart;
    // items total quantity
    const quantitySum = () => {
      const quantity = infoMap.map(i=>i.quantity);
      return quantity.reduce((a, b) => a + b, 0);
    }
    return (
      <aside style={{display: this.props.showOverlay ? 'initial' : 'none'}}>
        {/* title */}
        <div className='title'>
          <h6>My Bag, <span className='itemNum'>{quantitySum()} items</span></h6>
        </div>
        {/* {console.log(infoMap, 'aaa')} */}

        {/* product description */}
        {infoMap.map((i, index)=>{
          return <OverlayItems
              key={i.id}
              itemId={i.id}
              itemQuantity={i.quantity}
              currencySwitcher={this.props.currencySwitcher}
              changeProductId={this.props.changeProductId}
              toggleOverlay={this.props.toggleOverlay}
              index={index}
              addCart={this.props.addCart}
              decCart={this.props.decCart}
            />
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
            <button onClick={()=>this.props.toggleOverlay()} className='bagBtn view'><Link className='routerLink linkB' id='overlayLink' to="/cart">VIEW BAG</Link></button>
            <button onClick={()=>this.props.emptyCart()} className='bagBtn'>CHECK OUT</button>
          </div>
        </div>
      </aside>
    )
  }
}
