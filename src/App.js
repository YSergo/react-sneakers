import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

const arr = [
  { title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: '12 999 руб.', imageUrl: '/img/sneakers/1.jpg' },
  { title: 'Мужские Кроссовки Nike Air Max 270', price: '12 999 руб.', imageUrl: '/img/sneakers/2.jpg' },
  { title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: '8 499 руб.', imageUrl: '/img/sneakers/3.jpg' },
  { title: 'Кроссовки Puma X Aka Boku Future Rider', price: '8 999 руб.', imageUrl: '/img/sneakers/4.jpg' }
];

function App() {

  const [CartOpened, setCartOpened] = React.useState(false);

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

          {arr.map(obj =>
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
