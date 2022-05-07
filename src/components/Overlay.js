import React, { Component } from 'react';
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
        <div className='productDescript'>
          <div>
            <p className='productTitle'>Apollo Running Short</p>
            <p className='priceLabel'>$50.00</p>
            <p className='productSize'>Size:</p>
            <ul className='descriptionList size'>
              <li><button>XS</button></li>
              <li><button>S</button></li>
              <li><button>L</button></li>
              <li><button>M</button></li>
            </ul>
            <p className='productColor'>Color:</p>
            <ul className='descriptionList color'>
              {/* if selected then borderRadius: 1px solid green */}
              <li><button style={{backgroundColor: 'green'}} ></button></li>
              <li><button style={{backgroundColor: 'orange'}}></button></li>
              <li><button style={{backgroundColor: 'purple'}} ></button></li>
            </ul>
          </div>
          <div className='amounts'>
            <button className='amountBtn'>+</button>
            <p>1</p>
            <button className='amountBtn'>-</button>
          </div>
          <div>
            <img src='https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSCFNpHjXLKSgGeHHGBQ33-UDlU6yN4PMM4DgjR9KMlk3ZOdHYe' style={{width: '121px', height: '190px'}} alt='beauty queen' />
          </div>
        </div>

        {/* delete after map */}
        <div className='productDescript'>
          <div>
            <p className='productTitle'>Jupiter Wayfarer</p>
            <p className='priceLabel'>$50.00</p>
            <p className='productSize'>Size:</p>
            <ul className='descriptionList size'>
              <li><button>XS</button></li>
              <li><button>S</button></li>
              <li><button>L</button></li>
              <li><button>M</button></li>
            </ul>
            <p className='productColor'>Color:</p>
            <ul className='descriptionList color'>
              <li><button style={{backgroundColor: 'green'}} ></button></li>
              <li><button style={{backgroundColor: 'orange'}}></button></li>
              <li><button style={{backgroundColor: 'purple'}} ></button></li>
            </ul>
          </div>
          <div className='amounts'>
            <button className='amountBtn'>+</button>
            <p>1</p>
            <button className='amountBtn'>-</button>
          </div>
          <div>
            <img src='https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSCFNpHjXLKSgGeHHGBQ33-UDlU6yN4PMM4DgjR9KMlk3ZOdHYe' style={{width: '121px', height: '190px'}} alt='beauty queen' />
          </div>
        </div>
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
      </aside>
    )
  }
}
