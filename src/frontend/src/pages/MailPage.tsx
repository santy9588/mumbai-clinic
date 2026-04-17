import { Button } from "@/components/ui/button";
import type { EmailMessage } from "@/types";
import {
  AlertCircle,
  FileText,
  Inbox,
  Plus,
  RefreshCw,
  Search,
  Send,
  Star,
  Trash2,
} from "lucide-react";
import { useState } from "react";

const DEMO_EMAILS: EmailMessage[] = [
  {
    id: "1",
    from: "GitHub",
    fromEmail: "noreply@github.com",
    subject: "Your weekly digest — trending repositories",
    snippet:
      "This week's top repositories: TypeScript 5.4, React 19 RC, Bun 1.0 performance benchmarks...",
    body: "Discover the most popular open source projects this week.",
    date: "10:32 AM",
    read: false,
    starred: true,
    label: "inbox",
  },
  {
    id: "2",
    from: "Google Workspace",
    fromEmail: "workspace@google.com",
    subject: "Your SearchSphere storage is almost full",
    snippet:
      "You're using 14.5 GB of your 15 GB. Upgrade to Google One to get more storage...",
    body: "Upgrade your storage plan to keep your files safe.",
    date: "9:15 AM",
    read: false,
    starred: false,
    label: "inbox",
  },
  {
    id: "3",
    from: "Hacker News",
    fromEmail: "digest@hackernewsletter.com",
    subject: "Hacker News Digest — Top Stories This Week",
    snippet:
      "Ask HN: Best resources for learning systems programming in 2026? | Show HN: I built a...",
    body: "Top stories curated from Hacker News for the week.",
    date: "Yesterday",
    read: true,
    starred: false,
    label: "inbox",
  },
  {
    id: "4",
    from: "Stripe",
    fromEmail: "receipts@stripe.com",
    subject: "Your invoice from Caffeine AI — $29.00",
    snippet:
      "Thank you for your payment. Invoice #INV-2026-0417 for SearchSphere Pro plan...",
    body: "Receipt for your Caffeine AI subscription.",
    date: "Apr 16",
    read: true,
    starred: true,
    label: "inbox",
  },
  {
    id: "5",
    from: "Notion",
    fromEmail: "team@makenotion.com",
    subject: "Invited to collaborate on 'Project Atlas'",
    snippet:
      "Priya Sharma has invited you to collaborate on a Notion workspace. Click to join...",
    body: "Join the Project Atlas workspace on Notion.",
    date: "Apr 15",
    read: true,
    starred: false,
    label: "inbox",
  },
  {
    id: "6",
    from: "LinkedIn",
    fromEmail: "jobs@linkedin.com",
    subject: "10 new jobs matching 'Frontend Engineer'",
    snippet:
      "Senior Frontend Engineer at Vercel · React Developer at Shopify · UI Engineer at...",
    body: "New job recommendations based on your profile.",
    date: "Apr 14",
    read: true,
    starred: false,
    label: "inbox",
  },
];

const LABELS = [
  { id: "inbox", label: "Inbox", icon: Inbox, count: 2 },
  { id: "starred", label: "Starred", icon: Star, count: 2 },
  { id: "sent", label: "Sent", icon: Send, count: 0 },
  { id: "drafts", label: "Drafts", icon: FileText, count: 1 },
  { id: "spam", label: "Spam", icon: AlertCircle, count: 3 },
  { id: "trash", label: "Trash", icon: Trash2, count: 0 },
];

