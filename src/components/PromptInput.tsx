"use client";

import { useState, useRef, useEffect } from "react";

interface PromptInputProps {
  onGenerate: (input: string) => void;
  isLoading: boolean;
}

/**
 * PromptInput - 黑白风格
 */
export default function PromptInput({ onGenerate, isLoading }: PromptInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 200) + "px";
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onGenerate(input.trim());
    }
  };

  return (
    <section className="flex flex-col items-center text-center px-6 pt-28 pb-20">
      {/* 装饰性小标签 */}
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-white/60 bg-white/5 rounded-full mb-8 tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
        IntentPrompt
      </span>

      {/* 标题 */}
      <h1 className="text-[2.8rem] sm:text-[4rem] font-bold tracking-tight leading-[1.05] max-w-4xl text-white">
        把你的想法翻译成
        <br />
        <span className="text-white/60">AI 能理解的语言</span>
      </h1>

      {/* 副标题 */}
      <p className="mt-5 text-lg sm:text-xl text-white/40 max-w-xl leading-relaxed">
        输入一句自然语言，我们会自动生成专业 Prompt。
      </p>

      {/* 输入表单 */}
      <form onSubmit={handleSubmit} className="mt-14 w-full max-w-[640px]">
        <div className="relative group">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入你的想法..."
            rows={3}
            className="relative w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-all duration-200 shadow-lg"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="mt-5 w-full sm:w-auto px-10 py-3.5 bg-white text-black text-[0.9375rem] font-semibold rounded-lg hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2.5">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              生成中...
            </span>
          ) : (
            "生成 Prompt"
          )}
        </button>
      </form>
    </section>
  );
}
