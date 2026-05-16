import { Link } from 'react-router-dom';

import SmartImage from '../common/SmartImage';

const CategoryCard = ({ category }) => (
  <Link
    to={`/menu?category=${category._id}`}
    className="surface-panel group block overflow-hidden transition hover:-translate-y-1"
  >
    <div className="overflow-hidden">
      <SmartImage
        src={category.image}
        alt={category.name}
        className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
    <div className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">{category.name}</h3>
          <p className="mt-2 text-sm leading-6 text-ink/60">{category.description}</p>
        </div>
        <span className="rounded-full bg-orange-50 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-warm">
          {category.itemCount} items
        </span>
      </div>
    </div>
  </Link>
);

export default CategoryCard;

