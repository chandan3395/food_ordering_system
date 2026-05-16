import { Minus, Plus } from 'lucide-react';

const QuantityControl = ({ value, onDecrease, onIncrease }) => (
  <div className="inline-flex items-center rounded-full border border-stone-200 bg-white p-1 shadow-sm">
    <button
      type="button"
      onClick={onDecrease}
      className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition hover:bg-stone-100"
      aria-label="Decrease quantity"
    >
      <Minus className="h-4 w-4" />
    </button>
    <span className="min-w-10 text-center text-sm font-semibold text-ink">{value}</span>
    <button
      type="button"
      onClick={onIncrease}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition hover:bg-ink/90"
      aria-label="Increase quantity"
    >
      <Plus className="h-4 w-4" />
    </button>
  </div>
);

export default QuantityControl;

