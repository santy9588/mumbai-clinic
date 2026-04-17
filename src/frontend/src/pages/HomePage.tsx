import { useNavigate } from "@tanstack/react-router";
import { Mic, Search } from "lucide-react";
import { useRef, useState } from "react";

const QUICK_LINKS = [
  { label: "Gmail", path: "/mail", emoji: "✉️", bg: "bg-primary/10" },
  { label: "Maps", path: "/maps", emoji: "🗺️", bg: "bg-accent/20" },
  { label: "Chat AI", path: "/chat", emoji: "🤖", bg: "bg-secondary/20" },
  { label: "News", path: "/news", emoji: "📰", bg: "bg-muted" },
];

const TRENDING = [
  "artificial intelligence 2026",
  "web development trends",
  "typescript best practices",
  "react server components",
  "internet computer blockchain",
];

export function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSearch(q?: string) {
    const searchQuery = q ?? query;
    if (!searchQuery.trim()) return;
    navigate({ to: "/search", search: { q: searchQuery } });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") {
      setFocused(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top right nav */}
      <div className="flex items-center justify-end px-6 pt-4 gap-3">
        <a
          href="/mail"
          className="text-sm text-g-dark hover:underline transition-smooth"
          data-ocid="home.gmail.link"
        >
          Gmail
        </a>
        <button
          type="button"
          className="text-sm text-g-dark hover:underline transition-smooth bg-transparent border-none cursor-pointer p-0"
          data-ocid="home.images.link"
          aria-label="Images"
        >
          Images
        </button>
        <button
          type="button"
          className="p-2 rounded-full hover:bg-muted transition-smooth text-g-gray"
          aria-label="All apps"
          data-ocid="home.apps.button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          </svg>
        </button>
        <button
          type="button"
          className="w-8 h-8 rounded-full bg-g-blue text-white text-sm font-semibold flex items-center justify-center hover:shadow-elevated transition-smooth"
          aria-label="User account"
          data-ocid="home.user_avatar.button"
        >
          U
        </button>
      </div>

      {/* Main centered content */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-4 pb-24"
        style={{ marginTop: "-40px" }}
      >
        {/* Logo */}
        <div className="mb-8 select-none" data-ocid="home.logo.section">
          <h1 className="text-8xl font-bold tracking-tight">
            <span className="text-g-blue">S</span>
            <span className="text-g-red">e</span>
            <span className="text-g-yellow">a</span>
            <span className="text-g-blue">r</span>
            <span className="text-g-green">c</span>
            <span className="text-g-red">h</span>
            <span className="text-g-dark">S</span>
            <span className="text-g-blue">p</span>
            <span className="text-g-yellow">h</span>
            <span className="text-g-green">e</span>
            <span className="text-g-red">r</span>
            <span className="text-g-dark">e</span>
          </h1>
        </div>

        {/* Search box */}
        <div className="w-full max-w-[584px]" data-ocid="home.search.section">
          <label
            htmlFor="home-search"
            className={`flex items-center border rounded-full px-5 py-3 gap-3 bg-background transition-smooth cursor-text ${
              focused
                ? "shadow-search border-transparent"
                : "border-border hover:shadow-search-hover hover:border-transparent"
            }`}
          >
            <Search className="text-g-gray flex-shrink-0" size={20} />
            <input
              ref={inputRef}
              id="home-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              placeholder="Search or type a URL"
              className="flex-1 outline-none bg-transparent text-base text-foreground placeholder:text-muted-foreground min-w-0"
              data-ocid="home.search_input"
              aria-label="Search the web"
            />
            {query && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuery("");
                }}
                className="text-g-gray hover:text-foreground transition-smooth flex-shrink-0"
                aria-label="Clear"
              >
                ×
              </button>
            )}
            <button
              type="button"
              className="text-g-gray hover:text-foreground transition-smooth flex-shrink-0"
              aria-label="Search by voice"
              data-ocid="home.voice_search.button"
            >
              <Mic size={20} />
            </button>
          </label>

          {/* Trending suggestions when focused */}
          {focused && !query && (
            <div
              className="mt-1 bg-background border border-border rounded-2xl shadow-elevated py-2 z-10 relative"
              data-ocid="home.suggestions.popover"
            >
              <p className="px-4 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Trending
              </p>
              {TRENDING.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-smooth text-left"
                  onMouseDown={() => handleSearch(suggestion)}
                  data-ocid={`home.suggestion.item.${TRENDING.indexOf(suggestion) + 1}`}
                >
                  <Search
                    size={14}
                    className="text-muted-foreground flex-shrink-0"
                  />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div
          className="flex items-center gap-3 mt-8"
          data-ocid="home.actions.section"
        >
          <button
            type="button"
            onClick={() => handleSearch()}
            className="px-5 py-2.5 bg-g-light border border-g-border text-g-dark text-sm rounded hover:border-g-gray hover:shadow-search-hover transition-smooth font-medium"
            data-ocid="home.search_button"
          >
            SearchSphere Search
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/chat" })}
            className="px-5 py-2.5 bg-g-light border border-g-border text-g-dark text-sm rounded hover:border-g-gray hover:shadow-search-hover transition-smooth font-medium"
            data-ocid="home.feeling_lucky.button"
          >
            I'm Feeling Lucky
          </button>
        </div>

        {/* Quick links */}
        <div
          className="flex items-center gap-6 mt-10"
          data-ocid="home.quick_links.section"
        >
          {QUICK_LINKS.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className="flex flex-col items-center gap-2 group"
              data-ocid={`home.quick_link.${link.label.toLowerCase().replace(/\s+/g, "_")}`}
            >
              <div
                className={`w-14 h-14 ${link.bg} rounded-full flex items-center justify-center text-2xl group-hover:shadow-sm transition-smooth`}
              >
                {link.emoji}
              </div>
              <span className="text-xs text-g-dark group-hover:underline">
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
