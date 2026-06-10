"use client";

import { useState, useCallback } from "react";
import PromptInput from "@/components/PromptInput";
import PromptOutput from "@/components/PromptOutput";
import { generateMockPrompt } from "@/utils/mockPrompt";
import type { PromptResult } from "@/utils/mockPrompt";

/**
 * 首页 - 黑白风格
 */
export default function Home() {
  const [result, setResult] = useState<PromptResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = useCallback((input: string) => {
    setIsLoading(true);
    setResult(null);
    setTimeout(() => {
      const mockResult = generateMockPrompt(input);
      setResult(mockResult);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-black">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[980px] mx-auto px-6 h-12 flex items-center justify-between">
          <span className="text-sm font-semibold text-white/80 tracking-tight">
            IntentPrompt
          </span>
          <span className="text-[11px] text-white/30 font-medium tracking-wider uppercase">
            AI Prompt Generator
          </span>
        </div>
      </nav>

      <div className="flex-1 flex flex-col">
        <PromptInput onGenerate={handleGenerate} isLoading={isLoading} />

        {isLoading && (
          <div className="px-6 pb-20">
            <div className="max-w-[640px] mx-auto">
              <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden p-6">
                <div className="animate-pulse space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                    <span className="w-2 h-2 rounded-full bg-white/20"></span>
                    <div className="h-3 bg-white/10 rounded w-24"></div>
                  </div>
                  <div className="h-3 bg-white/10 rounded w-3/4"></div>
                  <div className="h-3 bg-white/10 rounded w-1/2"></div>
                  <div className="h-3 bg-white/10 rounded w-5/6"></div>
                  <div className="h-3 bg-white/10 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <PromptOutput result={result} />
      </div>

      <footer className="border-t border-white/10 py-5">
        <p className="text-center text-xs text-white/30 tracking-wide">
          IntentPrompt — 把你的想法翻译成 AI 能理解的语言
        </p>
      </footer>
    </main>
  );
}
