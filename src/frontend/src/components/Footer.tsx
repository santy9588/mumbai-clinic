import { useLang } from "@/context/LanguageContext";
import { Clock, Globe, MapPin, Phone } from "lucide-react";

const rainbowColors = [
  "#E40303",
  "#FF8C00",
  "#FFED00",
  "#008026",
  "#004DFF",
  "#750787",
];

export function Footer() {
  const { t, lang } = useLang();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  )}`;

  return (
    <footer
      className="bg-card border-t border-border"
      data-ocid="footer.section"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand + tagline */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  +
                </span>
              </div>
              <div>
                <p className="font-display font-bold text-foreground text-base leading-none">
                  {lang === "hi" ? "मुंबई क्लीनिक" : "Mumbai Clinic"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {lang === "hi" ? "डॉ. अतुल माशरू" : "Dr. Atul Mashru"}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{t.footer.tagline}</p>
            <a
              href="https://mumbaiclinic.com"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.website_link"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <Globe className="w-3.5 h-3.5" />
              mumbaiclinic.com
            </a>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-foreground text-sm uppercase tracking-wide">
              {lang === "hi" ? "संपर्क जानकारी" : "Contact Information"}
            </h3>
            <div className="space-y-3">
              <div className="flex gap-2.5">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.footer.address}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a
                  href="tel:+918080713636"
                  data-ocid="footer.phone_link"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  {t.footer.phone}
                </a>
              </div>
              <div className="flex gap-2.5">
                <Clock className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <div className="text-sm text-muted-foreground space-y-0.5">
                  <p>
                    {lang === "hi"
                      ? "सोम–शनि: 10:00 – 14:00 और 17:00 – 21:00"
                      : "Mon–Sat: 10 am–2 pm & 5 pm–9 pm"}
                  </p>
                  <p>
                    {lang === "hi" ? "रवि: अपॉइंटमेंट पर" : "Sun: By Appointment"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* LGBTQ+ badge */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-foreground text-sm uppercase tracking-wide">
              {lang === "hi" ? "हमारी प्रतिबद्धता" : "Our Commitment"}
            </h3>
            <div
              data-ocid="footer.lgbtq_badge"
              className="inline-flex items-center gap-3 px-4 py-3 bg-background rounded-2xl border border-border shadow-subtle"
            >
              {/* Rainbow flag icon */}
              <div className="flex flex-col gap-px w-7 overflow-hidden rounded-sm shrink-0">
                {rainbowColors.map((c) => (
                  <div
                    key={c}
                    className="h-1.5 w-full"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">
                  {t.footer.lgbtqFriendly}
                </p>
                <p className="text-xs text-muted-foreground">
                  {lang === "hi"
                    ? "सभी का स्वागत है"
                    : "Everyone is welcome here"}
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              {lang === "hi"
                ? "हम सभी पृष्ठभूमि और पहचान के रोगियों का स्वागत करते हैं। आपकी देखभाल हमारी प्राथमिकता है।"
                : "We welcome patients of all backgrounds and identities. Your care is our priority."}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            {t.footer.copyright}{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-center sm:text-right">
            {lang === "hi"
              ? "429 राजा राम मोहन रॉय मार्ग, गिरगांव, मुंबई 400004"
              : "429 Raja Ram Mohan Roy Rd, Girgaon, Mumbai 400004"}
          </p>
        </div>
      </div>
    </footer>
  );
}
