import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer'

function App() {
  const [items, setItems] = React.useState([]); //for back
  const [CartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    fetch('https://6403a93d80d9c5c7bab98673.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);
  //подсосал данные с бэка, но нихуя не понял. Надо почитать про промисы

  return (
    <div className="wrapper">

      {CartOpened && <Drawer onClose={() => setCartOpened(false)} />}
      {/* {CartOpened ? <Drawer onClose={() => setCartOpened(false)} /> : null} - same, but longer*/}


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

          {items.map(obj =>
            <Card
              title={obj.title} //title is from Card.js 
              // (title, price, imageUrl becomes props in App(props)), 
              // obj.title is from arr.
              // !!! means ~ Card.tittle == obj.title -> Card == object == props, BINGO
              price={obj.price}
              imageUrl={obj.imageUrl}
            />
          )}

        </div>

      </div>
    </div>
  );
}

export default App;
