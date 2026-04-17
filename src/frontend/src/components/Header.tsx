import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Grid3X3, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Gmail", path: "/mail" },
  { label: "Maps", path: "/maps" },
  { label: "News", path: "/news" },
  { label: "Chat", path: "/chat" },
];

const ALL_APPS = [
  { label: "Mail", path: "/mail", emoji: "✉️" },
  { label: "Maps", path: "/maps", emoji: "🗺️" },
  { label: "News", path: "/news", emoji: "📰" },
  { label: "Chat", path: "/chat", emoji: "🤖" },
  { label: "Search", path: "/search", emoji: "🔍" },
  { label: "Calendar", path: "/", emoji: "📅" },
  { label: "Drive", path: "/", emoji: "☁️" },
  { label: "Translate", path: "/", emoji: "🌐" },
  { label: "Photos", path: "/", emoji: "🖼️" },
];

interface HeaderProps {
  showSearch?: boolean;
  initialQuery?: string;
  onSearch?: (query: string) => void;
}

export function Header({
  showSearch = true,
  initialQuery = "",
  onSearch,
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [localQuery, setLocalQuery] = useState(initialQuery);
  const [appsOpen, setAppsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const appsRef = useRef<HTMLDivElement>(null);

  const isSearchPage = location.pathname === "/search";

  useEffect(() => {
    setLocalQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (appsRef.current && !appsRef.current.contains(e.target as Node)) {
        setAppsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && localQuery.trim()) {
      onSearch?.(localQuery);
      if (!isSearchPage) {
        navigate({ to: "/search", search: { q: localQuery } });
      }
    }
  }

  function handleSubmit() {
    if (localQuery.trim()) {
      onSearch?.(localQuery);
      if (!isSearchPage) {
        navigate({ to: "/search", search: { q: localQuery } });
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-background shadow-header">
      <div className="flex items-center justify-between h-14 px-4 md:px-6 gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex-shrink-0 flex items-center"
          data-ocid="header.logo.link"
        >
          <span className="text-xl font-bold tracking-tight select-none">
            <span className="text-g-blue">S</span>
            <span className="text-g-red">e</span>
            <span className="text-g-yellow">a</span>
            <span className="text-g-blue">r</span>
            <span className="text-g-green">c</span>
            <span className="text-g-red">h</span>
            <span className="text-g-dark">Sphere</span>
          </span>
        </Link>

        {/* Search Bar — center */}
        {showSearch && (
          <div className="flex-1 max-w-[584px] hidden md:flex">
            <div className="relative flex items-center w-full border border-g-border rounded-full hover:shadow-search-hover focus-within:shadow-search-hover transition-smooth bg-background px-4 py-2 gap-2">
              <Search className="text-g-gray flex-shrink-0" size={18} />
              <input
                ref={inputRef}
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search or type a URL"
                className="flex-1 outline-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground min-w-0"
                data-ocid="header.search_input"
                aria-label="Search"
              />
              {localQuery && (
                <button
                  type="button"
                  onClick={() => setLocalQuery("")}
                  className="text-g-gray hover:text-foreground transition-smooth flex-shrink-0"
                  aria-label="Clear search"
                  data-ocid="header.clear_button"
                >
                  <X size={18} />
                </button>
              )}
              <div className="w-px h-5 bg-border flex-shrink-0" />
              <button
                type="button"
                onClick={handleSubmit}
                className="text-g-blue hover:text-primary transition-smooth flex-shrink-0"
                aria-label="Submit search"
                data-ocid="header.search_submit_button"
              >
                <Search size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Right Nav */}
        <div className="flex items-center gap-1">
          {/* Desktop nav links */}
          <nav
            className="hidden md:flex items-center gap-1 mr-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-g-gray hover:text-foreground nav-link-hover transition-smooth"
                data-ocid={`header.${link.label.toLowerCase()}.link`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Apps grid dropdown */}
          <div className="relative" ref={appsRef}>
            <button
              type="button"
              onClick={() => setAppsOpen(!appsOpen)}
              className="p-2 rounded-full nav-link-hover text-g-gray hover:text-foreground transition-smooth"
              aria-label="All apps"
              data-ocid="header.apps_grid.button"
            >
              <Grid3X3 size={20} />
            </button>
            {appsOpen && (
              <div
                className="absolute right-0 top-12 w-72 bg-background border border-border rounded-2xl shadow-elevated p-4 z-50 animate-fade-in"
                data-ocid="header.apps_grid.popover"
              >
                <p className="text-xs text-muted-foreground font-medium mb-3 px-1">
                  Apps
                </p>
                <div className="grid grid-cols-3 gap-1">
                  {ALL_APPS.map((app) => (
                    <Link
                      key={app.label}
                      to={app.path}
                      onClick={() => setAppsOpen(false)}
                      className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-muted transition-smooth cursor-pointer"
                      data-ocid={`header.app.${app.label.toLowerCase()}.link`}
                    >
                      <span className="text-2xl">{app.emoji}</span>
                      <span className="text-xs text-foreground">
                        {app.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User avatar */}
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-g-blue text-white text-sm font-semibold flex items-center justify-center ml-1 hover:shadow-elevated transition-smooth flex-shrink-0"
            aria-label="User account"
            data-ocid="header.user_avatar.button"
          >
            U
          </button>

          {/* Mobile menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
                data-ocid="header.mobile_menu.button"
              >
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-64 pt-8"
              data-ocid="header.mobile_menu.sheet"
            >
              <div className="flex flex-col gap-1">
                {showSearch && (
                  <div className="flex items-center border border-g-border rounded-full px-3 py-2 gap-2 mb-4">
                    <Search className="text-g-gray" size={16} />
                    <input
                      type="text"
                      value={localQuery}
                      onChange={(e) => setLocalQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Search"
                      className="flex-1 outline-none text-sm text-foreground placeholder:text-muted-foreground bg-transparent"
                      data-ocid="header.mobile_search_input"
                    />
                  </div>
                )}
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-3 rounded-lg text-sm text-foreground hover:bg-muted transition-smooth"
                    data-ocid={`header.mobile.${link.label.toLowerCase()}.link`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
