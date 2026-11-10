import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export interface LatexRendererProps {
  content?: string | null;
  className?: string;
}

export interface Segment {
  type: 'text' | 'inline' | 'block';
  raw: string;
  math?: string;
}

export function parseLatexContent(content: string): Segment[] {
  const segments: Segment[] = [];
  // Match $$block$$ or $inline$ (single line)
  const regex = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        raw: content.slice(lastIndex, match.index),
      });
    }

    if (match[1] !== undefined) {
      // Block math $$...$$
      segments.push({
        type: 'block',
        raw: match[0],
        math: match[1].trim(),
      });
    } else if (match[2] !== undefined) {
      // Inline math $...$
      segments.push({
        type: 'inline',
        raw: match[0],
        math: match[2].trim(),
      });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    segments.push({
      type: 'text',
      raw: content.slice(lastIndex),
    });
  }

  return segments;
}

export type InlineItem =
  | { type: 'text'; raw: string }
  | { type: 'bold'; content: string }
  | { type: 'italic'; content: string }
  | { type: 'code'; content: string }
  | { type: 'math'; content: string; raw: string }
  | { type: 'link'; text: string; href: string };

export function parseInlineTokens(text: string): InlineItem[] {
  const tokens: InlineItem[] = [];
  // 1. Bold: **...** (can contain math inside like **$VC$**)
  // 2. Code: `...`
  // 3. Inline math: $...$
  // 4. Italic: *...*
  // 5. Link: [...](...)
  const regex =
    /(\*\*[^*]+?\*\*)|(`[^`\n]+?`)|(\$[^$\n]+?\$)|(?:\*([^*]+?)\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: 'text',
        raw: text.slice(lastIndex, match.index),
      });
    }

    if (match[1]) {
      tokens.push({
        type: 'bold',
        content: match[1].slice(2, -2),
      });
    } else if (match[2]) {
      tokens.push({
        type: 'code',
        content: match[2].slice(1, -1),
      });
    } else if (match[3]) {
      tokens.push({
        type: 'math',
        content: match[3].slice(1, -1).trim(),
        raw: match[3],
      });
    } else if (match[4]) {
      tokens.push({
        type: 'italic',
        content: match[4],
      });
    } else if (match[5]) {
      tokens.push({
        type: 'link',
        text: match[6],
        href: match[7],
      });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    tokens.push({
      type: 'text',
      raw: text.slice(lastIndex),
    });
  }

  return tokens;
}

function renderKaTeX(math: string, isBlock: boolean, raw: string, key: React.Key) {
  try {
    const html = katex.renderToString(math || '', {
      displayMode: isBlock,
      throwOnError: false,
      trust: false,
      strict: 'warn',
    });

    if (isBlock) {
      return (
        <span
          key={key}
          className="block my-2 overflow-x-auto py-1"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }

    return (
      <span
        key={key}
        className="inline-block px-0.5"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch {
    return (
      <span key={key} className="text-red-500 font-mono text-sm">
        {raw}
      </span>
    );
  }
}

function renderInlineList(tokens: InlineItem[]): React.ReactNode {
  return tokens.map((t, idx) => {
    if (t.type === 'text') {
      return <span key={idx}>{t.raw}</span>;
    }
    if (t.type === 'bold') {
      const inner = parseInlineTokens(t.content);
      return (
        <strong key={idx} className="font-bold text-inherit">
          {inner.length === 1 && inner[0].type === 'text' ? inner[0].raw : renderInlineList(inner)}
        </strong>
      );
    }
    if (t.type === 'italic') {
      const inner = parseInlineTokens(t.content);
      return (
        <em key={idx} className="italic text-inherit">
          {inner.length === 1 && inner[0].type === 'text' ? inner[0].raw : renderInlineList(inner)}
        </em>
      );
    }
    if (t.type === 'code') {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded-md bg-indigo-50/80 border border-indigo-200/70 font-mono text-xs text-indigo-700 font-semibold"
        >
          {t.content}
        </code>
      );
    }
    if (t.type === 'math') {
      return renderKaTeX(t.content, false, t.raw, idx);
    }
    if (t.type === 'link') {
      return (
        <a
          key={idx}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 underline font-medium"
        >
          {t.text}
        </a>
      );
    }
    return null;
  });
}

export const LatexRenderer: React.FC<LatexRendererProps> = ({ content, className }) => {
  if (!content) {
    return null;
  }

  // Check if content has block math $$...$$
  if (content.includes('$$')) {
    const segments = parseLatexContent(content);
    return (
      <span className={className}>
        {segments.map((seg, idx) => {
          if (seg.type === 'block') {
            return renderKaTeX(seg.math || '', true, seg.raw, idx);
          }
          if (seg.type === 'inline') {
            return renderKaTeX(seg.math || '', false, seg.raw, idx);
          }
          const tokens = parseInlineTokens(seg.raw);
          if (tokens.length === 1 && tokens[0].type === 'text') {
            return <span key={idx}>{seg.raw}</span>;
          }
          return <span key={idx}>{renderInlineList(tokens)}</span>;
        })}
      </span>
    );
  }

  const tokens = parseInlineTokens(content);
  if (tokens.length === 1 && tokens[0].type === 'text') {
    return <span className={className}>{content}</span>;
  }

  return <span className={className}>{renderInlineList(tokens)}</span>;
};
