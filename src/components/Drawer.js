function Drawer({onClose, items = [], onRemove}) {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2>Корзина <img onClick={onClose} className="removeBtn" src="/img/btn-remove.svg" alt="Close" /></h2>

        <div className="items">

          {items.map(obj => (
            <div className="cartItem">
              <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg"></div>
              <div className="textInCartItem">
                <p>{obj.title}</p>
                <b>{obj.price}</b>
              </div>
              <img onClick={() => onRemove(obj)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
            </div>
          ))}

        </div>
        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>21 498 руб.</b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>1074 руб.</b>
            </li>
          </ul>
          <button className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;