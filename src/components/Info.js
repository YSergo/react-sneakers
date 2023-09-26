import React from 'react';

function Info({ image, title, description, func, style }) {
  return (
    <>
      <div className='cartEmpty'>
        <img className='mb-20' width='120px' src={image} alt='Empty' style={style} />
        <h2 className='infoTitle'>{title}</h2>
        <p>{description}</p>
        <button onClick={func} className='greenButton'>
          <img src='img/arrow.svg' alt='Arrow' />
          Go back
        </button>
      </div>
    </>
  );
}

export default Info;
