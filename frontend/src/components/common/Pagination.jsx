const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition ${
            page === currentPage
              ? 'bg-ink text-white shadow-soft'
              : 'border border-stone-200 bg-white text-ink hover:border-warm/40'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

