import { Button } from "@/components/ui/button";
import type { ChatMessage } from "@/types";
import { Bot, RotateCcw, Send, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SUGGESTIONS = [
  "What is the Internet Computer?",
  "Explain React hooks with examples",
  "How does machine learning work?",
  "Write a TypeScript utility function",
  "What are the best practices for REST APIs?",
  "Explain quantum computing simply",
];

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      data-ocid={`chat.message.${message.id}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser
            ? "bg-g-blue text-white"
            : "bg-gradient-to-br from-g-blue to-g-green text-white"
        }`}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-g-blue text-white rounded-tr-sm"
            : "bg-muted text-g-dark rounded-tl-sm border border-border"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

export function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm SearchSphere AI, powered by advanced language models. I can help you with research, writing, coding, analysis, and much more. What would you like to explore today?",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  async function sendMessage(content?: string) {
    const text = content ?? input.trim();
    if (!text || isLoading) return;
    setInput("");

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      let reply: string;
      // Demo fallback — replace with actor.sendChatMessage when http-outcalls is configured
      await new Promise((r) => setTimeout(r, 1200));
      reply = getDemoResponse(text);

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: reply,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content:
            "I apologize, I encountered an error processing your request. Please try again.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function getDemoResponse(text: string): string {
    const t = text.toLowerCase();
    if (t.includes("internet computer") || t.includes("icp")) {
      return "The Internet Computer (ICP) is a blockchain network created by the DFINITY Foundation. It extends the public internet with native smart contract capabilities, allowing developers to build fully decentralized applications (dApps) that run directly on the network — without relying on traditional cloud services like AWS or Google Cloud.";
    }
    if (t.includes("react") || t.includes("hooks")) {
      return "React Hooks are functions that let you use state and other React features in functional components. The most commonly used hooks are:\n\n• **useState** — manages local state\n• **useEffect** — handles side effects like data fetching\n• **useCallback** — memoizes callback functions\n• **useMemo** — memoizes computed values\n• **useContext** — reads from context\n\nHooks follow two key rules: only call them at the top level of a React function, and only call them from React functions.";
    }
    if (
      t.includes("machine learning") ||
      t.includes("ml") ||
      t.includes("ai")
    ) {
      return "Machine Learning (ML) is a subset of AI where systems learn patterns from data without being explicitly programmed. Here's how it works:\n\n1. **Training** — Feed large amounts of labeled data to an algorithm\n2. **Model Building** — The algorithm identifies patterns and builds a mathematical model\n3. **Testing** — Validate the model on unseen data\n4. **Inference** — Use the trained model to make predictions on new inputs\n\nCommon ML types include supervised learning, unsupervised learning, and reinforcement learning.";
    }
    if (t.includes("typescript")) {
      return "Here's a useful TypeScript utility function:\n\n```typescript\nfunction groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {\n  return array.reduce((groups, item) => {\n    const groupKey = String(item[key]);\n    return {\n      ...groups,\n      [groupKey]: [...(groups[groupKey] ?? []), item],\n    };\n  }, {} as Record<string, T[]>);\n}\n```\n\nThis groups an array of objects by a specified key, returning an object where each key maps to an array of matching items.";
    }
    return `That's a great question! I'd be happy to help with "${text}". As an AI assistant, I can provide information, help with analysis, assist with writing, explain complex concepts, and much more. Could you provide more details about what specifically you'd like to know?`;
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function resetChat() {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content: "Chat cleared! I'm ready to help with any new questions.",
        timestamp: Date.now(),
      },
    ]);
  }

  return (
    <div
      className="flex flex-col h-[calc(100vh-56px)] bg-background"
      data-ocid="chat.page"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-g-blue to-g-green flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-g-dark text-sm">
              SearchSphere AI
            </h1>
            <p className="text-xs text-g-green">● Online</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetChat}
          className="text-g-gray hover:text-foreground gap-1.5"
          data-ocid="chat.reset.button"
        >
          <RotateCcw size={14} />
          New chat
        </Button>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-4 py-6 space-y-6"
        data-ocid="chat.messages.list"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex gap-3" data-ocid="chat.loading_state">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-g-blue to-g-green flex items-center justify-center flex-shrink-0">
              <Bot size={16} className="text-white" />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-muted border border-border">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-g-gray animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <div
            className="flex flex-wrap gap-2 justify-center"
            data-ocid="chat.suggestions.section"
          >
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => sendMessage(suggestion)}
                className="px-3 py-1.5 text-xs border border-border rounded-full text-g-gray hover:border-g-blue hover:text-g-blue transition-smooth bg-background"
                data-ocid={`chat.suggestion.item.${SUGGESTIONS.indexOf(suggestion) + 1}`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="px-4 pb-4 pt-2 border-t border-border bg-background">
        <div className="flex items-end gap-2 max-w-2xl mx-auto">
          <div className="flex-1 border border-g-border rounded-2xl overflow-hidden focus-within:border-g-blue focus-within:shadow-search-hover transition-smooth bg-background">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              rows={1}
              className="w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none bg-transparent max-h-32"
              data-ocid="chat.message_input"
              aria-label="Message input"
              style={{ height: "auto" }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
              }}
            />
          </div>
          <Button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            className="rounded-full w-10 h-10 p-0 bg-g-blue hover:bg-primary flex-shrink-0"
            aria-label="Send message"
            data-ocid="chat.send.button"
          >
            <Send size={16} className="text-white" />
          </Button>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">
          SearchSphere AI may produce inaccurate information. Verify important
          details.
        </p>
      </div>
    </div>
  );
}
