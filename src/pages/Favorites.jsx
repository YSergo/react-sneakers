import react from 'react';
import Card from '../components/Card';
import axios from 'axios';
import { appContext } from '../App';
import { useNavigate } from 'react-router-dom';

import Info from '../components/Info';

function Favorites({ isLoading }) {
  const { favorites, setFavorites } = react.useContext(appContext);

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
      <div className='contentNameNsearchPos'><h1>My Favorites</h1></div>
      {isLoading ? (
        <div className='sneakers'>
          {[...Array(8)].map((item, index) => (
            <Card key={index} onFavorite={onDeleteOnFavoritePage} loading={true} {...item} />
          ))}
        </div>
      ) : favorites.length > 0 ? (
        <div className='sneakers'>
          {favorites.map((item, index) => (
            <Card key={index} loading={false} onFavorite={onDeleteOnFavoritePage} {...item} />
          ))}
        </div>
      ) : (
        <Info
          image={'/img/empty-favorites.png'}
          style={{ width: '7%' }}
          title={'No favorites :('}
          description={`You haven't added anything to favorites`}
          func={() => navigate('/')}
        />
      )}
    </div>
  );
}

export default Favorites;
