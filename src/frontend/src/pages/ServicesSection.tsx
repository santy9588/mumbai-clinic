import { useLang } from "@/context/LanguageContext";

export function ServicesSection() {
  const { t } = useLang();

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3 bg-accent/10 px-3 py-1 rounded-full">
            {t.services.badge}
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground text-balance">
            {t.services.heading}
          </h2>
          <p className="mt-3 text-muted-foreground text-base max-w-xl mx-auto">
            {t.services.subheading}
          </p>
        </div>

        {/* Grid */}
        <div
          data-ocid="services.list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {t.services.list.map((svc, i) => (
            <div
              key={svc.title}
              data-ocid={`services.item.${i + 1}`}
              className="bg-card rounded-2xl p-6 shadow-subtle border border-border hover:shadow-elevated hover:-translate-y-0.5 transition-smooth group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-smooth">
                {svc.icon}
              </div>
              <h3 className="font-display font-semibold text-foreground text-base mb-2">
                {svc.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {svc.description}
              </p>
              <button
                type="button"
                data-ocid={`services.learn_more_button.${i + 1}`}
                onClick={() => {
                  const el = document.querySelector("#contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-primary text-sm font-medium hover:underline flex items-center gap-1 transition-smooth"
              >
                {t.services.learnMore} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