export function MailPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [activeLabel, setActiveLabel] = useState("inbox");
  const [starred, setStarred] = useState<Set<string>>(
    new Set(DEMO_EMAILS.filter((e) => e.starred).map((e) => e.id)),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const filteredEmails = DEMO_EMAILS.filter((e) => {
    if (activeLabel === "starred") return starred.has(e.id);
    const matchesSearch =
      !searchQuery ||
      e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.from.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const selectedEmail = DEMO_EMAILS.find((e) => e.id === selected);

  function toggleStar(id: string, ev: React.MouseEvent) {
    ev.stopPropagation();
    setStarred((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div
      className="flex h-[calc(100vh-56px)] overflow-hidden bg-background"
      data-ocid="mail.page"
    >
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-border flex flex-col py-3 overflow-y-auto">
        <div className="px-3 mb-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 rounded-2xl shadow-card border-border hover:shadow-elevated"
            onClick={() => setIsComposing(true)}
            data-ocid="mail.compose.button"
          >
            <Plus size={18} className="text-g-gray" />
            Compose
          </Button>
        </div>
        <nav data-ocid="mail.labels.list">
          {LABELS.map((label) => (
            <button
              key={label.id}
              type="button"
              onClick={() => setActiveLabel(label.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm rounded-r-full transition-smooth ${
                activeLabel === label.id
                  ? "bg-primary/10 text-g-blue font-semibold"
                  : "text-g-dark hover:bg-muted"
              }`}
              data-ocid={`mail.label.${label.id}`}
            >
              <label.icon size={18} />
              <span className="flex-1 text-left">{label.label}</span>
              {label.count > 0 && (
                <span className="text-xs font-semibold text-g-dark">
                  {label.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Email list */}
        <div
          className={`flex flex-col overflow-hidden ${selectedEmail ? "w-80 border-r border-border" : "flex-1"}`}
        >
          {/* Search bar */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2 bg-g-light rounded-full px-4 py-2">
              <Search size={16} className="text-g-gray" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mail"
                className="flex-1 outline-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground"
                data-ocid="mail.search_input"
              />
              <button
                type="button"
                className="text-g-gray hover:text-foreground transition-smooth"
                aria-label="Refresh"
                data-ocid="mail.refresh.button"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>

          {/* Emails */}
          <div className="flex-1 overflow-y-auto" data-ocid="mail.email.list">
            {filteredEmails.length === 0 ? (
              <div className="py-16 text-center" data-ocid="mail.empty_state">
                <Inbox
                  size={40}
                  className="mx-auto text-muted-foreground mb-3"
                />
                <p className="text-sm text-muted-foreground">No emails here</p>
              </div>
            ) : (
              filteredEmails.map((email, i) => (
                <button
                  key={email.id}
                  type="button"
                  onClick={() =>
                    setSelected(email.id === selected ? null : email.id)
                  }
                  className={`w-full flex items-start gap-3 px-4 py-3 border-b border-border transition-smooth ${
                    selected === email.id
                      ? "bg-primary/10"
                      : email.read
                        ? "hover:bg-muted"
                        : "bg-primary/5 hover:bg-primary/10 font-medium"
                  }`}
                  data-ocid={`mail.email.item.${i + 1}`}
                >
                  <button
                    type="button"
                    onClick={(e) => toggleStar(email.id, e)}
                    className="mt-0.5 flex-shrink-0 transition-smooth"
                    aria-label="Toggle star"
                    data-ocid={`mail.star.${i + 1}`}
                  >
                    <Star
                      size={16}
                      className={
                        starred.has(email.id)
                          ? "text-g-yellow fill-g-yellow"
                          : "text-muted-foreground"
                      }
                    />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-sm truncate text-g-dark">
                        {email.from}
                      </span>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {email.date}
                      </span>
                    </div>
                    <p className="text-sm text-foreground truncate">
                      {email.subject}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {email.snippet}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Email detail */}
        {selectedEmail && (
          <div
            className="flex-1 overflow-y-auto p-8"
            data-ocid="mail.email_detail.panel"
          >
            <div className="max-w-2xl">
              <h2 className="text-2xl font-medium text-g-dark mb-4">
                {selectedEmail.subject}
              </h2>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-g-blue text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  {selectedEmail.from.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-g-dark">
                    {selectedEmail.from}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    &lt;{selectedEmail.fromEmail}&gt;
                  </p>
                </div>
                <span className="ml-auto text-sm text-muted-foreground">
                  {selectedEmail.date}
                </span>
              </div>
              <p className="text-sm text-g-dark leading-relaxed whitespace-pre-line">
                {selectedEmail.body}
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                {selectedEmail.snippet}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Compose modal */}
      {isComposing && (
        <div
          className="fixed bottom-0 right-6 w-96 bg-background border border-border rounded-t-xl shadow-elevated z-50"
          data-ocid="mail.compose.dialog"
        >
          <div className="flex items-center justify-between px-4 py-3 bg-g-dark rounded-t-xl">
            <span className="text-sm font-medium text-white">New Message</span>
            <button
              type="button"
              onClick={() => setIsComposing(false)}
              className="text-white/70 hover:text-white transition-smooth"
              aria-label="Close compose"
              data-ocid="mail.compose.close_button"
            >
              ×
            </button>
          </div>
          <div className="flex flex-col gap-0">
            <input
              type="text"
              placeholder="To"
              className="w-full px-4 py-2 text-sm border-b border-border outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
              data-ocid="mail.compose.to_input"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-2 text-sm border-b border-border outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
              data-ocid="mail.compose.subject_input"
            />
            <textarea
              rows={8}
              placeholder="Compose email"
              className="w-full px-4 py-2 text-sm outline-none bg-transparent text-foreground placeholder:text-muted-foreground resize-none"
              data-ocid="mail.compose.body_input"
            />
          </div>
          <div className="px-4 py-3 border-t border-border flex items-center gap-3">
            <Button
              size="sm"
              className="bg-g-blue text-white hover:bg-primary"
              data-ocid="mail.compose.submit_button"
            >
              Send
            </Button>
            <button
              type="button"
              onClick={() => setIsComposing(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
              data-ocid="mail.compose.cancel_button"
            >
              Discard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
