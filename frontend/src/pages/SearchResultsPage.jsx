import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import FoodCardSkeleton from '../components/common/FoodCardSkeleton';
import Pagination from '../components/common/Pagination';
import SearchInput from '../components/common/SearchInput';
import FoodCard from '../components/menu/FoodCard';
import { searchFoods } from '../services/foodService';
import { getErrorMessage } from '../utils/getErrorMessage';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchValue, setSearchValue] = useState(query);
  const [foods, setFoods] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setSearchValue(query);
    setPage(1);
  }, [query]);

  useEffect(() => {
    const loadResults = async () => {
      if (!query.trim()) {
        setFoods([]);
        setPagination({ currentPage: 1, totalPages: 1 });
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError('');

        const response = await searchFoods(query, {
          page,
          limit: 9,
          sort: 'rating_desc',
        });

        setFoods(response.foods);
        setPagination(response.pagination);
      } catch (requestError) {
        setError(getErrorMessage(requestError));
      } finally {
        setIsLoading(false);
      }
    };

    loadResults();
  }, [page, query]);

  const handleSearchSubmit = () => {
    navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
  };

  return (
    <div className="section-shell py-12">
      <div className="surface-panel p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-warm">Search results</p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Find exactly what you want to eat.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/65">
          Search across dish names and descriptions, then add your picks directly to the cart.
        </p>
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          onSubmit={handleSearchSubmit}
          className="mt-6"
        />
      </div>

      <div className="mt-10">
        {error ? <ErrorState message={error} /> : null}

        {!query.trim() && !error ? (
          <EmptyState
            title="Start with a search"
            description="Try a dish like burger, ramen, truffle, dessert, or any ingredient you are craving right now."
            actionLabel="Browse full menu"
            actionTo="/menu"
          />
        ) : null}

        {!error && isLoading && query.trim() ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <FoodCardSkeleton key={index} />
            ))}
          </div>
        ) : null}

        {!error && !isLoading && query.trim() && foods.length === 0 ? (
          <EmptyState
            title={`No matches found for "${query}"`}
            description="Try a broader search term or head back to the full menu to filter by category instead."
            actionLabel="Open menu"
            actionTo="/menu"
          />
        ) : null}

        {!error && !isLoading && foods.length > 0 ? (
          <>
            <div className="mb-6">
              <p className="text-sm text-ink/55">
                Showing {foods.length} result{foods.length > 1 ? 's' : ''} for <span className="font-semibold text-ink">“{query}”</span>.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {foods.map((food) => (
                <FoodCard key={food._id} food={food} />
              ))}
            </div>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SearchResultsPage;

