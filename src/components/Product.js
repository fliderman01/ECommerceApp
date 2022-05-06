import React, { Component } from 'react';
import './Product.css';
import {
  useQuery,
  gql,
} from '@apollo/client';

export default class Product extends Component {
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
  function ProductFunct() {
    const { loading, error, data } = useQuery(PRODUCT_INFO);

    console.log(data, 'dattta')
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return <div className='Product'>
            <div>
              {data.product.gallery.map((pic)=>(
                <img src={pic} alt='sunmi' style={{maxWidth: '79px'}} className='miniPic' />
              ))}
            </div>
            <div>
              <img src={data.product.gallery[0]} alt={data.product.name} style={{maxWidth: '620px'}} />
            </div>
            <div className='productDescription'>
              <p className='descrTitle'>{data.product.name}</p>
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
              <p className='itemPrice'>{data.product.prices[0].currency.symbol}{data.product.prices[0].amount}</p>
              <button className='addBtn'>ADD TO CART</button>
              
              <div className='descripTxt'>{data.product.description.slice(data.product.description.indexOf(">") + 1, data.product.description.lastIndexOf("<"))}</div>
            </div>
          </div>
  }
  return (
    <>
      <ProductFunct />
    </>
    )
  }
}
