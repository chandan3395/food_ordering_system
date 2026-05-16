import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import SmartImage from '../common/SmartImage';

const statusStyles = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  preparing: 'bg-violet-100 text-violet-700',
  out_for_delivery: 'bg-orange-100 text-orange-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-rose-100 text-rose-700',
};

const OrderCard = ({ order }) => (
  <article className="surface-panel overflow-hidden">
    <div className="border-b border-stone-200 px-6 py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">Order placed</p>
          <h3 className="mt-2 text-2xl font-semibold">{formatDate(order.createdAt)}</h3>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-warm">
            {formatCurrency(order.totalAmount)}
          </span>
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
              statusStyles[order.orderStatus] || 'bg-stone-100 text-stone-700'
            }`}
          >
            {order.orderStatus.replaceAll('_', ' ')}
          </span>
        </div>
      </div>
    </div>

    <div className="space-y-4 px-6 py-5">
      {order.items.map((item) => (
        <div key={item.foodItem?._id || item.foodItem} className="flex items-center gap-4 rounded-[24px] bg-orange-50/40 p-4">
          <SmartImage
            src={item.foodItem?.image}
            alt={item.foodItem?.name}
            className="h-20 w-20 rounded-2xl object-cover"
          />
          <div className="flex-1">
            <p className="font-semibold text-ink">{item.foodItem?.name}</p>
            <p className="text-sm text-ink/55">
              {item.quantity} × {formatCurrency(item.unitPrice)}
            </p>
          </div>
          <p className="font-semibold text-ink">{formatCurrency(item.subtotal)}</p>
        </div>
      ))}

      <div className="rounded-[24px] border border-stone-200 bg-white p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">Delivery address</p>
        <p className="mt-2 text-sm leading-7 text-ink/65">
          {order.deliveryAddress.fullName}, {order.deliveryAddress.street}, {order.deliveryAddress.city},{' '}
          {order.deliveryAddress.state} {order.deliveryAddress.postalCode}, {order.deliveryAddress.country}
        </p>
      </div>
    </div>
  </article>
);

export default OrderCard;

