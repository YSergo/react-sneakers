import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer'

function App() {
  const [items, setItems] = React.useState([]); //for back
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    fetch('https://6403a93d80d9c5c7bab98673.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);
  //подсосал данные с бэка, но нихуя не понял. Надо почитать про промисы. Did it)00

  const onAddToCart = (obj) => {
    if (!(cartItems.map(krosi => krosi.title).includes(obj.title) && cartItems.map(krosi => krosi.price).includes(obj.price))) {
      setCartItems(prev => [...prev, obj]);
      //or using method array.some() if (!cartItems.some(krosi => krosi.title === obj.title && krosi.price === obj.price)) setCartItems(prev => [...prev, obj]);
    }
  }

  const onRemoveFromCart = (obj) => {
    setCartItems(prev => prev.filter(item => item.price !== obj.price || item.title !== obj.title))
  }
  //HOMEWORK: add checking for an existing item (DONE, GPT <3), add opportunity to delete item from cart (DONE, OMG THIS OBJECT TRANSIST AND onClick={() => xyu(obj)} to do it)

  return (
    <div className="wrapper">

      {cartOpened && <Drawer onRemove={onRemoveFromCart} items={cartItems} onClose={() => setCartOpened(false)} />}
      {/* {cartOpened ? <Drawer onClose={() => setCartOpened(false)} /> : null} - same, but longer*/}


      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content">
        <div className="contentNameNsearchPos">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        <div className="sneakers">

          {items.map(item =>
            <Card
              title={item.title} //title is from Card.js 
              // (title, price, imageUrl becomes props in App(props)), 
              // item.title is from arr.
              // !!! means ~ Card.tittle == item.title -> Card == object == props, BINGO
              price={item.price}
              imageUrl={item.imageUrl}
              onPlus={(obj) => onAddToCart(obj)}
              onFavorite={() => console.log(228)}
            />
          )}

        </div>

      </div>
    </div>
  );
}

export default App;
