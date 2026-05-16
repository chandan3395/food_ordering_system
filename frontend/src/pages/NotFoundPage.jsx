import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="section-shell flex min-h-[70vh] items-center justify-center py-16">
    <div className="soft-gradient ring-sheen max-w-2xl rounded-[36px] px-8 py-12 text-center sm:px-12">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-warm">404</p>
      <h1 className="mt-4 text-5xl font-semibold">This page is off the menu.</h1>
      <p className="mt-5 text-base leading-8 text-ink/68">
        The route you tried does not exist. Head back home or browse the full menu to keep things moving.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white"
        >
          Go home
        </Link>
        <Link
          to="/menu"
          className="inline-flex h-12 items-center justify-center rounded-full border border-stone-200 bg-white px-6 text-sm font-semibold text-ink"
        >
          Browse menu
        </Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
