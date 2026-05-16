import { Link } from 'react-router-dom';

import { formatCurrency } from '../../utils/formatCurrency';

const SummaryRow = ({ label, value, emphasize = false }) => (
  <div className={`flex items-center justify-between ${emphasize ? 'pt-4 text-lg font-semibold' : 'text-sm text-ink/65'}`}>
    <span>{label}</span>
    <span className={emphasize ? 'font-heading text-ink' : 'font-semibold text-ink'}>{value}</span>
  </div>
);

const OrderSummary = ({ subtotal, deliveryFee, tax, total, actionLabel, actionTo, disabled }) => (
  <aside className="surface-panel sticky top-28 p-6">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-warm">Order summary</p>
    <h3 className="mt-3 text-2xl font-semibold">A quick breakdown before you continue.</h3>

    <div className="mt-6 space-y-4 border-t border-stone-200 pt-6">
      <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />
      <SummaryRow label="Delivery fee" value={formatCurrency(deliveryFee)} />
      <SummaryRow label="Taxes" value={formatCurrency(tax)} />
      <SummaryRow label="Total" value={formatCurrency(total)} emphasize />
    </div>

    {actionTo ? (
      <Link
        to={actionTo}
        className={`mt-6 inline-flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold transition ${
          disabled ? 'pointer-events-none bg-stone-200 text-stone-500' : 'bg-ink text-white hover:bg-ink/90'
        }`}
      >
        {actionLabel}
      </Link>
    ) : null}
  </aside>
);

export default OrderSummary;

