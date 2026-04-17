import { useSearch } from "@/hooks/useSearch";
import type { SearchResult } from "@/types";
import {
  useNavigate,
  useSearch as useSearchParams,
} from "@tanstack/react-router";
import {
  Clock,
  Image,
  MapPin,
  Newspaper,
  Search,
  Video,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TABS = [
  { id: "all", label: "All", icon: Search },
  { id: "news", label: "News", icon: Newspaper },
  { id: "images", label: "Images", icon: Image },
  { id: "videos", label: "Videos", icon: Video },
  { id: "maps", label: "Maps", icon: MapPin },
] as const;

function ResultCard({
  result,
  index,
}: { result: SearchResult; index: number }) {
  return (
    <div
      className="py-4 max-w-[652px]"
      data-ocid={`search.result.item.${index}`}
    >
      {/* URL + favicon */}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center text-[8px] font-bold text-muted-foreground overflow-hidden flex-shrink-0">
          {result.displayUrl.charAt(0).toUpperCase()}
        </div>
        <span className="text-xs text-g-dark truncate">
          {result.displayUrl}
        </span>
      </div>
      {/* Title */}
      <a
        href={result.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-lg text-g-blue hover:underline mb-1 leading-snug"
        data-ocid={`search.result.title.${index}`}
      >
        {result.title}
      </a>
      {/* Date for news */}
      {result.date && (
        <div className="flex items-center gap-1 mb-1">
          <Clock size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{result.date}</span>
        </div>
      )}
      {/* Snippet */}
      <p className="text-sm text-g-dark leading-relaxed line-clamp-2">
        {result.snippet}
      </p>
      {/* Sitelinks */}
      {result.siteLinks && result.siteLinks.length > 0 && (
        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2">
          {result.siteLinks.map((sl) => (
            <a
              key={sl.url}
              href={sl.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-g-blue hover:underline"
            >
              {sl.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5"];

export function SearchPage() {
  const params = useSearchParams({ from: "/search" });
  const navigate = useNavigate();
  const {
    submittedQuery,
    results,
    resultCount,
    isSearching,
    activeTab,
    setActiveTab,
    submitSearch,
  } = useSearch();
  const [localQuery, setLocalQuery] = useState(params.q || "");
  const inputRef = useRef<HTMLInputElement>(null);
  const submitSearchRef = useRef(submitSearch);
  submitSearchRef.current = submitSearch;

  useEffect(() => {
    if (params.q) {
      setLocalQuery(params.q);
      submitSearchRef.current(params.q);
    }
  }, [params.q]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && localQuery.trim()) {
      submitSearch(localQuery);
      navigate({ to: "/search", search: { q: localQuery } });
    }
  }

  function handleSubmit() {
    if (localQuery.trim()) {
      submitSearch(localQuery);
      navigate({ to: "/search", search: { q: localQuery } });
    }
  }

  const formatCount = (n: number) => n.toLocaleString("en-US");

  return (
    <div
      className="flex flex-col min-h-full bg-background"
      data-ocid="search.page"
    >
      {/* Search bar row */}
      <div className="flex items-center gap-4 px-4 md:px-6 py-3 border-b border-border">
        {/* Logo */}
        <a
          href="/"
          className="flex-shrink-0 hidden sm:block"
          data-ocid="search.logo.link"
        >
          <span className="text-2xl font-bold">
            <span className="text-g-blue">S</span>
            <span className="text-g-red">S</span>
          </span>
        </a>

        {/* Search input */}
        <div className="flex-1 max-w-[584px]">
          <div className="flex items-center border border-g-border rounded-full px-4 py-2.5 gap-2 bg-background hover:shadow-search-hover focus-within:shadow-search-hover transition-smooth">
            <input
              ref={inputRef}
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search"
              className="flex-1 outline-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground min-w-0"
              data-ocid="search.search_input"
              aria-label="Search"
            />
            {localQuery && (
              <button
                type="button"
                onClick={() => setLocalQuery("")}
                className="text-g-gray hover:text-foreground transition-smooth flex-shrink-0 text-lg leading-none"
                aria-label="Clear"
                data-ocid="search.clear_button"
              >
                <X size={16} />
              </button>
            )}
            <div className="w-px h-5 bg-border" />
            <button
              type="button"
              onClick={handleSubmit}
              className="text-g-blue flex-shrink-0 hover:text-primary transition-smooth"
              aria-label="Search"
              data-ocid="search.submit_button"
            >
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex items-center gap-1 px-4 md:px-[calc(160px+1.5rem)] border-b border-border overflow-x-auto"
        data-ocid="search.tabs.section"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-3 text-sm border-b-2 transition-smooth whitespace-nowrap ${
              activeTab === tab.id
                ? "border-g-blue text-g-blue"
                : "border-transparent text-g-gray hover:text-foreground"
            }`}
            data-ocid={`search.tab.${tab.id}`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results area */}
      <div className="flex gap-8 px-4 md:px-6 pt-4 pb-8">
        {/* Left column — results */}
        <div className="flex-1 max-w-[652px] md:ml-[160px]">
          {isSearching ? (
            <div data-ocid="search.loading_state" className="space-y-6">
              {SKELETON_KEYS.map((key) => (
                <div key={key} className="py-4 space-y-2 animate-pulse">
                  <div className="h-3 bg-muted rounded w-48" />
                  <div className="h-5 bg-muted rounded w-80" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            <>
              {/* Result count */}
              <p
                className="text-sm text-muted-foreground mb-4"
                data-ocid="search.result_count"
              >
                About {formatCount(resultCount)} results (0.42 seconds)
              </p>
              {/* Results list */}
              <div
                data-ocid="search.results.list"
                className="divide-y divide-transparent"
              >
                {results.map((result, index) => (
                  <ResultCard
                    key={result.id}
                    result={result}
                    index={index + 1}
                  />
                ))}
              </div>
            </>
          ) : submittedQuery ? (
            <div
              className="py-12 text-center"
              data-ocid="search.no_results.empty_state"
            >
              <p className="text-lg text-foreground mb-2">
                No results found for <strong>"{submittedQuery}"</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Try different keywords or check your spelling.
              </p>
            </div>
          ) : (
            <div className="py-12 text-center" data-ocid="search.empty_state">
              <Search
                size={48}
                className="mx-auto text-muted-foreground mb-4"
              />
              <p className="text-lg text-foreground mb-2">
                Enter a search query above
              </p>
              <p className="text-sm text-muted-foreground">
                Search the web, find information, and discover content.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
