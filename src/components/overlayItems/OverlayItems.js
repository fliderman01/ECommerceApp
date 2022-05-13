import React, { Component } from 'react';
import './overlayItems.css';
import {
    useQuery,
    gql,
  } from '@apollo/client';

export class OverlayItems extends Component {
  render() {
    const PRODUCT_INFO = gql`
    query GetRates {
      product(id: "apple-imac-2021"){
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
  function OverlayItemsFunct() {
    const { loading, error, data } = useQuery(PRODUCT_INFO);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {console.log(error.message)}</p>;

    return (
        <div className='productDescript'>
              <div>
                <p className='productTitle'>{data.product.name}</p>
                <p className='priceLabel'>{data.product.prices[0].currency.symbol}{data.product.prices[0].amount}</p>

                {data.product.attributes.map(item=>(
                    <>
                        <p className='productSize'>{item.name.toUpperCase()}:</p>
                        <ul className='descriptionList'>
                            {
                            item.id === 'Color'
                            ?
                            item.items.map(val=>(
                                <li className='descriptionListColor'><button style={{backgroundColor: val.value}}></button></li>
                                // <li key={val.value}><label className='radioLabel' style={{backgroundColor: val.value}}><input className='colBtn' type='radio' name='color' /></label></li>
                            ))
                            :
                            item.items.map(val=>(
                                <li className='descriptionListSize'><button>{val.displayValue}</button></li>
                                // <li key={val.value}><input className='sizeBtn' type='radio' name='attrChoice' value={val.displayValue} /></li>
                            ))
                            }
                        </ul>
                    </>
                    ))}
              </div>


              <div className='amounts'>
                <button className='amountBtn'>+</button>
                <p>1</p>
                <button className='amountBtn'>-</button>
              </div>
              <div>
                <img src={data.product.gallery[0]} alt='Item' style={{ height: '190px'}} />
              </div>
            </div>
    )
}
    return <OverlayItemsFunct />
    }
}

export default OverlayItems