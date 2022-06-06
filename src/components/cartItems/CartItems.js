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
            <Link
                onClick={()=>props.changeProductId(props.itemId)}
                className='routerLink CartItemsLink linkB'
                to="/product"
                >
                <p className='CartItemsTitle'>
                  {data.product.name}
                </p>
              </Link>
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
                      item.items.map((val, index)=>(
                        // <li><button className='colBtn' style={{backgroundColor: val.value}}></button></li>
                        <li key={val.id}>
                            <input
                              className='radioInpBtn'
                              type='radio'
                              name={item.name}
                              checked={props.checking(index, val.value, item.id, props.itemId)}
                            />
                          <label className='colLabel' style={{backgroundColor: val.value}}>
                          4
                          </label>
                        </li>
                      ))
                      :
                      item.items.map((val, index)=>(
                        // <li><button className='sizeBtn'>{val.displayValue}</button></li>
                        <li key={val.id}>
                            <input
                              className='radioInpBtn'
                              type='radio'
                              name={item.name}
                              // checked={props.checking(index, val.value, item.id, props.itemId)}
                              checked={props.checking(index, props.attr, props.attrId, props.itemId)}
                              />
                          <label className='sizeLabel'>
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
            <button className='cartAmountBtn' onClick={()=>props.addCart(props.index)}>+</button>
            <p className='cartAmount'>{props.itemQuantity}</p>
            <button className='cartAmountBtn' onClick={()=>props.decCart(props.index)}>-</button>
          </div>
          <div className='imgBtns'>
            <Link to="/product">
              <img 
                src={data.product.gallery[carousel]} 
                alt='Item'
                style={{width: '200px'}}
                onClick={()=>props.changeProductId(props.itemId)}
              />
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
      itemId={this.props.itemId}
      changeProductId={this.props.changeProductId}
      addCart={this.props.addCart}
      decCart={this.props.decCart}
      index={this.props.index}
      checking={this.props.checking}
      attrId={this.props.attrId}
      attr={this.props.attr}
    />
  }
}


export default CartItems