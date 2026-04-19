import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Send, Sparkles, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const PROMPTS = [
  "What should I wear to a sangeet night?",
  "Office outfit ideas under ₹3000",
  "Suggest a casual brunch look",
  "Help me style a saree for Diwali",
  "What goes with a black slip dress?",
];

const SYSTEM_GREETING: Msg = {
  role: "assistant",
  content:
    "Hi! I'm your AI Stylist 👗✨\n\nTell me about an occasion, vibe, or piece you already own — and I'll put together a complete outfit for you. Try a suggestion below or type your own question!",
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-stylist`;

const AIStylistPage = () => {
  const [messages, setMessages] = useState<Msg[]>([SYSTEM_GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setInput("");
    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    let assistantText = "";
    const upsert = (chunk: string) => {
      assistantText += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last !== SYSTEM_GREETING && prev.length > next.length) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantText } : m));
        }
        return [...prev, { role: "assistant", content: assistantText }];
      });
    };

    try {
      // Skip the static greeting when sending to the model
      const apiMessages = next.filter((m) => m !== SYSTEM_GREETING);
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (resp.status === 429) {
        toast.error("Too many requests — please wait a moment.");
        setLoading(false);
        setMessages((prev) => prev.slice(0, -1));
        return;
      }
      if (resp.status === 402) {
        toast.error("AI credits exhausted. Add credits in Workspace → Usage.");
        setLoading(false);
        setMessages((prev) => prev.slice(0, -1));
        return;
      }
      if (!resp.ok || !resp.body) throw new Error("stream failed");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsert(content);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold hover:bg-secondary/70">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl gradient-primary shadow-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            <h1 className="font-display text-xl md:text-2xl font-bold">AI Stylist</h1>
          </div>
          <div className="w-[88px]" />
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-8 space-y-5">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-3",
                m.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {m.role === "assistant" && (
                <span className="shrink-0 mt-1 h-9 w-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </span>
              )}
              <div
                className={cn(
                  "rounded-3xl px-5 py-3.5 max-w-[80%] whitespace-pre-line text-[15px] leading-relaxed shadow-soft animate-fade-in",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card border border-border rounded-bl-md"
                )}
              >
                {m.content || (
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions + input */}
      <div className="sticky bottom-0 border-t border-border bg-background/95 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-4 py-4">
          {messages.length <= 1 && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3">
              {PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-primary/40 hover:bg-secondary transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          )}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 rounded-full border border-border bg-card pl-5 pr-1.5 py-1.5 shadow-soft focus-within:border-primary/60"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your stylist anything…"
              disabled={loading}
              className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
            />
            <Button
              type="submit"
              disabled={loading || !input.trim()}
              size="icon"
              className="rounded-full h-11 w-11 bg-accent text-accent-foreground hover:bg-accent/90 shrink-0"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIStylistPage;
