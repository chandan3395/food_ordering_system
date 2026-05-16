import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import OrderSummary from '../components/cart/OrderSummary';
import EmptyState from '../components/common/EmptyState';
import Spinner from '../components/common/Spinner';
import SmartImage from '../components/common/SmartImage';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService';
import { formatCurrency } from '../utils/formatCurrency';
import { getErrorMessage } from '../utils/getErrorMessage';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, subtotal, deliveryFee, tax, total, clearCart } = useCart();
  const [formValues, setFormValues] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormValues((current) => ({
        ...current,
        fullName: current.fullName || user.name || '',
        phone: current.phone || user.phone || '',
      }));
    }
  }, [user]);

  if (items.length === 0) {
    return (
      <div className="section-shell py-16">
        <EmptyState
          title="Your cart needs something first"
          description="Add a few dishes before entering your delivery details and placing an order."
          actionLabel="Browse menu"
          actionTo="/menu"
        />
      </div>
    );
  }

  const handleChange = (event) => {
    setFormValues((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      const payload = {
        items: items.map((item) => ({
          foodItem: item.foodItem,
          quantity: item.quantity,
        })),
        deliveryAddress: formValues,
      };

      await createOrder(payload);
      clearCart();
      toast.success('Your order has been placed successfully.');
      navigate('/orders');
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section-shell py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-warm">Checkout</p>
        <h1 className="mt-3 text-4xl font-semibold">Confirm delivery details and place your order.</h1>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-panel p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-ink">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                value={formValues.fullName}
                onChange={handleChange}
                className="h-[52px] w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-ink">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                className="h-[52px] w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="street" className="mb-2 block text-sm font-semibold text-ink">
                Street address
              </label>
              <input
                id="street"
                name="street"
                value={formValues.street}
                onChange={handleChange}
                className="h-[52px] w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="city" className="mb-2 block text-sm font-semibold text-ink">
                City
              </label>
              <input
                id="city"
                name="city"
                value={formValues.city}
                onChange={handleChange}
                className="h-[52px] w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="state" className="mb-2 block text-sm font-semibold text-ink">
                State
              </label>
              <input
                id="state"
                name="state"
                value={formValues.state}
                onChange={handleChange}
                className="h-[52px] w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="postalCode" className="mb-2 block text-sm font-semibold text-ink">
                Postal code
              </label>
              <input
                id="postalCode"
                name="postalCode"
                value={formValues.postalCode}
                onChange={handleChange}
                className="h-[52px] w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="country" className="mb-2 block text-sm font-semibold text-ink">
                Country
              </label>
              <input
                id="country"
                name="country"
                value={formValues.country}
                onChange={handleChange}
                className="h-[52px] w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="notes" className="mb-2 block text-sm font-semibold text-ink">
                Delivery notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formValues.notes}
                onChange={handleChange}
                rows="4"
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm"
                placeholder="Apartment, landmark, or anything helpful for delivery."
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-[52px] w-full items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? <Spinner size="sm" /> : 'Place order'}
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <OrderSummary
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            tax={tax}
            total={total}
            actionLabel="Ready to place your order"
            disabled
          />

          <div className="surface-panel p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">What you are getting</p>
            <div className="mt-5 space-y-4">
              {items.map((item) => (
                <div key={item.foodItem} className="flex items-center gap-4 rounded-[22px] bg-orange-50/40 p-4">
                  <SmartImage src={item.image} alt={item.name} className="h-16 w-16 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold text-ink">{item.name}</p>
                    <p className="text-sm text-ink/55">
                      {item.quantity} × {formatCurrency(item.price)}
                    </p>
                  </div>
                  <p className="font-semibold text-ink">{formatCurrency(item.quantity * item.price)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
