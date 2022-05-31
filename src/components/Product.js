import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
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
      product(id: "${this.props.productId}"){
        id
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
  function ProductFunct({currencySwitcher, changeCart}) {
    const { loading, error, data } = useQuery(PRODUCT_INFO);
    // const [attr, setAttr] = useState({})
    const [opts, setOpts] = useState([])
    // console.log(opts, 'optInfo')
    const [mainPic, setMainPic] = useState('');
    // const [cartData, setCartData] = useState([]);

    const addOpts = (attr, attrId) => {
      if (opts.filter((i)=> attr !== i.attr)) {setOpts([...opts, {attr:attr, attrId:attrId}]);}
      // if (opts.filter((i)=> attrId === i.attrId)) {setOpts([opts.map(i=>i.attrId===attrId ? {...i, attr:attr} : i)]);}
    }
    console.log(opts, 'muskulebi')
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {console.log(error.message)}</p>;
    

    return <div className='Product'>
            <div className='miniContainer'>
              {data.product.gallery.map((pic)=>(
                <img key={pic} src={pic} alt='product visual' style={{maxWidth: '79px'}} className='miniPic' onMouseMove={()=>setMainPic(pic)} />
              ))}
            </div>
            <div className='mainPic'>
              <img src={mainPic ? mainPic : data.product.gallery[0]} alt={data.product.name} style={{maxWidth: '620px'}} />
            </div>
            <div className='productDescription'>
              <p className='descrTitle'>{data.product.name}</p>
              {data.product.attributes.map(item=>(
                <div className='productDescription' key={item.name}>
                  <p className='colSize'>{item.name.toUpperCase()}:</p>
                  <ul>
                    {
                      item.id === 'Color'
                      ?
                      item.items.map(val=>(
                        // <li><button className='colBtn' style={{backgroundColor: val.value}}></button></li>
                        <li key={val.value}>
                          <label className='radioLabel' style={{backgroundColor: val.value}}>
                            <input onChange={()=>addOpts(val.value, item.id)} className='colBtn' type='radio' name='color' />4
                          </label>
                        </li>
                      ))
                      :
                      item.items.map((val)=>(
                        // <li><button className='sizeBtn'>{val.displayValue}</button></li>
                        <li key={val.value}>
                          <label className='productLabel'>
                            <input
                                className='colBtn'
                                type='radio'
                                name='attrChoice'
                                onChange={()=>addOpts(val.value, item.id)}
                            />
                            {val.displayValue}
                          </label>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              ))}
              <p className='priceSize'>PRICE:</p>
              <p className='itemPrice'>{data.product.prices[currencySwitcher].currency.symbol}{data.product.prices[currencySwitcher].amount}</p>
              <button className='addBtn'
              onClick={()=>{
                changeCart(data.product.id, 1, data.product.prices[currencySwitcher].amount)
              }}
              >
                <Link className='routerLink' id='addLink' to="/">
                  ADD TO CART
                </Link>
              </button>
              
              <div className='descripTxt'>
                <div dangerouslySetInnerHTML={{__html: data.product.description}} />
              </div>
            </div>
          </div>
  }
  return (
    <>
      <ProductFunct
        currencySwitcher={this.props.currencySwitcher}
        changeCart={this.props.changeCart}
      />
    </>
    )
  }
}
