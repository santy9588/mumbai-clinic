import type { NewsArticle } from "@/types";
import { Clock, ExternalLink, TrendingUp } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  { id: "top", label: "Top stories" },
  { id: "technology", label: "Technology" },
  { id: "business", label: "Business" },
  { id: "science", label: "Science" },
  { id: "entertainment", label: "Entertainment" },
  { id: "sports", label: "Sports" },
  { id: "health", label: "Health" },
] as const;

const DEMO_ARTICLES: NewsArticle[] = [
  {
    id: "1",
    title:
      "Google Announces Next-Generation AI Models with Unprecedented Reasoning Capabilities",
    source: "The Verge",
    url: "#",
    snippet:
      "The tech giant unveiled its latest Gemini Ultra 2 model, showcasing dramatic improvements in mathematical reasoning, code generation, and multimodal understanding.",
    publishedAt: "2 hours ago",
    category: "technology",
    author: "Alex Heath",
  },
  {
    id: "2",
    title: "OpenAI Raises $6.5 Billion to Accelerate AGI Development",
    source: "TechCrunch",
    url: "#",
    snippet:
      "The artificial intelligence company secured one of the largest funding rounds in tech history, valuing the company at $157 billion.",
    publishedAt: "4 hours ago",
    category: "technology",
    author: "Manish Singh",
  },
  {
    id: "3",
    title:
      "Federal Reserve Holds Interest Rates Steady Amid Economic Uncertainty",
    source: "Reuters",
    url: "#",
    snippet:
      "The US central bank maintained its benchmark overnight borrowing rate in a range between 4.25% and 4.5% for the second consecutive meeting.",
    publishedAt: "6 hours ago",
    category: "business",
  },
  {
    id: "4",
    title: "SpaceX Starship Successfully Completes First Fully Reusable Flight",
    source: "Space.com",
    url: "#",
    snippet:
      "Elon Musk's rocket company achieved a historic milestone as both the Super Heavy booster and Starship upper stage were successfully caught and reused.",
    publishedAt: "8 hours ago",
    category: "science",
    author: "Mike Wall",
  },
  {
    id: "5",
    title: "Apple Vision Pro 2 Leaked Specifications Reveal Major Improvements",
    source: "MacRumors",
    url: "#",
    snippet:
      "New supply chain reports suggest the second-generation headset will feature a significantly lighter design, improved battery life, and M4 chip integration.",
    publishedAt: "10 hours ago",
    category: "technology",
  },
  {
    id: "6",
    title: "Champions League Final Sets Record Viewership of 550 Million",
    source: "BBC Sport",
    url: "#",
    snippet:
      "The match between Real Madrid and Manchester City drew the largest live sports audience in European football history.",
    publishedAt: "Yesterday",
    category: "sports",
  },
  {
    id: "7",
    title:
      "New Study Links Mediterranean Diet to 30% Lower Risk of Heart Disease",
    source: "Harvard Health",
    url: "#",
    snippet:
      "Researchers followed 75,000 participants over 15 years, finding significant cardiovascular benefits from diets rich in olive oil, fish, and vegetables.",
    publishedAt: "Yesterday",
    category: "health",
  },
  {
    id: "8",
    title: "Netflix's New AI-Generated Drama Series Breaks Streaming Records",
    source: "Variety",
    url: "#",
    snippet:
      "The experimental production, which used AI tools for screenplay assistance and visual effects, attracted 45 million viewers in its first week.",
    publishedAt: "2 days ago",
    category: "entertainment",
  },
];

const TRENDING_TOPICS = [
  "AI regulation 2026",
  "Climate summit",
  "Stock market rally",
  "FIFA World Cup",
  "New cancer treatment",
  "SpaceX Mars mission",
  "Crypto ETF approval",
  "Electric vehicle sales",
];

