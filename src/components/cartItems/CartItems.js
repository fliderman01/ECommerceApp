import React, { Component, useState } from 'react';
import './cartItems.css';
import {
    useQuery,
    gql,
  } from '@apollo/client';

export class CartItems extends Component {
  render() {
    const PRODUCT_INFO = gql`
    query GetRates {
      product(id: "ps-5"){
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
  function ProductItemsFunct() {
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
          <h3>{data.product.name}</h3>
          {/* add currencySwitcher here */}
          <p className='cartPrice'>{data.product.prices[0].currency.symbol}{data.product.prices[0].amount}</p>



          {data.product.attributes.map(item=>(
              <>
                  <p className='sizeCol'>{item.name.toUpperCase()}:</p>
                  <ul>
                    {
                      item.id === 'Color'
                      ?
                      item.items.map(val=>(
                        // <li><button className='colBtn' style={{backgroundColor: val.value}}></button></li>
                        <li key={val.value}><label className='radioLabel' style={{backgroundColor: val.value}}><input className='colBtn' type='radio' name='color' /></label></li>
                      ))
                      :
                      item.items.map(val=>(
                        // <li><button className='sizeBtn'>{val.displayValue}</button></li>
                        <li key={val.value}><input className='sizeBtn' type='radio' name='attrChoice' value={val.displayValue} /></li>
                      ))
                    }
                  </ul>
              </>
              ))}
        </div>

        <div className='btnImg'>
          <div className='amountBtns'>
            <button className='cartAmountBtn'>+</button>
            <p className='cartAmount'>1</p>
            <button className='cartAmountBtn'>-</button>
          </div>
          <div>
            <img src={data.product.gallery[carousel]} alt='Item' style={{width: '200px'}} />
            <div className='backFowBtns'>
              <button className='backFowBtn' onClick={()=>decCarousel()}>{'<'}</button>
              <button className='backFowBtn' onClick={()=>incCarousel()}>{'>'}</button>
            </div>
          </div>
        </div>

      </div>
    )
}
    return <ProductItemsFunct />
    
  }
}

export default CartItems