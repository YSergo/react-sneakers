import React from 'react';
import styles from './Card.module.scss';

function Card({
  id,
  title,
  price,
  imageUrl,
  onFavorite,
  onPlus,
  favorited = false,
  added = false
}) {
  const [isAdded, setIsAdded] = React.useState(added);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  //false goes in isAdded, setIsAdded - f, analog render() mb & afaik

  const onClickPlus = () => {
    onPlus({ id, title, price, imageUrl });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, price, imageUrl });
    setIsFavorite(!isFavorite);
  };
  //with click changing value of isAdded (here we are inversing)

  React.useEffect(() => {
    console.log('useEffect demonstration');
  }, [isAdded]); //Demonstration of using hook useEffect();

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img
          src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'}
          alt='Unliked'
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt='Sneakers' />
      <h5>{title}</h5>
      <div className='cardBottom'>
        <div className='cardBottom2'>
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
          alt='Add'
        />
      </div>
    </div>
  );
}

export default Card;