function ArticleCard({
  article,
  variant = "default",
}: { article: NewsArticle; variant?: "default" | "featured" }) {
  if (variant === "featured") {
    return (
      <a
        href={article.url}
        className="block group"
        data-ocid={`news.article.featured.${article.id}`}
      >
        <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-card transition-smooth">
          <div className="aspect-[16/9] bg-gradient-to-br from-g-blue/20 to-g-green/20 flex items-center justify-center">
            <span className="text-4xl">📰</span>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-g-blue">
                {article.source}
              </span>
              <span className="text-xs text-muted-foreground">·</span>
              <div className="flex items-center gap-1">
                <Clock size={11} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {article.publishedAt}
                </span>
              </div>
            </div>
            <h3 className="font-semibold text-g-dark text-base leading-snug group-hover:text-g-blue transition-smooth line-clamp-2">
              {article.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {article.snippet}
            </p>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={article.url}
      className="flex items-start gap-4 py-3 group border-b border-border last:border-0"
      data-ocid={`news.article.item.${article.id}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-g-blue">
            {article.source}
          </span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">
            {article.publishedAt}
          </span>
        </div>
        <h3 className="text-sm font-medium text-g-dark group-hover:text-g-blue transition-smooth line-clamp-2 leading-snug">
          {article.title}
        </h3>
      </div>
      <div className="w-20 h-16 flex-shrink-0 rounded-lg bg-gradient-to-br from-muted to-border flex items-center justify-center text-lg overflow-hidden">
        📰
      </div>
    </a>
  );
}

export function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("top");

  const filtered = DEMO_ARTICLES.filter(
    (a) => activeCategory === "top" || a.category === activeCategory,
  );
  const featuredArticles = filtered.slice(0, 3);
  const listArticles = filtered.slice(3);

  return (
    <div className="bg-background min-h-full" data-ocid="news.page">
      {/* Category tabs */}
      <div className="border-b border-border bg-background sticky top-14 z-10">
        <div
          className="max-w-5xl mx-auto px-4 flex items-center overflow-x-auto gap-1 no-scrollbar"
          data-ocid="news.categories.tabs"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-smooth ${
                activeCategory === cat.id
                  ? "border-g-blue text-g-blue"
                  : "border-transparent text-g-gray hover:text-foreground"
              }`}
              data-ocid={`news.category.${cat.id}.tab`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Featured articles grid */}
            {featuredArticles.length > 0 && (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
                data-ocid="news.featured.section"
              >
                {featuredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    variant="featured"
                  />
                ))}
              </div>
            )}

            {/* List articles */}
            {listArticles.length > 0 && (
              <div
                className="bg-card border border-border rounded-xl p-4"
                data-ocid="news.articles.list"
              >
                <h2 className="text-sm font-semibold text-g-dark mb-3">
                  More stories
                </h2>
                {listArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="py-20 text-center" data-ocid="news.empty_state">
                <span className="text-5xl mb-4 block">📰</span>
                <p className="text-lg text-foreground mb-2">
                  No articles in this category
                </p>
                <p className="text-sm text-muted-foreground">
                  Check back later for updates.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar — Trending */}
          <aside
            className="w-64 flex-shrink-0 hidden lg:block"
            data-ocid="news.trending.section"
          >
            <div className="bg-card border border-border rounded-xl p-4 sticky top-28">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-g-blue" />
                <h3 className="text-sm font-semibold text-g-dark">Trending</h3>
              </div>
              <div className="space-y-1">
                {TRENDING_TOPICS.map((topic, i) => (
                  <a
                    key={topic}
                    href={`/search?q=${encodeURIComponent(topic)}`}
                    className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-muted transition-smooth group"
                    data-ocid={`news.trending.item.${i + 1}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-4">
                        {i + 1}
                      </span>
                      <span className="text-sm text-g-dark group-hover:text-g-blue transition-smooth">
                        {topic}
                      </span>
                    </div>
                    <ExternalLink
                      size={12}
                      className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth"
                    />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
