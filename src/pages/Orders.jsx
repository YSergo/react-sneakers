import React from 'react';
import { useNavigate } from 'react-router-dom';

import { appContext } from '../App';
import Card from '../components/Card';
import Info from '../components/Info';

function Orders() {
  const { orders, ordersIsLoading } = React.useContext(appContext);
  const navigate = useNavigate();

  return (
    <div className='content'>
      <div className='contentTitleSearch'><h1>Orders</h1></div>
      {ordersIsLoading ? (
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
          image={'/react-sneakers/img/empty-order.png'}
          title={'You have no orders'}
          description={'Are you broke? Place at least one order.'}
          func={() => navigate('/')}
          style={{ width: '70px' }}
        />
      )}
    </div>
  );
}

export default Orders;
