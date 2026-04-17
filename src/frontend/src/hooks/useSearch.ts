import type { SearchResult, SearchSuggestion } from "@/types";
import { useCallback, useMemo, useState } from "react";

const DEMO_RESULTS: SearchResult[] = [
  {
    id: "1",
    title: "Wikipedia — The Free Encyclopedia",
    url: "https://en.wikipedia.org",
    displayUrl: "en.wikipedia.org",
    snippet:
      "Wikipedia is a free content, multilingual online encyclopedia written and maintained by a community of volunteers through open collaboration and a wiki-based editing system.",
    type: "web",
    siteLinks: [
      { title: "Main Page", url: "https://en.wikipedia.org/wiki/Main_Page" },
      {
        title: "Contents",
        url: "https://en.wikipedia.org/wiki/Wikipedia:Contents",
      },
      {
        title: "Current Events",
        url: "https://en.wikipedia.org/wiki/Portal:Current_events",
      },
      {
        title: "Random Article",
        url: "https://en.wikipedia.org/wiki/Special:Random",
      },
    ],
  },
  {
    id: "2",
    title: "BBC News — World, US & UK Breaking News",
    url: "https://www.bbc.com/news",
    displayUrl: "www.bbc.com › news",
    snippet:
      "Visit BBC News for up-to-the-minute news, breaking news, video, audio and feature stories. BBC News provides trusted World and UK news as well as local and regional perspectives.",
    type: "news",
    date: "2 hours ago",
  },
  {
    id: "3",
    title: "GitHub: Let's build from here",
    url: "https://github.com",
    displayUrl: "github.com",
    snippet:
      "GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro.",
    type: "web",
    siteLinks: [
      { title: "Explore", url: "https://github.com/explore" },
      { title: "Trending", url: "https://github.com/trending" },
      { title: "Topics", url: "https://github.com/topics" },
      { title: "Collections", url: "https://github.com/collections" },
    ],
  },
  {
    id: "4",
    title: "Stack Overflow — Where Developers Learn, Share & Build",
    url: "https://stackoverflow.com",
    displayUrl: "stackoverflow.com",
    snippet:
      "Stack Overflow is the largest, most trusted online community for developers to learn, share their programming knowledge, and build their careers.",
    type: "web",
  },
  {
    id: "5",
    title: "MDN Web Docs — Resources for Developers",
    url: "https://developer.mozilla.org",
    displayUrl: "developer.mozilla.org",
    snippet:
      "The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.",
    type: "web",
  },
  {
    id: "6",
    title: "The Verge — Technology News & Reviews",
    url: "https://www.theverge.com",
    displayUrl: "www.theverge.com",
    snippet:
      "The Verge covers the intersection of technology, science, art, and culture. Our mission is to offer in-depth reporting and long-form feature stories about people and the industries that shape our digital world.",
    type: "news",
    date: "4 hours ago",
  },
  {
    id: "7",
    title: "React — The library for web and native user interfaces",
    url: "https://react.dev",
    displayUrl: "react.dev",
    snippet:
      "React lets you build user interfaces out of individual pieces called components. Create your own React components like Thumbnail, LikeButton, and Video. Then combine them into entire screens, pages, and apps.",
    type: "web",
  },
  {
    id: "8",
    title: "TypeScript: JavaScript With Syntax For Types",
    url: "https://www.typescriptlang.org",
    displayUrl: "www.typescriptlang.org",
    snippet:
      "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It adds optional static typing and class-based object-oriented programming.",
    type: "web",
  },
  {
    id: "9",
    title: "Hacker News — Tech & Startup Community",
    url: "https://news.ycombinator.com",
    displayUrl: "news.ycombinator.com",
    snippet:
      "Hacker News is a social news website focusing on computer science and entrepreneurship. It is run by the investment fund and startup incubator Y Combinator.",
    type: "web",
  },
  {
    id: "10",
    title: "Product Hunt — The best new products in tech",
    url: "https://www.producthunt.com",
    displayUrl: "www.producthunt.com",
    snippet:
      "Product Hunt is a curation of the best new products, every day. Discover the latest mobile apps, websites, and technology products that everyone's talking about.",
    type: "web",
  },
];

const SUGGESTIONS: Record<string, string[]> = {
  "": [],
  react: [
    "react tutorial",
    "react hooks",
    "react vs vue",
    "react native",
    "react router",
    "react query",
  ],
  type: [
    "typescript tutorial",
    "typescript vs javascript",
    "typescript types",
    "typecasting in javascript",
  ],
  java: [
    "javascript tutorial",
    "java vs javascript",
    "javascript frameworks",
    "javascript interview questions",
  ],
  how: [
    "how to learn programming",
    "how does the internet work",
    "how to start a blog",
    "how to make money online",
  ],
  best: [
    "best programming languages 2024",
    "best laptops for developers",
    "best web frameworks",
    "best free courses",
  ],
  what: [
    "what is artificial intelligence",
    "what is blockchain",
    "what is machine learning",
    "what is cloud computing",
  ],
};

function generateResultsForQuery(query: string): SearchResult[] {
  if (!query.trim()) return [];
  return DEMO_RESULTS.map((r, i) => ({
    ...r,
    id: `${r.id}-${i}`,
    title: r.title,
    snippet: `Results for "${query}" — ${r.snippet}`,
  }));
}

export function useSearch() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "all" | "news" | "images" | "videos" | "maps"
  >("all");

  const results = useMemo<SearchResult[]>(() => {
    if (!submittedQuery) return [];
    const all = generateResultsForQuery(submittedQuery);
    if (activeTab === "all") return all;
    if (activeTab === "news") return all.filter((r) => r.type === "news");
    return all;
  }, [submittedQuery, activeTab]);

  const resultCount = useMemo(() => {
    if (!submittedQuery) return 0;
    return Math.floor(Math.random() * 900000000) + 100000000;
  }, [submittedQuery]);

  const updateQuery = useCallback((q: string) => {
    setQuery(q);
    const prefix = Object.keys(SUGGESTIONS).find(
      (key) => q.toLowerCase().startsWith(key) && key.length > 0,
    );
    if (prefix && SUGGESTIONS[prefix]) {
      setSuggestions(
        SUGGESTIONS[prefix].map((text) => ({ text, type: "query" as const })),
      );
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(q.length > 0);
    }
  }, []);

  const submitSearch = useCallback(
    (q?: string) => {
      const searchQuery = q ?? query;
      if (!searchQuery.trim()) return;
      setIsSearching(true);
      setSubmittedQuery(searchQuery);
      setQuery(searchQuery);
      setShowSuggestions(false);
      setTimeout(() => setIsSearching(false), 300);
    },
    [query],
  );

  const clearSearch = useCallback(() => {
    setQuery("");
    setSubmittedQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  }, []);

  return {
    query,
    submittedQuery,
    results,
    resultCount,
    isSearching,
    suggestions,
    showSuggestions,
    activeTab,
    setActiveTab,
    updateQuery,
    submitSearch,
    clearSearch,
    setShowSuggestions,
  };
}
