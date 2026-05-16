import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import RatingStars from '../common/RatingStars';
import SmartImage from '../common/SmartImage';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="surface-panel group flex h-full flex-col overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <SmartImage
          src={food.image}
          alt={food.name}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink">
          {food.category?.name || food.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-1 items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{food.name}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/62">{food.description}</p>
          </div>
          <p className="rounded-full bg-orange-50 px-3 py-2 text-sm font-bold text-warm">
            {formatCurrency(food.price)}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <RatingStars rating={food.ratings?.average || 0} count={food.ratings?.count || 0} />
          <button
            type="button"
            onClick={() => addToCart(food)}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-ink/90"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default FoodCard;
