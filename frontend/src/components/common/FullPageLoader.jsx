import Spinner from './Spinner';

const FullPageLoader = ({ label = 'Loading Bites...' }) => (
  <div className="flex min-h-[40vh] items-center justify-center">
    <div className="surface-panel flex items-center gap-4 px-6 py-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink">
        <Spinner size="md" />
      </div>
      <div>
        <p className="font-heading text-lg text-ink">{label}</p>
        <p className="text-sm text-ink/60">Preparing your next bite.</p>
      </div>
    </div>
  </div>
);

export default FullPageLoader;

