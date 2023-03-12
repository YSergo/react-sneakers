function Drawer({onClose, items = [], onRemove}) {
  return (
    <div onClick={onClose} className="overlay">
      <div onClick={(event) => event.stopPropagation()} className="drawer">
        {/* onClick={(event) => event.stopPropagation()} - help by gpt, 
        we are missing onClose on this div now */}
        <h2>Корзина <img onClick={onClose} className="removeBtn" src="/img/btn-remove.svg" alt="Close" /></h2>

        {
          items.length > 0 ? (
            <div>
              <div className="items">
                {items.map(obj => (
                  <div className="cartItem">
                    <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg"></div>
                    <div className="textInCartItem">
                      <p>{obj.title}</p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
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
          ) : (
            <div class="cartEmpty d-flex align-center justify-center flex-column flex">
              <img class="mb-20" width="120px" height="120px" src="/img/empty-cart.jpg" alt="Empty" />
              <h2>Корзина пустая</h2>
              <p class="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
              <button onClick={onClose} class="greenButton">
                <img src="/img/arrow.svg" alt="Arrow" />
                Вернуться назад
              </button>
            </div>
          )
        }

      </div>
    </div >
  );
}

export default Drawer;