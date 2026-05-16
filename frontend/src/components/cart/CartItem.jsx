import { Trash2 } from 'lucide-react';

import { formatCurrency } from '../../utils/formatCurrency';
import QuantityControl from '../common/QuantityControl';
import SmartImage from '../common/SmartImage';

const CartItem = ({ item, onDecrease, onIncrease, onRemove }) => (
  <div className="surface-panel grid gap-5 p-4 sm:grid-cols-[160px_1fr] sm:p-5">
    <SmartImage src={item.image} alt={item.name} className="h-40 w-full rounded-[24px] object-cover sm:h-full" />
    <div className="flex flex-col justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">{item.category}</p>
          <h3 className="mt-2 text-2xl font-semibold">{item.name}</h3>
          <p className="mt-2 text-sm text-ink/60">Ready for delivery and stored safely across refreshes.</p>
        </div>
        <p className="text-xl font-bold text-warm">{formatCurrency(item.price * item.quantity)}</p>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <QuantityControl value={item.quantity} onDecrease={onDecrease} onIncrease={onIncrease} />
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink/60 transition hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
          Remove
        </button>
      </div>
    </div>
  </div>
);

export default CartItem;

