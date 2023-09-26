import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Card from '../components/Card';
import Info from '../components/Info';

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://641a29baf398d7d95d51f32d.mockapi.io/orders');
        setOrders(data.map((obj) => obj.items).flat());
        // setOrders(data.reduce((prev, obj) => [ ...prev, ...obj.items], [])); - one more option
        setIsLoading(false);
      } catch (error) {
        alert('Error fetching orders');
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className='content'>
      <div className='contentNameNsearchPos'><h1>Orders</h1></div>
      {isLoading ? (
        <div className='sneakers'>
          {[...Array(8)].map((_, index) => (
            <Card key={index} loading={true} />
          ))}
        </div>
      ) : orders.length > 0 ? (
        <div className='sneakers'>
          {orders.map((item, index) => (
            <Card key={index} loading={false} {...item} />
          ))}
        </div>
      ) : (
        <Info
          image={'img/empty-order.png'}
          title={'You have no orders'}
          description={'Are you broke? Place at least one order.'}
          func={() => navigate('/')}
          style={{ width: '7%' }}
        />
      )}
    </div>
  );
}

export default Orders;
