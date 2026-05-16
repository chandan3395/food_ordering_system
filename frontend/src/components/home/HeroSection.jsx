import { motion } from 'framer-motion';
import { ArrowRight, Clock3, MapPin, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

import SearchInput from '../common/SearchInput';
import SmartImage from '../common/SmartImage';

const highlights = [
  { icon: Clock3, label: 'Prepared fast', value: '20-30 min' },
  { icon: MapPin, label: 'Delivery range', value: 'Citywide coverage' },
  { icon: ShieldCheck, label: 'Fresh promise', value: 'Cooked to order' },
];

const HeroSection = ({ searchValue, onSearchChange, onSearchSubmit }) => (
  <section className="section-shell pt-10 sm:pt-14">
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-4 inline-flex rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-warm shadow-soft">
          Premium food ordering
        </p>
        <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] sm:text-6xl">
          Find your next favorite meal in one smooth order flow.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-ink/68 sm:text-lg">
          Bites brings together chef-crafted bowls, pizzas, burgers, desserts, and refreshers in a fast,
          polished ordering experience designed for busy evenings and better cravings.
        </p>

        <SearchInput
          value={searchValue}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
          className="mt-8 max-w-2xl"
        />

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/menu"
            className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-ink/90"
          >
            Explore full menu
          </Link>
          <Link
            to="/orders"
            className="inline-flex h-12 items-center justify-center rounded-full border border-stone-200 bg-white px-6 text-sm font-semibold text-ink transition hover:border-warm/30"
          >
            Track your orders
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="surface-panel flex items-start gap-3 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-warm">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{item.value}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-ink/42">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative"
      >
        <div className="soft-gradient hero-shadow overflow-hidden rounded-[36px] p-5 sm:p-8">
          <SmartImage
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80"
            alt="Plated premium meal spread"
            className="h-[500px] w-full rounded-[30px] object-cover"
          />
        </div>

        <div className="absolute -bottom-6 left-4 right-4 surface-panel flex items-center justify-between gap-4 p-5 sm:left-8 sm:right-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">Trending tonight</p>
            <p className="mt-2 font-heading text-xl font-semibold text-ink">Truffle Roast Chicken</p>
            <p className="mt-1 text-sm text-ink/60">Loved for its herb jus, crisp skin, and velvety mash.</p>
          </div>
          <Link
            to="/menu"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white"
          >
            Order now
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;

