import React from 'react';
import ContentLoader from 'react-content-loader';
import { appContext } from '../../App';
import { useLocation } from 'react-router-dom';

import styles from './Card.module.scss';

function Card({ id, title, price, imageUrl, onFavorite, onPlus, loading = false }) {
  const { isItemAdded, isItemFavorite } = React.useContext(appContext);

  const onClickPlus = () => {
    onPlus({ id, parentId: id, title, price, imageUrl });
  };

  const onClickFavorite = () => {
    onFavorite({ id, parentId: id, title, price, imageUrl });
  };

  const location = useLocation();
  const isFavoritesPage = location.pathname === '/favorites';

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={187}
          viewBox='0 0 150 187'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
        >
          <rect x='0' y='107' rx='5' ry='5' width='150' height='15' />
          <rect x='0' y='127' rx='5' ry='5' width='100' height='15' />
          <rect x='0' y='156' rx='10' ry='10' width='80' height='25' />
          <rect x='114' y='152' rx='10' ry='10' width='32' height='32' />
          <rect x='0' y='0' rx='10' ry='10' width='150' height='90' />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                src={
                  isFavoritesPage
                    ? '/img/liked.svg'
                    : isItemFavorite(id)
                    ? '/img/liked.svg'
                    : '/img/unliked.svg'
                }
                alt='Unliked'
              />
            </div>
          )}
          <img width={133} height={112} src={imageUrl} alt='Sneakers' />
          <h5>{title}</h5>
          <div className='cardBottom'>
            <div className='cardBottom2'>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
                alt='Add'
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
