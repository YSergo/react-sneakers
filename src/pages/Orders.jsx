import Card from '../components/Card';
import React from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://641a29baf398d7d95d51f32d.mockapi.io/orders');
        setOrders(data.map((obj) => obj.items).flat());
        // setOrders(data.reduce((prev, obj) => [ ...prev, ...obj.items], [])); - one more option
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе заказов');
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className='content'>
      <div className='contentNameNsearchPos'>
        <h1>Мои заказы</h1>
      </div>
      <div className='sneakers'>
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card
            key={index}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;
