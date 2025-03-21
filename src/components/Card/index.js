import React from 'react';
import ContentLoader from 'react-content-loader';
import { appContext } from '../../App';
import { useLocation } from 'react-router-dom';

import styles from './Card.module.scss';

function Card({
  id,
  title,
  price,
  imageUrl,
  onFavorite,
  onPlus,
  loading = false,
  onClick,
  disableCardHover,
}) {
  const { isItemAdded, isItemFavorite, numberWithSpaces, isMobile } = React.useContext(appContext);

  const onClickPlus = () => {
    onPlus({ id, parentId: id, title, price, imageUrl });
  };

  const onClickFavorite = () => {
    onFavorite({ id, parentId: id, title, price, imageUrl });
  };

  const location = useLocation();
  const isFavoritesPage = location.pathname === '/favorites';

  return (
    <div
      className={disableCardHover || isMobile ? `${styles.card} ${styles.noHoverEffect}` : styles.card}
      onClick={onClick}
    >
      {loading ? (
        isMobile ? (
          <ContentLoader
            speed={2}
            width='100%'
            height='auto'
            viewBox='0 0 158 210'
            backgroundColor='#f3f3f3'
            foregroundColor='#ecebeb'
          >
            <rect x='0' y='120' rx='5' ry='5' width='158' height='15' />
            <rect x='0' y='140' rx='5' ry='5' width='100' height='15' />
            <rect x='0' y='175' rx='10' ry='10' width='60' height='32' />
            <rect x='118' y='168' rx='10' ry='10' width='40' height='40' />
            <rect x='0' y='0' rx='10' ry='10' width='158' height='110' />
          </ContentLoader>
        ) : (
          <ContentLoader
            speed={2}
            width={'100%'}
            height={'auto'}
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
        )
      ) : (
        <>
          {onFavorite && (
            <div
              className={`${styles.favorite} ${isFavoritesPage ? styles.favoriteDisabled : isItemFavorite(id) ? styles.favoriteDisabled : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onClickFavorite();
              }}
            >
              <img
                width={32}
                height={32}
                src={
                  isFavoritesPage
                    ? '/react-sneakers/img/liked.svg'
                    : isItemFavorite(id)
                    ? '/react-sneakers/img/liked.svg'
                    : '/react-sneakers/img/unliked.png'
                }
                alt='Unliked'
              />
            </div>
          )}
          <img className={styles.photo} width={133} height={112} src={imageUrl} alt='Sneakers' />
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
                className={`${styles.plus} ${isItemAdded(imageUrl) ? styles.plusDisabled : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onClickPlus();
                }}
                src={
                  isItemAdded(imageUrl)
                    ? '/react-sneakers/img/btn-checked.png'
                    : '/react-sneakers/img/btn-plus.svg'
                }
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
