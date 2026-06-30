export default function AdminTopbar({ label, title, description, actions }) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 px-4 py-5 backdrop-blur-md md:px-8 md:py-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          {label && (
            <span className="label-pill">
              <span className="label-dot" /> {label}
            </span>
          )}
          <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] text-navy md:text-4xl">{title}</h1>
          {description && <p className="mt-2 max-w-xl text-sm text-gray-500">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      </div>
    </header>
  );
}
