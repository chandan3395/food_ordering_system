import { Link } from 'react-router-dom';

import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import EmptyState from '../components/common/EmptyState';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { items, subtotal, deliveryFee, tax, total, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="section-shell py-16">
        <EmptyState
          title="Your cart is empty"
          description="Browse the full menu, add a few favorites, and your order summary will update here instantly."
          actionLabel="Explore menu"
          actionTo="/menu"
        />
      </div>
    );
  }

  return (
    <div className="section-shell py-12">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-warm">Cart</p>
          <h1 className="mt-3 text-4xl font-semibold">Everything you plan to order.</h1>
        </div>
        <Link
          to="/menu"
          className="inline-flex h-12 items-center justify-center rounded-full border border-stone-200 bg-white px-6 text-sm font-semibold text-ink"
        >
          Add more dishes
        </Link>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          {items.map((item) => (
            <CartItem
              key={item.foodItem}
              item={item}
              onDecrease={() => updateQuantity(item.foodItem, item.quantity - 1)}
              onIncrease={() => updateQuantity(item.foodItem, item.quantity + 1)}
              onRemove={() => removeFromCart(item.foodItem)}
            />
          ))}
        </div>

        <OrderSummary
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          tax={tax}
          total={total}
          actionLabel="Proceed to checkout"
          actionTo="/checkout"
        />
      </div>
    </div>
  );
};

export default CartPage;

