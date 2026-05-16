const SectionHeading = ({ eyebrow, title, description, action }) => (
  <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-warm">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-base leading-7 text-ink/68">{description}</p> : null}
    </div>
    {action}
  </div>
);

export default SectionHeading;

