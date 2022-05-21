import React, { Component } from 'react';
import './NoPage.css';

export class NoPage extends Component {
  render() {
    return (
      <div className='notFoundDiv'>
          <h2 className='title404'>404</h2>
          <h4 className='txt404'>OOPS! PAGE NOT FOUND</h4>
      </div>
    )
  }
}

export default NoPage