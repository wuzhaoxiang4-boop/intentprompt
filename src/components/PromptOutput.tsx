"use client";

import { useState } from "react";
import type { PromptResult } from "@/utils/mockPrompt";

interface PromptOutputProps {
  result: PromptResult | null;
}

/**
 * PromptOutput - 黑白风格
 */
export default function PromptOutput({ result }: PromptOutputProps) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = result.markdown;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="px-6 pb-28">
      <div className="max-w-[640px] mx-auto">
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          {/* 卡片头部 */}
          <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-white/40"></span>
              <h2 className="text-sm font-semibold text-white/70 tracking-tight">
                生成的 Prompt
              </h2>
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white/60 hover:bg-white/10 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  已复制
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  复制
                </>
              )}
            </button>
          </div>

          {/* 卡片内容 */}
          <div className="px-6 py-5">
            <div className="markdown-content" dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(result.markdown) }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function renderSimpleMarkdown(md: string): string {
  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const langClass = lang ? ` class="language-${lang}"` : "";
      return `<pre><code${langClass}>${code.trim()}</code></pre>`;
    })
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^---$/gm, "<hr />");

  return html;
}
