import React from 'react';
import ContentLoader from 'react-content-loader';
import { appContext } from '../../App';
import { useLocation } from 'react-router-dom';

import styles from './Card.module.scss';

function Card({ id, title, price, imageUrl, onFavorite, onPlus, loading = false }) {
  const { isItemAdded, isItemFavorite, numberWithSpaces } = React.useContext(appContext);

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
          width={158}
          height={198}
          viewBox='0 0 158 198'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
        >
          <rect x='0' y='120' rx='5' ry='5' width='158' height='15' />
          <rect x='0' y='140' rx='5' ry='5' width='100' height='15' />
          <rect x='0' y='171' rx='10' ry='10' width='60' height='25' />
          <rect x='126' y='166' rx='10' ry='10' width='32' height='32' />
          <rect x='0' y='0' rx='10' ry='10' width='158' height='110' />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                width={32}
                height={32}
                src={
                  isFavoritesPage
                    ? 'img/liked.svg'
                    : isItemFavorite(id)
                    ? 'img/liked.svg'
                    : 'img/unliked.png'
                }
                alt='Unliked'
              />
            </div>
          )}
          <img
            className={styles.photo}
            width={133}
            height={112}
            src={imageUrl}
            alt='Sneakers'
          />
          <h5>{title}</h5>
          <div className={styles.cardBottom}>
            <div className={styles.cardBottom2}>
              <span>Price:</span>
              <b>{numberWithSpaces(price)} ₽</b>
            </div>
            {onPlus && (
              <img
                width={32}
                height={32}
                className={styles.plus}
                onClick={onClickPlus}
                src={isItemAdded(imageUrl) ? 'img/btn-checked.png' : 'img/btn-plus.svg'}
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
