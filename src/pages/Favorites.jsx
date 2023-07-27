import Card from '../components/Card';
function Favorites({ items, onAddToFavorite }) {
  return (
    <div className='content'>
      <div className='contentNameNsearchPos'>
        <h1>Favorites</h1>
      </div>
      <div className='sneakers'>
        {items.map((item, index) => (
          <Card
            key={index}
            title={item.title} //title is from Card.js
            // (title, price, imageUrl becomes props in App(props)),
            // item.title is from arr.
            // !!! means ~ Card.tittle == item.title -> Card == object == props, BINGO
            price={item.price}
            id={item.id}
            imageUrl={item.imageUrl}
            favorited={true}
            onFavorite={onAddToFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
