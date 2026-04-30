export function FacultyHero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_24%),linear-gradient(135deg,var(--brand-950)_0%,var(--brand-800)_46%,var(--brand-500)_100%)] py-20 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:84px_84px] opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
          Faculty Network
        </p>
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          Meet the minds behind the learning experience.
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-white/80">
          Learn from experienced faculty across nutrition, wellness, and
          lifestyle sciences who bring both depth and real practice into every
          session.
        </p>
      </div>
    </section>
  );
}
