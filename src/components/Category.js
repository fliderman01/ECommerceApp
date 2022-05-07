import React, { Component } from 'react';
import './category.css';
import {
  useQuery,
  gql,
} from '@apollo/client';

export default class category extends Component {
  render() {
    const PRODUCT_CATEGORIES = gql`
    query GetRates {
      category{
        name
        products{
          id
          name
          inStock
          gallery
          prices{
            currency{
              symbol
            }
            amount
          }
        }
      }
    }
  `;
  function CategoryFunct() {
    const { loading, error, data } = useQuery(PRODUCT_CATEGORIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
      <main>
      <h2 className='categoryName'>{data.category.name}</h2>
      <div className='categoryContainer'>
        {/* display initial if that btn is clicked */}
        <div className='overlay' style={{display: 'none'}}></div>

          {data.category.products.map(({id, name, inStock, gallery, prices})=>(
            <section>
              <img src={gallery[0]} alt={name} style={{width: '356px', height: '338px', opacity: inStock ? '1' : '.5', cursor: 'pointer'}}/>
                <p className='outOfStock' style={{display: inStock ? 'none' : 'initial'}}>OUT OF STOCK</p>
                <p style={{opacity: inStock ? '1' : '.5'}} className='categoryTitle'>{name}</p>
                <p style={{opacity: inStock ? '1' : '.5'}} className='categoryPrice'>{prices[0].currency.symbol}{prices[0].amount}</p>
                <button className='cartBtn'>img</button>
            </section>
             ))}
      </div>

 
      </main>)
  }
  return (
    <>
      <CategoryFunct />
    </>
    )
  }
}
