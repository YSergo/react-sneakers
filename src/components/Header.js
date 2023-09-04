import React from 'react';
import { Link } from 'react-router-dom';
import { appContext } from '../App';

function Header(props) {
  const { cartItems, numberWithSpaces } = React.useContext(appContext);
  const totalPrice = cartItems.reduce((sum, obj) => sum + obj.price, 0);

  return (
    <header>
      <Link to='/'>
        <div className='headerLeft'>
          <img width={40} height={40} src='/img/logo.png' alt='logo' />
          <div>
            <h3>React Sneakers</h3>
            <p>Best Sneakers Store</p>
          </div>
        </div>
      </Link>
      <ul className='headerRight'>
        <li className='cartIconPrice' onClick={props.onClickCart}>
          <svg width='24' height='24' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M7.54548 18.1818C7.99735 18.1818 8.36366 17.8155 8.36366 17.3636C8.36366 16.9117 7.99735 16.5454 7.54548 16.5454C7.09361 16.5454 6.72729 16.9117 6.72729 17.3636C6.72729 17.8155 7.09361 18.1818 7.54548 18.1818Z'
              stroke='#9B9B9B'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M16.5455 18.1818C16.9973 18.1818 17.3637 17.8155 17.3637 17.3636C17.3637 16.9117 16.9973 16.5454 16.5455 16.5454C16.0936 16.5454 15.7273 16.9117 15.7273 17.3636C15.7273 17.8155 16.0936 18.1818 16.5455 18.1818Z'
              stroke='#9B9B9B'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M1 1H4.27273L6.46545 11.9555C6.54027 12.3321 6.7452 12.6705 7.04436 12.9113C7.34351 13.1522 7.71784 13.2801 8.10182 13.2727H16.0545C16.4385 13.2801 16.8129 13.1522 17.112 12.9113C17.4112 12.6705 17.6161 12.3321 17.6909 11.9555L19 5.09091H5.09091'
              stroke='#9B9B9B'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span>{numberWithSpaces(totalPrice)} ₽</span>
        </li>
        <li className='likeIcon'>
          <Link to='/favorites'>
            <img width={24} height={24} src='/img/heart.svg' alt='Favorites' />
          </Link>
        </li>
        <Link to='/orders'>
          <li className='userIcon'>
            <img width={24} height={24} src='/img/user.svg' alt='Orders' />
          </li>
        </Link>
      </ul>
    </header>
  );
}

export default Header;
