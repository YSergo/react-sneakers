import React from 'react';
import styles from './Modal.module.scss'; // Импортируйте стили для модального окна

function Modal({ item, onClose, onPlus, onFavorite }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <img
          onClick={onClose}
          className={styles.removeBtn}
          src='/react-sneakers/img/btn-remove.svg'
          alt='Close'
        />
        <img src={item.imageUrl} alt={item.title} className={styles.modalImage} />

        <div className={styles.buttons}>
          <div onClick={() => onFavorite(item)}>
            <img
              width={32}
              height={32}
              className={styles.favorite}
              src='/react-sneakers/img/unliked.png'
              alt='Favorite'
            />
          </div>
          <div onClick={() => onPlus(item)}>
            <img className={styles.plus} src='/react-sneakers/img/btn-plus.svg' alt='Add to Cart' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
