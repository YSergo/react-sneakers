import { appContext } from '../App';
import React from 'react';


function Info({picture, title, description}) {
  
  const { setCartOpened } = React.useContext(appContext);
  
  return (
    <>
      <div className='cartEmpty d-flex align-center justify-center flex-column flex'>
        {picture}
        <h2>{title}</h2>
        <p className='opacity-6'>
          {description}
        </p>
        <button onClick={() => setCartOpened(false)} className='greenButton'>
          <img src='/img/arrow.svg' alt='Arrow' />
          Вернуться назад
        </button>
      </div>
    </>
  );
}

export default Info;
