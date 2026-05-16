import { useEffect, useState } from 'react';

import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import FullPageLoader from '../components/common/FullPageLoader';
import OrderCard from '../components/orders/OrderCard';
import { fetchMyOrders } from '../services/orderService';
import { getErrorMessage } from '../utils/getErrorMessage';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await fetchMyOrders();
        setOrders(response.orders);
      } catch (requestError) {
        setError(getErrorMessage(requestError));
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (isLoading) {
    return <FullPageLoader label="Loading your orders..." />;
  }

  return (
    <div className="section-shell py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-warm">Order history</p>
        <h1 className="mt-3 text-4xl font-semibold">Every previous order, neatly organized.</h1>
      </div>

      {error ? <ErrorState message={error} /> : null}

      {!error && orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          description="Your completed checkouts will appear here with item details, status, totals, and delivery address."
          actionLabel="Start ordering"
          actionTo="/menu"
        />
      ) : null}

      {!error && orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default OrdersPage;

