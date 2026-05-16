import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ErrorState from '../components/common/ErrorState';
import FoodCardSkeleton from '../components/common/FoodCardSkeleton';
import SectionHeading from '../components/common/SectionHeading';
import CategoryCard from '../components/home/CategoryCard';
import HeroSection from '../components/home/HeroSection';
import TestimonialSection from '../components/home/TestimonialSection';
import FoodCard from '../components/menu/FoodCard';
import { fetchCategories } from '../services/categoryService';
import { fetchFoods } from '../services/foodService';
import { getErrorMessage } from '../utils/getErrorMessage';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [categories, setCategories] = useState([]);
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [popularFoods, setPopularFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadHomeData = async () => {
    try {
      setIsLoading(true);
      setError('');

      const [categoryResponse, featuredResponse, popularResponse] = await Promise.all([
        fetchCategories(),
        fetchFoods({ limit: 4, sort: 'rating_desc' }),
        fetchFoods({ limit: 4, sort: 'price_desc' }),
      ]);

      setCategories(categoryResponse.categories);
      setFeaturedFoods(featuredResponse.foods);
      setPopularFoods(popularResponse.foods);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  const handleSearchSubmit = () => {
    navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
  };

  return (
    <>
      <HeroSection
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchSubmit={handleSearchSubmit}
      />

      <section className="section-shell mt-24">
        <SectionHeading
          eyebrow="Featured foods"
          title="The dishes customers keep returning to."
          description="These are the most-loved plates on the menu right now, selected for flavor, consistency, and standout presentation."
          action={
            <Link to="/menu" className="inline-flex items-center gap-2 text-sm font-semibold text-warm">
              View full menu
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        {error ? (
          <ErrorState message={error} onRetry={loadHomeData} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {isLoading
              ? [...Array(4)].map((_, index) => <FoodCardSkeleton key={index} />)
              : featuredFoods.map((food) => <FoodCard key={food._id} food={food} />)}
          </div>
        )}
      </section>

      <section className="section-shell mt-20">
        <SectionHeading
          eyebrow="Categories"
          title="Choose your mood, then let the menu do the rest."
          description="Each category is built to feel distinctive, from cozy bowls and smoky burgers to bright desserts and coolers."
        />

        {error ? (
          <ErrorState message={error} onRetry={loadHomeData} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {isLoading
              ? [...Array(6)].map((_, index) => <FoodCardSkeleton key={index} />)
              : categories.map((category) => <CategoryCard key={category._id} category={category} />)}
          </div>
        )}
      </section>

      <section className="section-shell mt-20">
        <SectionHeading
          eyebrow="Popular now"
          title="A richer mix of indulgent picks and top-value comfort food."
          description="From high-protein mains to finish-with-dessert energy, these are built for satisfying full orders."
        />

        {error ? (
          <ErrorState message={error} onRetry={loadHomeData} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {isLoading
              ? [...Array(4)].map((_, index) => <FoodCardSkeleton key={index} />)
              : popularFoods.map((food) => <FoodCard key={food._id} food={food} />)}
          </div>
        )}
      </section>

      <TestimonialSection />

      <section className="section-shell mt-20 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="soft-gradient ring-sheen overflow-hidden rounded-[36px] p-8 sm:p-12"
        >
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-warm">Ready to order</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Build your cart, sign in securely, and place a smooth checkout in minutes.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-ink/68">
              Bites is designed for fast discovery, clear pricing, persistent carts, and reliable order history
              so reordering your favorites never feels repetitive.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white"
              >
                Start browsing
              </Link>
              <Link
                to="/signup"
                className="inline-flex h-12 items-center justify-center rounded-full border border-stone-200 bg-white px-6 text-sm font-semibold text-ink"
              >
                Create account
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default HomePage;

