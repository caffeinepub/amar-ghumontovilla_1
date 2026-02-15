interface SectionHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export default function SectionHero({ title, subtitle, description }: SectionHeroProps) {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/5">
      <div className="absolute inset-0">
        <img
          src="/assets/generated/flower-bouquet-hero.dim_1920x800.png"
          alt="Floral bouquet hero"
          className="w-full h-full object-cover opacity-30 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>
      
      <div className="relative container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary drop-shadow-sm font-bengali">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-foreground/80 font-medium">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
