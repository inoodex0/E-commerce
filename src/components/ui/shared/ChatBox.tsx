"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

const quickReplies = [
  "Where is my order?",
  "What are your working hours?",
  "Do you offer delivery?",
  "How to return a product?",
];

const botReplies: Record<string, string> = {
  "where is my order": "You can track your order from the Track Order page. Go to More → Track Order and enter your Order ID (e.g. NVR-123456).",
  "what are your working hours": "We are available Sunday to Thursday, 10:00 AM – 8:00 PM (BST). Feel free to reach us on WhatsApp anytime!",
  "do you offer delivery": "Yes! We deliver all over Bangladesh. Free shipping on orders over ৳5,000. Standard delivery takes 3–5 business days.",
  "how to return a product": "Returns are accepted within 7 days of delivery. Go to Contact Us page or WhatsApp us with your Order ID and reason for return.",
};

function getBotReply(msg: string): string {
  const lower = msg.toLowerCase();
  for (const [key, reply] of Object.entries(botReplies)) {
    if (lower.includes(key)) return reply;
  }
  return "Thanks for your message! Our team will get back to you shortly. For instant help, reach us on WhatsApp.";
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  time: string;
}

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! 👋 Welcome to ZURII. How can we help you today?",
      sender: "bot",
      time: new Date().toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" });

    const userMsg: Message = { id: Date.now(), text: text.trim(), sender: "user", time: now };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg: Message = { id: Date.now() + 1, text: getBotReply(text), sender: "bot", time: now };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-[200] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 sm:bottom-8 sm:right-8 ${
          open ? "bg-[#171412] rotate-0" : "bg-[#E8852A] hover:bg-[#d47a24] animate-pulse"
        }`}
      >
        {open ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-6 z-[200] w-[340px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl border border-[#E7E1D8] bg-white shadow-2xl shadow-[#171412]/15 transition-all duration-300 sm:bottom-28 sm:right-8 ${
        open ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95 pointer-events-none"
      }`}>

        {/* Header */}
        <div className="flex items-center gap-3 bg-[#171412] px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8852A]">
            <Bot size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">ZURII Support</p>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <p className="text-[10px] text-white/60">Online now</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[300px] overflow-y-auto bg-[#FBF8F3] p-4 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] ${msg.sender === "user" ? "order-2" : "order-1"}`}>
                <div className={`flex items-end gap-2 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.sender === "bot" && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8852A]">
                      <Bot size={12} className="text-white" />
                    </div>
                  )}
                  {msg.sender === "user" && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#171412]">
                      <User size={12} className="text-white" />
                    </div>
                  )}
                  <div className={`rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#171412] text-white rounded-br-md"
                      : "bg-white text-[#171412] shadow-sm rounded-bl-md"
                  }`}>
                    {msg.text}
                  </div>
                </div>
                <p className={`mt-1 text-[9px] text-[#6B6560]/50 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="border-t border-[#E7E1D8] bg-white px-4 pt-3 pb-2">
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-[#6B6560]/50">Quick replies</p>
          <div className="flex flex-wrap gap-1.5">
            {quickReplies.map((qr) => (
              <button
                key={qr}
                onClick={() => sendMessage(qr)}
                className="rounded-full border border-[#E7E1D8] bg-[#FBF8F3] px-3 py-1.5 text-[10px] font-medium text-[#6B6560] transition-colors hover:border-[#E8852A] hover:text-[#E8852A]"
              >
                {qr}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 border-t border-[#E7E1D8] bg-white px-4 py-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Type your message..."
            className="flex-1 bg-[#FBF8F3] px-4 py-2.5 text-[13px] text-[#171412] outline-none placeholder:text-[#6B6560]/40 rounded-full"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8852A] text-white transition-colors hover:bg-[#d47a24] disabled:opacity-40"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
