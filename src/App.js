import React from 'react';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Favorites from './pages/Favorites';

function App() {
  const [items, setItems] = React.useState([]); //for back
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const cartItemsResponse = await axios.get(
        'https://6403a93d80d9c5c7bab98673.mockapi.io/cart'
      );
      const favoritesResponse = await axios.get(
        'https://641a29baf398d7d95d51f32d.mockapi.io/favorites'
      );
      const itemsResponse = await axios.get(
        'https://6403a93d80d9c5c7bab98673.mockapi.io/items'
      );

      setIsLoading(false)

      setCartItems(cartItemsResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);
  //выше - как надо. Хотя еще и трай кетч должен быть...
  // fetch vs axios.
  // fetch:
  // fetch('https://6403a93d80d9c5c7bab98673.mockapi.io/items')
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((json) => {
  //     setItems(json);
  //   });
  //axios:
  //   axios
  //     .get('https://6403a93d80d9c5c7bab98673.mockapi.io/items')
  //     .then((res) => setItems(res.data));
  //   axios
  //     .get('https://6403a93d80d9c5c7bab98673.mockapi.io/cart')
  //     .then((res) => setCartItems(res.data));
  //   axios
  //     .get('https://641a29baf398d7d95d51f32d.mockapi.io/favorites')
  //     .then((res) => setFavorites(res.data));
  // }, []);
  //подсосал данные с бэка, но нихуя не понял. Надо почитать про промисы. Did it)00

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(
        `https://6403a93d80d9c5c7bab98673.mockapi.io/cart/${obj.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
      // !(
      //   cartItems.map((krosi) => krosi.title).includes(obj.title) &&
      //   cartItems.map((krosi) => krosi.price).includes(obj.price)
      // ) - старый способ
    } else {
      axios.post('https://6403a93d80d9c5c7bab98673.mockapi.io/cart', obj);
      setCartItems((prev) => [...prev, obj]);
      //or using method array.some() if (!cartItems.some(krosi => krosi.title === obj.title && krosi.price === obj.price)) setCartItems(prev => [...prev, obj]);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://6403a93d80d9c5c7bab98673.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  //HOMEWORK: add checking for an existing item (DONE, GPT <3), add opportunity to delete item from cart (DONE, OMG THIS OBJECT TRANSIST AND onClick={() => xyu(obj)} to do it)

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://641a29baf398d7d95d51f32d.mockapi.io/favorites/${obj.id}`
        );
      } else {
        const { data } = await axios.post(
          'https://641a29baf398d7d95d51f32d.mockapi.io/favorites',
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };

  return (
    <div className='wrapper'>
      {cartOpened && (
        <Drawer
          onRemove={onRemoveItem}
          items={cartItems}
          onClose={() => setCartOpened(false)}
        />
      )}
      {/* {cartOpened ? <Drawer onClose={() => setCartOpened(false)} /> : null} - same, but longer*/}

      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route
          path='/'
          element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path='favorites/'
          element={
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
