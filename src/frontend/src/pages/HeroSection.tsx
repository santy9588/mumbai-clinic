import { Button } from "@/components/ui/button";
import { useLang } from "@/context/LanguageContext";
import { Calendar, Phone, Star } from "lucide-react";

export function HeroSection() {
  const { t } = useLang();

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-clinic.dim_1200x600.jpg"
          alt="Mumbai Clinic team"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-lg">
          {/* Rating badge */}
          <div
            data-ocid="hero.rating_badge"
            className="inline-flex items-center gap-1.5 bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-3 py-1.5 mb-6"
          >
            {[1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
              />
            ))}
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/50" />
            <span className="text-primary-foreground text-sm font-semibold ml-1">
              {t.hero.rating}
            </span>
            <span className="text-primary-foreground/70 text-xs">
              ({t.hero.reviews})
            </span>
          </div>

          <h1 className="font-display font-bold text-primary-foreground text-5xl sm:text-6xl leading-tight text-balance mb-2">
            {t.hero.title}
          </h1>
          <p className="font-display text-primary-foreground/85 text-2xl sm:text-3xl font-medium mb-6">
            {t.hero.subtitle}
          </p>
          <p className="text-primary-foreground/75 text-base sm:text-lg leading-relaxed mb-8 max-w-md text-balance">
            {t.hero.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              data-ocid="hero.book_appointment_button"
              onClick={() => handleScroll("#contact")}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-6 py-3 h-auto rounded-xl shadow-elevated transition-smooth"
              size="lg"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {t.hero.bookAppointment}
            </Button>
            <a
              href="tel:+918080713636"
              data-ocid="hero.call_button"
              className="flex items-center justify-center gap-2 bg-transparent border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-6 py-3 rounded-xl transition-smooth text-sm"
            >
              <Phone className="w-4 h-4" />
              {t.hero.callNow}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10" aria-hidden="true">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-12"
          role="presentation"
        >
          <title>decorative wave</title>
          <path
            d="M0 60L1440 60L1440 30C1200 60 960 0 720 30C480 60 240 0 0 30L0 60Z"
            fill="oklch(0.98 0.008 230)"
          />
        </svg>
      </div>
    </section>
  );
}
