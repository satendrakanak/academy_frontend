import Container from "../container";

interface PageHeroProps {
  pageTitle: string;
  pageHeadline: string;
  pageDescription: string;
}

export function PageHero({
  pageTitle,
  pageHeadline,
  pageDescription,
}: PageHeroProps) {
  return (
    <section className="academy-hero-gradient relative overflow-hidden py-20 text-white">
      <div className="academy-hero-grid absolute inset-0 opacity-20" />
      <Container>
        <div className="relative">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
            {pageTitle}
          </p>
          <h1 className="max-w-3xl text-4xl font-bold md:text-5xl leading-tight">
            {pageHeadline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            {pageDescription}
          </p>
        </div>
      </Container>
    </section>
  );
}
