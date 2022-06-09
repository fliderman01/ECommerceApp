import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './overlayItems.css';
import {
    useQuery,
    gql,
  } from '@apollo/client';
// import Cart from '../Cart';

export class OverlayItems extends Component {
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
  function OverlayItemsFunct(props) {
    // give attributes check value
    // const checking =(index, attr, attrId)=>{
    //   const thisCart = props.cart.filter(i=>i.id===props.itemId)
    //   const attrs = thisCart[0].attributes[0].map(i=>i.attr);
    //   const attrIds = thisCart[0].attributes[0].filter(i=>i.attrId === attrId);
    //   if (attrIds.length !== 0 && attrIds[0].attr === attr) {
    //     return true
    //   } else if (attrs.some(i=>i !== attr) && index===0){
    //     return true
    //   } else if (attrs.length===0 && index===0){
    //     return true
    //   }
    // }
    const { loading, error, data } = useQuery(PRODUCT_INFO);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {console.log(error.message)}</p>;

    return (
        <div className='productDescript'>
              <div>
                <Link to="/product" className='routerLink linkB'>
                  <p onClick={()=>{props.changeProductId(props.itemId); props.toggleOverlay()}} className='productTitle'>{data.product.name}</p>
                </Link>
                <p className='priceLabel'>{data.product.prices[props.currencySwitcher].currency.symbol}{data.product.prices[props.currencySwitcher].amount}</p>
                
                {data.product.attributes.map(item=>(
                    <div key={item.id}>
                        <p className='productSize'>{item.name}:</p>
                        <ul className='descriptionList'>
                            {
                            item.id === 'Color'
                            ?
                            item.items.map((val, index)=>(
                                // <li key={val.id} className='descriptionListColor'><button style={{backgroundColor: val.value}}></button></li>
                                <li key={index}>
                                  <input
                                    className='radioInpBtn'
                                    type='radio'
                                    name={item.name}
                                    checked={props.checking(index, val.value, item.id, props.itemId)}
                                    readOnly
                                  />
                                  <label
                                    className='radioLabel'
                                    style={{backgroundColor: val.value}}
                                  >7
                                  </label>
                                </li>
                            ))
                            :
                            item.items.map((val, index)=>(
                                // <li key={val.id} className='descriptionListSize'><button>{val.displayValue}</button></li>
                                <li key={index}>
                                  <input
                                    className='radioInpBtn'
                                    type='radio'
                                    name={item.name}
                                    // value={val.displayValue}
                                    checked={props.checking(index, val.value, item.id, props.itemId)}
                                    readOnly
                                  />
                                  <label className='radioSizeLabel'>{val.value}</label>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                    ))}
              </div>

              <div className='amounts'>
                <button className='amountBtn' onClick={()=>props.addCart(props.index)}>+</button>
                <p>{props.itemQuantity}</p>
                <button className='amountBtn' onClick={()=>props.decCart(props.index)}>-</button>
              </div>
              <div>
                <Link to="/product">
                  <img
                    src={data.product.gallery[0]}
                    alt='Item'
                    style={{ height: '190px'}}
                    onClick={()=>props.changeProductId(props.itemId)}
                  />
                </Link>
              </div>
            </div>
    )
}
    return <OverlayItemsFunct
      itemQuantity={this.props.itemQuantity}
      currencySwitcher={this.props.currencySwitcher}
      changeProductId={this.props.changeProductId}
      itemId={this.props.itemId}
      toggleOverlay={this.props.toggleOverlay}
      addCart={this.props.addCart}
      decCart={this.props.decCart}
      index={this.props.index}
      cart={this.props.cart}
      checking={this.props.checking}
    />
    }
}

export default OverlayItems