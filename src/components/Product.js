import React, { Component, useState } from 'react';
import './Product.css';
import {
  useQuery,
  gql,
} from '@apollo/client';

export default class Product extends Component {
  render() {
    // "huarache-x-stussy-le", "jacket-canada-goosee", "ps-5", "xbox-series-s", "apple-imac-2021", "apple-iphone-12-pro", "apple-airpods-pro", "apple-airtag"
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
    const [mainPic, setMainPic] = useState('');

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {console.log(error.message)}</p>;

    return <div className='Product'>
            <div className='miniContainer'>
              {data.product.gallery.map((pic)=>(
                <img src={pic} alt='product visual' style={{maxWidth: '79px'}} className='miniPic' onMouseMove={()=>setMainPic(pic)} />
              ))}
            </div>
            <div>
              <img src={mainPic ? mainPic : data.product.gallery[0]} alt={data.product.name} style={{maxWidth: '620px'}} />
            </div>
            <div className='productDescription'>
              <p className='descrTitle'>{data.product.name}</p>
              {data.product.attributes.map(item=>(
                <>
                  <p className='colSize'>{item.name.toUpperCase()}:</p>
                  <ul>
                    {
                      item.id === 'Color'
                      ?
                      item.items.map(val=>(
                        <li><button className='colBtn' style={{backgroundColor: val.value}}></button></li>
                      ))
                      :
                      item.items.map(val=>(
                        <li><button className='sizeBtn'>{val.displayValue}</button></li>
                      ))
                    }
                  </ul>
                </>
              ))}
              <p className='priceSize'>PRICE:</p>
              <p className='itemPrice'>{data.product.prices[0].currency.symbol}{data.product.prices[0].amount}</p>
              <button className='addBtn'>ADD TO CART</button>
              
              <div className='descripTxt'>
                <div dangerouslySetInnerHTML={{__html: data.product.description}} />
              </div>
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
