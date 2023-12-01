import React from 'react';
import styles from './Modal.module.scss';
import { appContext } from '../../App';

function Modal({ item, onClose, onPlus, onFavorite, isModalOpen }) {
  const { isItemAdded, isItemFavorite, numberWithSpaces } = React.useContext(appContext);
  const onClickPlus = () => {
    onPlus({
      id: item.id,
      parentId: item.id,
      title: item.title,
      price: item.price,
      imageUrl: item.imageUrl,
    });
  };

  const onClickFavorite = () => {
    onFavorite({
      id: item.id,
      parentId: item.id,
      title: item.title,
      price: item.price,
      imageUrl: item.imageUrl,
    });
  };

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, onClose]);

  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const [isClosing, setIsClosing] = React.useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  return (
    <div className={`${styles.modalBackdrop} ${isClosing ? styles.modalClosingBackground : ''} ${styles.modalOpeningBack}`} onClick={handleClose}>
      <div
       className={`${styles.modalContent} ${isClosing ? styles.modalClosing : ''} ${styles.animate}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.price}>
          <span>Price:</span>
          <b>{numberWithSpaces(item.price)} ₽</b>
        </div>
        <img
          onClick={handleClose}
          className={styles.removeBtn}
          src='/react-sneakers/img/btn-remove.svg'
          alt='Close'
        />
        <img src={item.imageUrl} alt={item.title} className={styles.modalImage} />
        <h5>{item.title}</h5>
        <div className={styles.buttons}>
          <div onClick={() => onClickFavorite(item)}>
            <img
              width={32}
              height={32}
              className={styles.favoriteBtn}
              src={
                isItemFavorite(item.id) ? '/react-sneakers/img/liked.svg' : '/react-sneakers/img/unliked.png'
              }
              alt='Favorite'
            />
          </div>
          <div onClick={() => onClickPlus(item)}>
            <img
              width={32}
              height={32}
              className={styles.plusBtn}
              src={
                isItemAdded(item.imageUrl)
                  ? '/react-sneakers/img/btn-checked.png'
                  : '/react-sneakers/img/btn-plus.svg'
              }
              alt='Add to Cart'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
