import { Star } from 'lucide-react';

const RatingStars = ({ rating, count }) => (
  <div className="flex items-center gap-2 text-sm text-ink/65">
    <div className="flex items-center gap-1 text-amber-500">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className="h-4 w-4"
          fill={index + 1 <= Math.round(rating) ? 'currentColor' : 'none'}
        />
      ))}
    </div>
    <span>{rating?.toFixed(1)}</span>
    <span>({count})</span>
  </div>
);

export default RatingStars;

