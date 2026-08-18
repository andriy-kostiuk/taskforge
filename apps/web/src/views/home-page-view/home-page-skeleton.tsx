export const HomePageSkeleton = () => {
  return (
    <section className="bg-linear-to-b from-background via-background to-muted/30 py-8 sm:py-10 lg:py-12">
      <div className="mx-auto flex w-full max-w-content flex-col gap-6 px-3 xs:px-3 sm:px-4 lg:px-8 xl:px-16">
        <div className="h-64 animate-pulse rounded-3xl border border-border/70 bg-card/80" />

        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-32 animate-pulse rounded-2xl border border-border/70 bg-card/70" />
          <div className="h-32 animate-pulse rounded-2xl border border-border/70 bg-card/70" />
          <div className="h-32 animate-pulse rounded-2xl border border-border/70 bg-card/70" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.9fr)]">
          <div className="h-[28rem] animate-pulse rounded-3xl border border-border/70 bg-card/70" />
          <div className="h-[28rem] animate-pulse rounded-3xl border border-border/70 bg-card/70" />
        </div>
      </div>
    </section>
  );
};
