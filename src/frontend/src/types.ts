export interface SearchResult {
  id: string;
  title: string;
  url: string;
  displayUrl: string;
  snippet: string;
  favicon?: string;
  type: "web" | "news" | "video" | "image";
  date?: string;
  siteLinks?: { title: string; url: string }[];
}

export interface EmailMessage {
  id: string;
  from: string;
  fromEmail: string;
  subject: string;
  snippet: string;
  body: string;
  date: string;
  read: boolean;
  starred: boolean;
  label: "inbox" | "sent" | "drafts" | "spam" | "trash";
  avatar?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  url: string;
  imageUrl?: string;
  snippet: string;
  publishedAt: string;
  category:
    | "top"
    | "technology"
    | "business"
    | "science"
    | "entertainment"
    | "sports"
    | "health";
  author?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface MapLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating?: number;
  category: string;
  phone?: string;
  website?: string;
  hours?: string;
  photos?: string[];
}

export interface SearchSuggestion {
  text: string;
  type: "query" | "url" | "calculator";
}

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}
