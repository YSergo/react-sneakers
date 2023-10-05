import React from 'react';
import axios from 'axios';
import { appContext } from '../../App';

import Info from '../Info';
import styles from './Drawer.module.scss';

function Drawer({ onClose, items = [], onRemove, opened }) {
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { cartItems, setCartItems, setCartOpened, numberWithSpaces, delay } = React.useContext(appContext);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (opened) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [opened, onClose]);

  const totalPrice = cartItems.reduce((sum, obj) => sum + obj.price, 0);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://641a29baf398d7d95d51f32d.mockapi.io/orders', {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      await delay(3000);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://6403a93d80d9c5c7bab98673.mockapi.io/cart/' + item.id);
        await delay(1000);
      } //damn mockapi :(;
    } catch (error) {
      alert('Error when creating the order :C');
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div onClick={onClose} className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div onClick={(event) => event.stopPropagation()} className={styles.drawer}>
        <h2>
          Cart
          <img
            onClick={onClose}
            className={styles.removeBtn}
            src='/react-sneakers/img/btn-remove.svg'
            alt='Close'
          />
        </h2>

        {items.length > 0 ? (
          <div className={styles.itemsParent}>
            <div className={styles.items}>
              {items.map((obj) => (
                <div key={obj.id} className={styles.cartItem}>
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className={styles.cartItemImg}
                  ></div>
                  <div className={styles.textInCartItem}>
                    <p>{obj.title}</p>
                    <b>{numberWithSpaces(obj.price)} ₽</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className={styles.removeBtn}
                    src='/react-sneakers/img/btn-remove.svg'
                    alt='Remove'
                  />
                </div>
              ))}
            </div>

            <div className={styles.cartTotalBlock}>
              <ul>
                <li>
                  <span>Total:</span>
                  <div></div>
                  <b>{numberWithSpaces(totalPrice)} ₽</b>
                </li>
                <li>
                  <span>Fee 5%:</span>
                  <div></div>
                  <b>{numberWithSpaces(Math.round(totalPrice * 0.05))} ₽</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className={styles.greenButton}>
                Place order <img src='/react-sneakers/img/arrow.svg' alt='Arrow' />
              </button>
            </div>
          </div>
        ) : (
          <Info
            image={
              isOrderComplete
                ? '/react-sneakers/img/complete-order.png'
                : '/react-sneakers/img/empty-cart.jpg'
            }
            title={isOrderComplete ? 'Order placed!' : 'Cart is empty'}
            description={
              isOrderComplete
                ? `Your order #${orderId} will soon be handed over for courier delivery`
                : 'Add at least one pair of sneakers to place an order.'
            }
            func={() => setCartOpened(false)}
            style={isOrderComplete ? { width: '30%' } : { width: '40%' }}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
