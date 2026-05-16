import { Link } from 'react-router-dom';

const EmptyState = ({ title, description, actionLabel, actionTo }) => (
  <div className="surface-panel flex flex-col items-center px-6 py-12 text-center sm:px-10">
    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-warm/10 text-2xl">🍽️</div>
    <h3 className="text-2xl font-semibold">{title}</h3>
    <p className="mt-3 max-w-lg text-sm leading-7 text-ink/65">{description}</p>
    {actionLabel && actionTo ? (
      <Link
        to={actionTo}
        className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-ink/90"
      >
        {actionLabel}
      </Link>
    ) : null}
  </div>
);

export default EmptyState;

