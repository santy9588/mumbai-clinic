import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLang } from "@/context/LanguageContext";
import { Menu, Phone, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const navIds = [
  { key: "home" as const, href: "#home" },
  { key: "services" as const, href: "#services" },
  { key: "reviews" as const, href: "#reviews" },
  { key: "contact" as const, href: "#contact" },
];

export function Header() {
  const { t, lang, toggleLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-elevated border-b border-border"
          : "bg-primary"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <button
          type="button"
          data-ocid="header.home_link"
          onClick={() => handleNavClick("#home")}
          className="flex items-center gap-2 group"
          aria-label="Mumbai Clinic – Go to top"
        >
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-smooth ${
              scrolled ? "bg-primary" : "bg-primary-foreground/20"
            }`}
          >
            <Plus className="w-5 h-5 text-primary-foreground" strokeWidth={3} />
          </div>
          <div className="leading-tight">
            <p
              className={`font-display font-bold text-base leading-none transition-smooth ${
                scrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              Mumbai Clinic
            </p>
            <p
              className={`text-[11px] leading-none mt-0.5 transition-smooth ${
                scrolled
                  ? "text-muted-foreground"
                  : "text-primary-foreground/80"
              }`}
            >
              {lang === "hi" ? "मुंबई क्लीनिक" : "Professional Medical"}
            </p>
          </div>
        </button>

        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {navIds.map(({ key, href }) => (
            <button
              key={key}
              type="button"
              data-ocid={`nav.${key}_link`}
              onClick={() => handleNavClick(href)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth ${
                scrolled
                  ? "text-foreground hover:bg-muted hover:text-primary"
                  : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              {t.nav[key]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            data-ocid="header.lang_toggle"
            onClick={toggleLang}
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-smooth ${
              scrolled
                ? "border-border text-foreground hover:bg-muted"
                : "border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
            }`}
            aria-label="Toggle language"
          >
            EN | हिं
          </button>

          <a
            href="tel:+918080713636"
            data-ocid="header.call_button"
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth ${
              scrolled
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            Call Us
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                data-ocid="header.menu_button"
                className={`md:hidden transition-smooth ${
                  scrolled
                    ? "text-foreground"
                    : "text-primary-foreground hover:bg-primary-foreground/10"
                }`}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 bg-card"
              data-ocid="header.mobile_drawer"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 pb-6 border-b border-border">
                  <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                    <Plus
                      className="w-5 h-5 text-primary-foreground"
                      strokeWidth={3}
                    />
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground">
                      Mumbai Clinic
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Dr. Atul Mashru
                    </p>
                  </div>
                </div>
                <nav className="flex flex-col gap-1 mt-6">
                  {navIds.map(({ key, href }) => (
                    <button
                      key={key}
                      type="button"
                      data-ocid={`mobile_nav.${key}_link`}
                      onClick={() => handleNavClick(href)}
                      className="text-left px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-smooth"
                    >
                      {t.nav[key]}
                    </button>
                  ))}
                </nav>
                <div className="mt-auto pt-6 border-t border-border">
                  <a
                    href="tel:+918080713636"
                    data-ocid="mobile_nav.call_button"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm transition-smooth hover:bg-primary/90"
                  >
                    <Phone className="w-4 h-4" />
                    +91 80807 13636
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
