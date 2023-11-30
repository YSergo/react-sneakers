import React from 'react';
import styles from './Modal.module.scss'; // Импортируйте стили для модального окна

function Modal({ item, onClose, onPlus, onFavorite }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <img src={item.imageUrl} alt={item.title} className={styles.modalImage} />
        <div className={styles.modalActions}>
          <button onClick={() => onFavorite(item)}>
            <img src='/react-sneakers/img/liked.svg' alt='Favorite' />
          </button>
          <button onClick={() => onPlus(item)}>
            <img src='/react-sneakers/img/btn-checked.png' alt='Add to Cart' />
          </button>
        </div>
        <button onClick={onClose} className={styles.closeButton}>
          &#10005; {/* Крестик для закрытия */}
        </button>
      </div>
    </div>
  );
}

export default Modal;
