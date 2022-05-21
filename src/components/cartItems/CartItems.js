import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import './cartItems.css';
import {
    useQuery,
    gql,
  } from '@apollo/client';

export class CartItems extends Component {
  render() {
    const PRODUCT_INFO = gql`
    query GetRates {
      product(id: "${this.props.itemId}"){
        name
        gallery
        description
        category
        attributes{
          id
          name
          type
          items{
            displayValue
            value
            id
          }
        }
        prices{
          currency{
            symbol
          }
          amount
        }
      }
    }
  `;
  function ProductItemsFunct(props) {
    const { loading, error, data } = useQuery(PRODUCT_INFO);
    const [carousel, setCarousel] = useState(0);

    // carousel for images
    const incCarousel = () => {
        carousel < data.product.gallery.length && setCarousel(carousel+1);
        carousel === (data.product.gallery.length-1) && setCarousel(0)
    }
    const decCarousel = () => {
        setCarousel(carousel-1);
        carousel === 0 && setCarousel(data.product.gallery.length-1)
    }
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {console.log(error.message)}</p>;

    return (
        <div className='cartProduct'>

        <div>
          <h3><Link className='routerLink CartItemsLink linkB' to="/product">{data.product.name}</Link></h3>
          {/* add currencySwitcher here */}
          <p className='cartPrice'>
            {data.product.prices[props.currencySwitcher].currency.symbol}
            {data.product.prices[props.currencySwitcher].amount}
          </p>



          {data.product.attributes.map(item=>(
              <>
                  <p className='sizeCol'>{item.name.toUpperCase()}:</p>
                  <ul>
                    {
                      item.id === 'Color'
                      ?
                      item.items.map(val=>(
                        // <li><button className='colBtn' style={{backgroundColor: val.value}}></button></li>
                        <li key={val.id}>
                          <label className='colLabel' style={{backgroundColor: val.value}}>
                            <input className='radioInpBtn' type='radio' name='color' />
                            4
                          </label>
                        </li>
                      ))
                      :
                      item.items.map(val=>(
                        // <li><button className='sizeBtn'>{val.displayValue}</button></li>
                        <li key={val.id}>
                          <label className='sizeLabel'>
                            <input className='radioInpBtn' type='radio' name='attrChoice'/>
                            {val.displayValue}
                          </label>
                        </li>
                      ))
                    }
                  </ul>
              </>
              ))}
        </div>

        <div className='btnImg'>
          <div className='amountBtns'>
            <button className='cartAmountBtn'>+</button>
            <p className='cartAmount'>{props.itemQuantity}</p>
            <button className='cartAmountBtn'>-</button>
          </div>
          <div className='imgBtns'>
            <Link to="/product">
              <img src={data.product.gallery[carousel]} alt='Item' style={{width: '200px'}} />
            </Link>
            <div className='backFowBtns'>
              <button className='backFowBtn' onClick={()=>decCarousel()}>{'<'}</button>
              <button className='backFowBtn' onClick={()=>incCarousel()}>{'>'}</button>
            </div>
          </div>
        </div>

      </div>
    )
}
    return <ProductItemsFunct
      itemQuantity={this.props.itemQuantity}
      currencySwitcher={this.props.currencySwitcher}
    />
  }
}


export default CartItems