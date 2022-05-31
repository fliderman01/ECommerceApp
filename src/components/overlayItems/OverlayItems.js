import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './overlayItems.css';
import {
    useQuery,
    gql,
  } from '@apollo/client';

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
                    <>
                        <p className='productSize'>{item.name.toUpperCase()}:</p>
                        <ul className='descriptionList'>
                            {
                            item.id === 'Color'
                            ?
                            item.items.map(val=>(
                                <li key={val.id} className='descriptionListColor'><button style={{backgroundColor: val.value}}></button></li>
                                // <li key={val.value}><label className='radioLabel' style={{backgroundColor: val.value}}><input className='colBtn' type='radio' name='color' /></label></li>
                            ))
                            :
                            item.items.map(val=>(
                                <li key={val.id} className='descriptionListSize'><button>{val.displayValue}</button></li>
                                // <li key={val.value}><input className='sizeBtn' type='radio' name='attrChoice' value={val.displayValue} /></li>
                            ))
                            }
                        </ul>
                    </>
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
    />
    }
}

export default OverlayItems