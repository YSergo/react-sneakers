import Card from '../components/Card';
import { appContext } from '../App';
import react from 'react';

function Favorites() {
  const { favorites, onAddToFavorite } = react.useContext(appContext);

  return (
    <div className='content'>
      <div className='contentNameNsearchPos'>
        <h1>Мои закладки</h1>
      </div>
      <div className='sneakers'>
        {favorites.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            onFavorite={onAddToFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
