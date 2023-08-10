import Card from '../components/Card';
import { appContext } from '../App';
import react from 'react';
import Info from '../components/Info';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Favorites() {
  const { favorites, setFavorites } = react.useContext(appContext);
  const navigate = useNavigate();

  const location = useLocation();
  const isFavoritesPage = location.pathname === '/favorites';

  const onDeleteOnFavoritePage = async (obj) => {
    try {
      await axios.delete(`https://641a29baf398d7d95d51f32d.mockapi.io/favorites/${obj.id}`);
      setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    } catch (error) {
      alert('Не удалось удалить из закладок');
      console.error(error);
    }
  };

  return (
    <div className='content'>
      <div className='contentNameNsearchPos'>{isFavoritesPage ? null : <h1>Мои закладки</h1>}</div>
      {favorites.length > 0 ? (
        <div className='sneakers'>
          {favorites.map((item, index) => (
            <Card key={index} onFavorite={onDeleteOnFavoritePage} {...item} />
          ))}
        </div>
      ) : (
        <Info
          image={'/img/empty-favorites.png'}
          title={'Закладок нет :('}
          description={'Вы ничего не добавляли в закладки'}
          func={() => navigate('/')}
        />
      )}
    </div>
  );
}

export default Favorites;
