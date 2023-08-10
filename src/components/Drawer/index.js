import React from 'react';
import axios from 'axios';
import { appContext } from '../../App';

import Info from '../Info';
import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, items = [], onRemove, opened }) {
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { cartItems, setCartItems, setCartOpened, numberWithSpaces } = React.useContext(appContext);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (opened) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
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
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://6403a93d80d9c5c7bab98673.mockapi.io/cart/' + item.id);
        await delay(1000);
      } //ebuchiy mockapi :(;
    } catch {
      alert('Ошибка при создании заказа :C');
    }
    setIsLoading(false);
  };

  return (
    <div onClick={onClose} className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div onClick={(event) => event.stopPropagation()} className={styles.drawer}>
        <h2>
          Корзина <img onClick={onClose} className={styles.removeBtn} src='/img/btn-remove.svg' alt='Close' />
        </h2>

        {items.length > 0 ? (
          <div className={styles.itemsParent}>
            <div className={styles.items}>
              {items.map((obj) => (
                <div key={obj.id} className='cartItem'>
                  <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className='cartItemImg'></div>
                  <div className='textInCartItem'>
                    <p>{obj.title}</p>
                    <b>{numberWithSpaces(obj.price)} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className='removeBtn'
                    src='/img/btn-remove.svg'
                    alt='Remove'
                  />
                </div>
              ))}
            </div>

            <div className='cartTotalBlock'>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{numberWithSpaces(totalPrice)} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{numberWithSpaces(Math.round(totalPrice * 0.05))} руб.</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className='greenButton'>
                Оформить заказ <img src='/img/arrow.svg' alt='Arrow' />
              </button>
            </div>
          </div>
        ) : (
          <Info
            image={isOrderComplete ? '/img/complete-order.png' : '/img/empty-cart.jpg'}
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            func={() => setCartOpened(false)}
            style={isOrderComplete ? { width: '30%'} : { width: '40%'}}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
