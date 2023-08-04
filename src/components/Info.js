import { appContext } from '../App';
import React from 'react';

function Info({ image, title, description }) {
  const { setCartOpened } = React.useContext(appContext);

  return (
    <>
      <div className='cartEmpty'>
        <img
          className='mb-20'
          width='120px'
          src={image}
          alt='Empty'
        />
        <h2>{title}</h2>
        <p className='opacity-6'>{description}</p>
        <button onClick={() => setCartOpened(false)} className='greenButton'>
          <img src='/img/arrow.svg' alt='Arrow' />
          Вернуться назад
        </button>
      </div>
    </>
  );
}

export default Info;
