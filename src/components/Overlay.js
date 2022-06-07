import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OverlayItems from './overlayItems/OverlayItems';
import './overlay.css';


export default class Overlay extends Component {
  render() {

    return (
      <aside
        // style={{display: this.props.showOverlay ? 'initial' : 'none'}}
        // onClick={()=>this.props.showThisOverlay()}
      >
        {/* title */}
        <div className='title'>
          <h6>My Bag, <span className='itemNum'>{this.props.quantitySum()} items</span></h6>
        </div>

        {/* product description */}
        {this.props.cart.map((i, index)=>(
          <OverlayItems
              key={index}
              itemId={i.id}
              itemQuantity={i.quantity}
              currencySwitcher={this.props.currencySwitcher}
              changeProductId={this.props.changeProductId}
              toggleOverlay={this.props.toggleOverlay}
              index={index}
              addCart={this.props.addCart}
              decCart={this.props.decCart}
              cart={this.props.cart}
              checking={this.props.checking}
            />
          )
        )}

        {/* bag footer */}
        <div className='bagFooter'>
        {/* price */}
          <div className='price'>
            <p className='totalPrice'>Total</p>
            <p className='totalPrice'>${this.props.sum.reduce((a, b) => a + b, 0).toFixed(2)}</p>
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
