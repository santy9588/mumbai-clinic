const FOOTER_LEFT = [
  { label: "About", href: "#" },
  { label: "Advertising", href: "#" },
  { label: "Business", href: "#" },
  { label: "How Search works", href: "#" },
];

const FOOTER_RIGHT = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Settings", href: "#" },
];

interface FooterProps {
  variant?: "home" | "inner";
}

export function Footer({ variant = "inner" }: FooterProps) {
  const isHome = variant === "home";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  )}`;

  return (
    <footer
      className={`w-full border-t border-border ${isHome ? "bg-g-light" : "bg-muted"}`}
      data-ocid="footer.section"
    >
      {/* Country row */}
      <div
        className={`px-4 md:px-8 py-3 border-b border-border ${isHome ? "bg-g-light" : "bg-muted"}`}
      >
        <span className="text-sm text-g-gray">India</span>
      </div>

      {/* Links row */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 md:px-8 py-3 gap-2">
        <nav
          className="flex flex-wrap items-center gap-4"
          aria-label="Footer navigation"
        >
          {FOOTER_LEFT.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-g-gray hover:text-foreground hover:underline transition-smooth"
              data-ocid={`footer.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <nav
          className="flex flex-wrap items-center gap-4"
          aria-label="Footer legal navigation"
        >
          {FOOTER_RIGHT.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-g-gray hover:text-foreground hover:underline transition-smooth"
              data-ocid={`footer.${link.label.toLowerCase()}.link`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
            data-ocid="footer.caffeine.link"
          >
            Built with caffeine.ai
          </a>
        </nav>
      </div>
    </footer>
  );
}
