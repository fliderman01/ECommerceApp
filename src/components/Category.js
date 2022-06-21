import React, { Component } from 'react';
import './category.css';
import { Link } from 'react-router-dom';
import shopping from '../icons/shoppWhite.png'
import {
  useQuery,
  gql,
} from '@apollo/client';

export default class category extends Component {
  render() {
    function CategoryFunct(props) {
      // console.log(props.currencySwitcher, 'currency')
      // const [cartData, setCartData] = useState([]);

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
      <main>
      <h2 className='categoryName'>{data.category.name}</h2>
      <div className='categoryContainer'>
          {data.category.products.map(({id, name, inStock, gallery, prices})=>(
            <section key={id}>
                <Link className='routerLink linkB' to={inStock ? `/product/${id}` : "/"}>
                  <img
                    src={gallery[0]} alt={name}
                    // opacity here causes white border in overlay
                    style={{width: '356px', height: '338px', opacity: inStock ? '1' : '.5', cursor: 'pointer'}}
                    onClick={()=>props.changeProductId(id)}
                  />
                </Link>
                  <p className='outOfStock' style={{display: inStock ? 'none' : 'initial'}}>OUT OF STOCK</p>
                <Link className='routerLink linkB' to={inStock ? `/product/${id}` : "/"}>
                  <p onClick={()=>props.changeProductId(id)} style={{opacity: inStock ? '1' : '.5'}} className='categoryTitle'>{name}</p>
                </Link>
                <p style={{opacity: inStock ? '1' : '.5'}} className='categoryPrice'>{prices[props.currencySwitcher].currency.symbol}{prices[props.currencySwitcher].amount}</p>
                    <img
                      style={{width: '54px', display: !inStock && 'none'}}
                      src={shopping}
                      alt='shopping wheel'
                      onClick={()=>props.changeCart(id, 1, prices[props.currencySwitcher].amount, [])}
                      className='cartBtn'
                    />
            </section>
             ))}
      </div>

 
      </main>)
  }
  return (
    <>
      <CategoryFunct
        categ={this.props.categ}
        currencySwitcher={this.props.currencySwitcher}
        sendCartData={this.props.sendCartData}
        changeProductId={this.props.changeProductId}
        // showOverlay={this.props.showOverlay}
        changeCart={this.props.changeCart}
      />
    </>
    )
  }
}
