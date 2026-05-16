import SearchInput from '../common/SearchInput';

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Highest Rated', value: 'rating_desc' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name', value: 'name_asc' },
];

const FilterBar = ({
  categories,
  selectedCategory,
  onSelectCategory,
  sort,
  onChangeSort,
  search,
  onSearchChange,
  title = 'Browse the menu',
  description = 'Search, filter by category, and explore dishes that feel fresh from the first glance to the final bite.',
}) => (
  <section className="surface-panel p-6 sm:p-8">
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
      <div>
        <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/65">{description}</p>
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search for burgers, bowls, desserts, and more"
          className="mt-6"
          showButton={false}
        />
      </div>

      <div className="rounded-[24px] bg-orange-50/80 p-5">
        <label htmlFor="sort" className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
          Sort menu
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(event) => onChangeSort(event.target.value)}
          className="h-12 w-full rounded-2xl border border-white/80 bg-white px-4 text-sm font-semibold text-ink shadow-sm"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="mt-6 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => onSelectCategory('')}
        className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
          !selectedCategory ? 'bg-ink text-white shadow-soft' : 'bg-white text-ink hover:bg-orange-50'
        }`}
      >
        All dishes
      </button>
      {categories.map((category) => (
        <button
          key={category._id}
          type="button"
          onClick={() => onSelectCategory(category._id)}
          className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
            selectedCategory === category._id
              ? 'bg-ink text-white shadow-soft'
              : 'bg-white text-ink hover:bg-orange-50'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  </section>
);

export default FilterBar;

