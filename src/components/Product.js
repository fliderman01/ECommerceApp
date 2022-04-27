import React, { Component } from 'react'
import './Product.css'

export default class Product extends Component {
  render() {
    return (
      <div className='Product'>
        <div>
          <img src='https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/gkey2vldwagpgw8c_1595909368.jpeg?tr=w-1200,h-900' alt='sunmi sleeps' style={{width: '79px', height: '80px'}} className='miniPic' />
          <img src='https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/gkey2vldwagpgw8c_1595909368.jpeg?tr=w-1200,h-900' alt='sunmi sleeps' style={{width: '79px', height: '80px'}} className='miniPic' />
          <img src='https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/gkey2vldwagpgw8c_1595909368.jpeg?tr=w-1200,h-900' alt='sunmi sleeps' style={{width: '79px', height: '80px'}} className='miniPic' />
        </div>
        <div>
          <img src='https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/gkey2vldwagpgw8c_1595909368.jpeg?tr=w-1200,h-900' alt='sunmi sleeps' style={{width: '620px', height: '511px'}} />
        </div>
        <div className='productDescription'>
          <p className='descrTitle'>Apllo Running Short</p>
          <p className='colSize'>SIZE:</p>
          <ul>
            <li><button className='sizeBtn'>XS</button></li>
            <li><button className='sizeBtn'>S</button></li>
            <li><button className='sizeBtn'>M</button></li>
            <li><button className='sizeBtn'>L</button></li>
          </ul>
          <p className='colSize'>COLOR:</p>
          <ul>
            <li><button className='colBtn' style={{backgroundColor: 'orange'}}></button></li>
            <li><button className='colBtn' style={{backgroundColor: 'orange'}}></button></li>
            <li><button className='colBtn' style={{backgroundColor: 'orange'}}></button></li>
          </ul>
          <p className='colSize'>PRICE:</p>
          <p className='itemPrice'>$50.00</p>
          <button className='addBtn'>ADD TO CART</button>
          <p className='descripTxt'>Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.</p>
        </div>
      </div>
    )
  }
}
