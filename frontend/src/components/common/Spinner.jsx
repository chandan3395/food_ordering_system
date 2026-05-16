const Spinner = ({ size = 'md', className = '' }) => {
  const dimensionMap = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-[3px]',
    lg: 'h-10 w-10 border-4',
  };

  return (
    <span
      className={`inline-block animate-spin rounded-full border-white/20 border-t-white ${dimensionMap[size]} ${className}`}
    />
  );
};

export default Spinner;

