import Card from '../components/Card';

function Home({ items, searchValue, setSearchValue, onAddToFavorite, onAddToCart, isLoading }) {
  const renderItems = () => {
    return (
      isLoading
        ? [...Array(8)]
        : items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    ).map((item, index) => (
      <Card
        key={index}
        onPlus={(obj) => onAddToCart(obj)}
        onFavorite={(obj) => onAddToFavorite(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };
  return (
    <div className='content'>
      <div className='contentNameNsearchPos'>
        <h1 style={{ cursor: 'pointer' }} onClick={() => window.location.reload()}>
          {searchValue ? `Search results for: ${searchValue}` : 'All Sneakers'}
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
            placeholder='Search...'
          />
        </div>
      </div>
      <div className='sneakers'>{renderItems()}</div>
    </div>
  );
}

export default Home;
