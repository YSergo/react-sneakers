import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

export const appContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const cartItemsResponse = await axios.get('https://6403a93d80d9c5c7bab98673.mockapi.io/cart');
        const favoritesResponse = await axios.get('https://641a29baf398d7d95d51f32d.mockapi.io/favorites');
        const itemsResponse = await axios.get('https://6403a93d80d9c5c7bab98673.mockapi.io/items');

        setIsLoading(false);

        setCartItems(cartItemsResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Error fetching data. Perhaps mockapi problem. Try slow down ;(');
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => item.imageUrl === obj.imageUrl);
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => item.imageUrl !== obj.imageUrl));
        await axios.delete(`https://6403a93d80d9c5c7bab98673.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://6403a93d80d9c5c7bab98673.mockapi.io/cart', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert('Error while adding items to the cart. Perhaps mockapi problem. Try slow down');
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://6403a93d80d9c5c7bab98673.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert('Error while removing from the cart. Perhaps mockapi problem. Try slow down');
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      const findItem = favorites.find((favObj) => Number(favObj.parentId) === Number(obj.id));
      if (findItem) {
        setFavorites((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://641a29baf398d7d95d51f32d.mockapi.io/favorites/${findItem.id}`);
      } else {
        setFavorites((prev) => [...prev, obj]);
        const { data } = await axios.post('https://641a29baf398d7d95d51f32d.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev.filter((item) => item.id !== obj.id), data]);
      }
    } catch (error) {
      alert('Failed to add to favorites');
      console.error(error);
    }
  };

  const isItemAdded = (imageUrl) => {
    return cartItems.some((obj) => obj.imageUrl === imageUrl);
  };

  const isItemFavorite = (id) => {
    return favorites.some((obj) => Number(obj.parentId) === Number(id));
  };

  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  return (
    <appContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        setFavorites,
        isItemAdded,
        isItemFavorite,
        onAddToCart,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
        numberWithSpaces,
      }}
    >
      <div className='wrapper'>
        <Drawer
          onRemove={onRemoveItem}
          items={cartItems}
          onClose={() => setCartOpened(false)}
          opened={cartOpened}
        />
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
          <Route path='/favorites' element={<Favorites isLoading={isLoading} />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </div>
    </appContext.Provider>
  );
}

export default App;
