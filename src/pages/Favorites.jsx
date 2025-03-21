import react from 'react';
import Card from '../components/Card';
import axios from 'axios';
import { appContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { useAutoAnimate } from "@formkit/auto-animate/react";

import Info from '../components/Info';

function Favorites({ isLoading }) {
  const { favorites, setFavorites, onAddToCart } = react.useContext(appContext);
  const [parent] = useAutoAnimate();

  const navigate = useNavigate();

  const onDeleteOnFavoritePage = async (obj) => {
    try {
      await axios.delete(`https://641a29baf398d7d95d51f32d.mockapi.io/favorites/${obj.id}`);
      setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    } catch (error) {
      alert('Failed to remove from favorites');
      console.error(error);
    }
  };

  return (
    <div className='content'>
      <div className='contentTitleSearch'>
        <h1>Favorites</h1>
      </div>
      {isLoading ? (
        <div className='sneakers'>
          {[...Array(8)].map((item, index) => (
            <Card key={index} onFavorite={onDeleteOnFavoritePage} loading={true} {...item} />
          ))}
        </div>
      ) : favorites.length > 0 ? (
        <div ref={parent} className='sneakers'>
          {favorites.map((item, index) => (
            <Card
              key={item?.id || index}
              loading={false}
              onFavorite={onDeleteOnFavoritePage}
              onPlus={onAddToCart}
              {...item}
              disableCardHover
            />
          ))}
        </div>
      ) : (
        <Info
          image={'/react-sneakers/img/empty-favorites.png'}
          style={{ width: '70px' }}
          title={'No favorites :('}
          description={`You haven't added anything to favorites`}
          func={() => navigate('/')}
        />
      )}
    </div>
  );
}

export default Favorites;
