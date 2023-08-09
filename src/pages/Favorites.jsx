import Card from '../components/Card';
import { appContext } from '../App';
import react from 'react';
import Info from '../components/Info';
import { useNavigate } from 'react-router-dom';

function Favorites() {
  const { favorites, onAddToFavorite } = react.useContext(appContext);
  const navigate = useNavigate();

  return (
    <div className='content'>
      <div className='contentNameNsearchPos'>
        <h1>Мои закладки</h1>
      </div>
      {favorites.length > 0 ? (
        <div className='sneakers'>
          {favorites.map((item, index) => (
            <Card key={index} onFavorite={onAddToFavorite} {...item} />
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
