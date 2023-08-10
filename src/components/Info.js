import React from 'react';

function Info({ image, title, description, func }) {
  return (
    <>
      <div className='cartEmpty'>
        <img className='mb-20' width='120px' src={image} alt='Empty' />
        <h2>{title}</h2>
        <p className='opacity-6'>{description}</p>
        <button onClick={func} className='greenButton'>
          <img src='/img/arrow.svg' alt='Arrow' />
          Вернуться назад
        </button>
      </div>
    </>
  );
}

export default Info;
