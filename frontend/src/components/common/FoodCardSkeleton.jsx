const FoodCardSkeleton = () => (
  <div className="surface-panel overflow-hidden">
    <div className="h-56 animate-pulse bg-orange-100" />
    <div className="space-y-4 p-5">
      <div className="h-5 w-2/3 animate-pulse rounded-full bg-orange-100" />
      <div className="space-y-2">
        <div className="h-4 animate-pulse rounded-full bg-stone-100" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-stone-100" />
      </div>
      <div className="h-11 animate-pulse rounded-full bg-orange-100" />
    </div>
  </div>
);

export default FoodCardSkeleton;

