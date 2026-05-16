import { Search } from 'lucide-react';

const SearchInput = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search dishes, ingredients, or categories',
  className = '',
  showButton = true,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/45" />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-14 w-full rounded-full border border-white/70 bg-white/90 pl-12 pr-4 text-[15px] text-ink shadow-soft placeholder:text-ink/40"
          placeholder={placeholder}
        />
      </div>
      {showButton ? (
        <button
          type="submit"
          className="h-14 rounded-full bg-ink px-7 text-sm font-semibold text-white transition hover:bg-ink/90"
        >
          Search now
        </button>
      ) : null}
    </form>
  );
};

export default SearchInput;

