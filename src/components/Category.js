import React, { Component } from 'react'
import './category.css'

export default class category extends Component {
  render() {
    return (
      <main>
        <h2 className='categoryName'>Category Name</h2>


        {/* display initial if that btn is clicked */}
        <div className='overlay' style={{display: 'none'}}></div>
        
        <section>
          <img src='http://res.heraldm.com/phpwas/restmb_idxmake.php?idx=621&simg=/content/image/2021/02/23/20210223000893_0.jpg' alt='sunmi' style={{width: '356px', height: '338px', opacity: '1'}}/>
          <p className='outOfStock' style={{display: 'initial'}}>OUT OF STOCK</p>
          <p style={{opacity: '1'}}>Apollo Running Short</p>
          <p style={{opacity: '1'}} className='categoryPrice'>$50.00</p>
          <button className='cartBtn'>img</button>
        </section>

        <section>
          <img src='http://res.heraldm.com/phpwas/restmb_idxmake.php?idx=621&simg=/content/image/2021/02/23/20210223000893_0.jpg' alt='sunmi' style={{width: '356px', height: '338px', opacity: '1'}}/>
          <p className='outOfStock' style={{display: 'initial'}}>OUT OF STOCK</p>
          <p style={{opacity: '1'}}>Apollo Running Short</p>
          <p style={{opacity: '1'}} className='categoryPrice'>$50.00</p>
        </section>

        <section>
          <img src='http://res.heraldm.com/phpwas/restmb_idxmake.php?idx=621&simg=/content/image/2021/02/23/20210223000893_0.jpg' alt='sunmi' style={{width: '356px', height: '338px', opacity: '1'}}/>
          <p className='outOfStock' style={{display: 'initial'}}>OUT OF STOCK</p>
          <p style={{opacity: '1'}}>Apollo Running Short</p>
          <p style={{opacity: '1'}} className='categoryPrice'>$50.00</p>
        </section>

        <section>
          <img src='http://res.heraldm.com/phpwas/restmb_idxmake.php?idx=621&simg=/content/image/2021/02/23/20210223000893_0.jpg' alt='sunmi' style={{width: '356px', height: '338px', opacity: '1'}}/>
          <p className='outOfStock' style={{display: 'initial'}}>OUT OF STOCK</p>
          <p style={{opacity: '1'}}>Apollo Running Short</p>
          <p style={{opacity: '1'}} className='categoryPrice'>$50.00</p>
        </section>

      </main>
    )
  }
}
