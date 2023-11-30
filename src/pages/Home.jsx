import React, { useState } from 'react';

import Card from '../components/Card';
import Modal from '../components/Modal/Modal';

function Home({ items, searchValue, setSearchValue, onAddToFavorite, onAddToCart, isLoading }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

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
        onClick={() => handleCardClick(item)}
      />
    ));
  };
  return (
    <div className='content'>
      <div className='contentTitleSearch'>
        <h1 style={{ cursor: 'pointer' }} onClick={() => window.location.reload()}>
          {searchValue ? `Search results for: ${searchValue}` : 'All Sneakers'}
        </h1>
        <div className='search-block'>
          <img className='lupa' src='/react-sneakers/img/search.svg' alt='Search' />
          {searchValue && (
            <img
              onClick={() => setSearchValue('')}
              className='clear-btn'
              src='/react-sneakers/img/btn-remove.svg'
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
      {isModalOpen && (
        <Modal
          item={selectedItem}
          onClose={() => setIsModalOpen(false)}
          onPlus={(obj) => onAddToCart(obj)}
          onFavorite={(obj) => onAddToFavorite(obj)}
          isModalOpen={isModalOpen}
        />
      )}
    </div>
  );
}

export default Home;
