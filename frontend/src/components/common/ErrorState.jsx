const ErrorState = ({ title = 'Something went wrong', message, onRetry }) => (
  <div className="surface-panel px-6 py-10 text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-warm">Error</p>
    <h3 className="mt-3 text-2xl font-semibold">{title}</h3>
    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-ink/65">{message}</p>
    {onRetry ? (
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-ink/90"
      >
        Try again
      </button>
    ) : null}
  </div>
);

export default ErrorState;

