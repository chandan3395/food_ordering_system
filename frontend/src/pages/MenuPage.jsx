import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import FoodCardSkeleton from '../components/common/FoodCardSkeleton';
import Pagination from '../components/common/Pagination';
import FilterBar from '../components/menu/FilterBar';
import FoodCard from '../components/menu/FoodCard';
import useDebouncedValue from '../hooks/useDebouncedValue';
import { fetchCategories } from '../services/categoryService';
import { fetchFoods } from '../services/foodService';
import { getErrorMessage } from '../utils/getErrorMessage';

const MenuPage = () => {
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const debouncedSearch = useDebouncedValue(search, 400);

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '');
  }, [searchParams]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.categories);
      } catch (requestError) {
        setError(getErrorMessage(requestError));
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadFoods = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetchFoods({
          page,
          limit: 9,
          search: debouncedSearch || undefined,
          category: selectedCategory || undefined,
          sort,
        });

        setFoods(response.foods);
        setPagination(response.pagination);
      } catch (requestError) {
        setError(getErrorMessage(requestError));
      } finally {
        setIsLoading(false);
      }
    };

    loadFoods();
  }, [debouncedSearch, page, selectedCategory, sort]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedCategory, sort]);

  return (
    <div className="section-shell py-12">
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        sort={sort}
        onChangeSort={setSort}
        search={search}
        onSearchChange={setSearch}
      />

      <div className="mt-10">
        {error ? <ErrorState message={error} /> : null}

        {!error && isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <FoodCardSkeleton key={index} />
            ))}
          </div>
        ) : null}

        {!error && !isLoading && foods.length === 0 ? (
          <EmptyState
            title="No dishes matched this filter"
            description="Try clearing the category, changing the sort, or searching with a broader keyword."
            actionLabel="See all dishes"
            actionTo="/menu"
          />
        ) : null}

        {!error && !isLoading && foods.length > 0 ? (
          <>
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

export default MenuPage;
