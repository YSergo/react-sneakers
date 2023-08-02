import Card from '../components/Card';

function Home({
  items,
  cartItems,
  searchValue,
  setSearchValue,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const renderItems = () => {
    return (
      isLoading
        ? Array(8).fill({})
        : items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          )
    ).map((item, index) => (
      <Card
        key={index}
        // title={item.title} //title is from Card.js
        // // (title, price, imageUrl becomes props in App(props)),
        // // item.title is from arr.
        // // !!! means ~ Card.tittle == item.title -> Card == object == props, BINGO
        // price={item.price}
        // id={item.id}
        // imageUrl={item.imageUrl}
        onPlus={(obj) => onAddToCart(obj)}
        onFavorite={(obj) => onAddToFavorite(obj)}
        added={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
        {...item}
        loading={isLoading}
      />
    ));
  };
  return (
    <div className='content'>
      <div className='contentNameNsearchPos'>
        <h1>
          {searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}
        </h1>
        <div className='search-block'>
          <img src='/img/search.svg' alt='Search' />
          {searchValue && (
            <img
              onClick={() => setSearchValue('')}
              className='clear-btn'
              src='/img/btn-remove.svg'
              alt='Clear'
            />
          )}
          <input
            onChange={(event) => setSearchValue(event.target.value)}
            value={searchValue}
            placeholder='Поиск...'
          />
        </div>
      </div>
      <div className='sneakers'>{renderItems()}</div>
    </div>
  );
}

export default Home;
