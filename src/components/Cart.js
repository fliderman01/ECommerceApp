import React, { Component } from 'react';
import './Cart.css';

export default class Cart extends Component {
  render() {
    return (
      <div className='cart'>
        <h2>CART</h2>

        <div className='cartProduct'>

          <div>
            <h3>Apollo Running Shirt</h3>
            <p className='cartPrice'>$50.00</p>
            <p className='sizeCol'>SIZE:</p>
            <ul>
              <li><button className='cartSizeBtn'>XS</button></li>
              <li><button className='cartSizeBtn'>S</button></li>
              <li><button className='cartSizeBtn'>M</button></li>
              <li><button className='cartSizeBtn'>L</button></li>
            </ul>
            <p className='sizeCol'>COLOR:</p>
            <ul>
              <li><button className='cartColBtn' style={{backgroundColor: 'purple'}}></button></li>
              <li><button className='cartColBtn' style={{backgroundColor: 'purple'}}></button></li>
              <li><button className='cartColBtn' style={{backgroundColor: 'purple'}}></button></li>
            </ul>
          </div>

          <div className='btnImg'>
            <div className='amountBtns'>
              <button className='cartAmountBtn'>+</button>
              <p className='cartAmount'>1</p>
              <button className='cartAmountBtn'>-</button>
            </div>
            <div>
              <img src='https://media.vogue.co.uk/photos/5efb4a13100363e612305b06/2:3/w_2560%2Cc_limit/GettyImages-1157931625.jpg' alt='sunmi' style={{width: '200px', height: '288px'}} />
              <div className='backFowBtns'>
                <button className='backFowBtn'>{'<'}</button>
                <button className='backFowBtn'>{'>'}</button>
              </div>
            </div>
          </div>

        </div>

        <div className='cartProduct'>

<div>
  <h3>Jupiter Wayfarer</h3>
  <p className='cartPrice'>$50.00</p>
  <p className='sizeCol'>SIZE:</p>
  <ul>
    <li><button className='cartSizeBtn'>XS</button></li>
    <li><button className='cartSizeBtn'>S</button></li>
    <li><button className='cartSizeBtn'>M</button></li>
    <li><button className='cartSizeBtn'>L</button></li>
  </ul>
  <p className='sizeCol'>COLOR:</p>
  <ul>
    <li><button className='cartColBtn' style={{backgroundColor: 'purple'}}></button></li>
    <li><button className='cartColBtn' style={{backgroundColor: 'purple'}}></button></li>
    <li><button className='cartColBtn' style={{backgroundColor: 'purple'}}></button></li>
  </ul>
</div>

<div className='btnImg'>
  <div className='amountBtns'>
    <button className='cartAmountBtn'>+</button>
    <p className='cartAmount'>1</p>
    <button className='cartAmountBtn'>-</button>
  </div>
  <div>
    <img src='https://media.vogue.co.uk/photos/5efb4a13100363e612305b06/2:3/w_2560%2Cc_limit/GettyImages-1157931625.jpg' alt='sunmi' style={{width: '200px', height: '288px'}} />
    <div className='backFowBtns'>
      <button className='backFowBtn'>{'<'}</button>
      <button className='backFowBtn'>{'>'}</button>
    </div>
  </div>
</div>

</div>

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
