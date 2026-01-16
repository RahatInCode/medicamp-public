import { useContext, useEffect, useRef, useState } from "react";
import { IoChatbubblesOutline, IoSend } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../features/auth/AuthContext";
import axiosSecure from "../api/axiosSecure";

export default function ChatbotWidget() {
    const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Send message to backend
  const send = async () => {
    if (!input.trim()) return;
    const optimistic = { role: "user", content: input };
    setMessages(prev => [...prev, optimistic]);
    const text = input;
    setInput("");
    setLoading(true);

    try {
      const { data } = await axiosSecure.post("/api/chat", { message: text, sessionId });
      setSessionId(data.sessionId);
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Sorry, I couldn't process that right now." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null; // only visible for logged-in users

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating button when closed */}
      {!open && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(true)}
          className="rounded-full shadow-lg p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
          aria-label="Open chat"
        >
          <IoChatbubblesOutline size={26} />
        </motion.button>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-96 max-w-[95vw] h-[560px] bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden flex flex-col border border-zinc-200/60 dark:border-zinc-800/60"
          >
            {/* Header */}
            <div className="px-4 py-3 text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-between">
              <span>MediCamp Assistant 🤖</span>
              <button
                className="text-xs opacity-80 hover:opacity-100"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 overflow-y-auto p-3 space-y-3 text-sm">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                ⚠️ This chatbot shares general info only. Not a substitute for medical advice.
              </div>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={m.role === "user" ? "text-right" : "text-left"}
                >
                  <div
                    className={`inline-block px-3 py-2 rounded-2xl max-w-[85%] whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="text-left">
                  <div className="inline-block px-3 py-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                    <span className="flex gap-1">
                      <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-150"></span>
                      <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-300"></span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input box */}
            <div className="p-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex gap-2">
              <input
                className="flex-1 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 outline-none text-sm"
                placeholder="Ask about camp timings, docs, hydration tips..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
              />
              <button
                onClick={send}
                className="px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white disabled:opacity-50"
                disabled={!input.trim() || loading}
              >
                <IoSend />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// will add more features later like saving chat history, session management, etc with more Ai features
