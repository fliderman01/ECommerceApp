import React, { Component, useState } from 'react';
import './category.css';
import shopping from '../icons/shoppWhite.png'
import {
  useQuery,
  gql,
} from '@apollo/client';

export default class category extends Component {
  render(props) {
    
    function CategoryFunct(props) {
      // console.log(props.currencySwitcher, 'currency')

    const PRODUCT_CATEGORIES = gql`
    query GetRates {
      category(input: { title: "${props.categ}" }) {
        name
        products {
          id
          name
          inStock
          gallery
          prices {
            currency {
              symbol
            }
            amount
          }
        }
      }
    }
  `;
  
    const { loading, error, data } = useQuery(PRODUCT_CATEGORIES);
    const [showBtn, setShowBtn] = useState(false);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
      <main>
      <h2 className='categoryName'>{data.category.name}</h2>
      <div className='categoryContainer'>
        {/* display initial if that btn is clicked */}
        <div className='overlay' style={{display: 'none'}}></div>

          {data.category.products.map(({id, name, inStock, gallery, prices})=>(
            <section key={id}>
                <img onMouseOver={()=>setShowBtn(true)} onMouseOut={()=>setShowBtn(false)} src={gallery[0]} alt={name} style={{width: '356px', height: '338px', opacity: inStock ? '1' : '.5', cursor: 'pointer'}}/>
                <p className='outOfStock' style={{display: inStock ? 'none' : 'initial'}}>OUT OF STOCK</p>
                <p style={{opacity: inStock ? '1' : '.5'}} className='categoryTitle'>{name}</p>
                <p style={{opacity: inStock ? '1' : '.5'}} className='categoryPrice'>{prices[props.currencySwitcher].currency.symbol}{prices[props.currencySwitcher].amount}</p>
                <button className='cartBtn' style={{display: showBtn ? 'initial' : 'none'}}><img style={{width: '54px'}} src={shopping} alt='shopping wheel'/></button>
            </section>
             ))}
      </div>

 
      </main>)
  }
  return (
    <>
      <CategoryFunct categ={this.props.categ} currencySwitcher={this.props.currencySwitcher}/>
    </>
    )
  }
}
